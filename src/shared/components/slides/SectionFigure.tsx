import { useState } from 'react';
import { Box, Dialog } from '@mui/material';
import type { FigureSpec, VisualTone } from '../../../core/interfaces/Lesson';
import { NeuronArchitectureDiagram } from './NeuronArchitectureDiagram';

const toneColor = {
  primary: '#60a5fa',
  secondary: '#a78bfa',
  success: '#34d399',
  warning: '#f59e0b',
} as const satisfies Record<VisualTone, string>;

const toneFill = {
  primary: 'rgba(96,165,250,0.14)',
  secondary: 'rgba(167,139,250,0.14)',
  success: 'rgba(52,211,153,0.14)',
  warning: 'rgba(245,158,11,0.14)',
} as const satisfies Record<VisualTone, string>;

function resolveAssetPath(src: string) {
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src;
  }

  return `${import.meta.env.BASE_URL}${src}`;
}

function wrapWords(text: string, maxChars = 14) {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function SvgText({
  x,
  y,
  text,
  size = 14,
  color = '#e5eefc',
  weight = 700,
  anchor = 'middle',
  maxChars = 14,
}: {
  x: number;
  y: number;
  text: string;
  size?: number;
  color?: string;
  weight?: number;
  anchor?: 'start' | 'middle' | 'end';
  maxChars?: number;
}) {
  const lines = wrapWords(text, maxChars);

  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} textAnchor={anchor} fontFamily="Sora, Inter, sans-serif">
      {lines.map((line, index) => (
        <tspan key={`${text}-${index}`} x={x} dy={index === 0 ? 0 : size + 3}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function SvgPill({
  x,
  y,
  w,
  h,
  label,
  tone = 'primary',
  maxChars = 14,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tone?: VisualTone;
  maxChars?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={toneFill[tone]} stroke={toneColor[tone]} strokeWidth="1.5" />
      <SvgText x={x + w / 2} y={y + h / 2 + 5} text={label} size={15} weight={800} maxChars={maxChars} />
    </g>
  );
}

function SvgPanel({
  x,
  y,
  w,
  h,
  title,
  tone,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  tone: VisualTone;
  children: React.ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="24" fill={`${toneFill[tone]}`} stroke={`${toneColor[tone]}`} strokeOpacity="0.4" />
      <SvgText x={x + 18} y={y + 22} text={title} anchor="start" size={13} color="rgba(248,250,252,0.72)" maxChars={20} />
      {children}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 9;
  const a1 = angle - Math.PI / 7;
  const a2 = angle + Math.PI / 7;
  const hx1 = x2 - head * Math.cos(a1);
  const hy1 = y2 - head * Math.sin(a1);
  const hx2 = x2 - head * Math.cos(a2);
  const hy2 = y2 - head * Math.sin(a2);

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${hx1},${hy1} ${hx2},${hy2}`} fill={color} />
    </g>
  );
}

function SvgCanvas({ children, height = 320 }: { children: React.ReactNode; height?: number }) {
  return (
    <Box sx={{ width: '100%', height }}>
      <svg viewBox="0 0 640 360" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {children}
      </svg>
    </Box>
  );
}

function VerticalStepsFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'vertical-steps' }> }) {
  return (
    <SvgCanvas>
      {figure.steps.map((step, index) => {
        const y = 44 + index * 60;
        const active = !!step.active;
        return (
          <g key={`${step.label}-${index}`}>
            <circle cx="76" cy={y} r="22" fill={active ? toneColor.primary : 'rgba(255,255,255,0.04)'} stroke={active ? 'none' : 'rgba(255,255,255,0.16)'} />
            <SvgText x={76} y={y + 6} text={step.icon ?? `${index + 1}`} size={18} />
            <SvgText x={122} y={y + 5} text={step.label.toUpperCase()} anchor="start" size={15} color={active ? '#f8fafc' : 'rgba(248,250,252,0.72)'} maxChars={22} />
            {index < figure.steps.length - 1 ? <line x1="76" y1={y + 24} x2="76" y2={y + 36} stroke="rgba(255,255,255,0.16)" strokeWidth="3" /> : null}
          </g>
        );
      })}
    </SvgCanvas>
  );
}

function DualPathFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'dual-path' }> }) {
  const leftX = 40;
  const rightX = 360;
  const panelY = 28;
  const panelW = 240;
  const panelH = 274;

  const renderLane = (x: number, lane: typeof figure.left) => (
    <SvgPanel x={x} y={panelY} w={panelW} h={panelH} title={lane.title} tone={lane.tone}>
      {lane.steps.map((step, index) => {
        const y = 76 + index * 72;
        return (
          <g key={`${lane.title}-${step}`}>
            <SvgPill x={x + 28} y={y} w={184} h={42} label={step} tone={lane.tone} />
            {index < lane.steps.length - 1 ? <Arrow x1={x + 120} y1={y + 46} x2={x + 120} y2={y + 66} color={toneColor[lane.tone]} /> : null}
          </g>
        );
      })}
      <SvgText x={x + 120} y={panelY + panelH - 22} text={lane.caption} size={12} color="rgba(248,250,252,0.58)" maxChars={26} />
    </SvgPanel>
  );

  return (
    <SvgCanvas>
      {renderLane(leftX, figure.left)}
      {renderLane(rightX, figure.right)}
      <SvgText x={320} y={178} text={figure.centerLabel ?? 'vs'} size={22} color="rgba(248,250,252,0.68)" weight={900} />
    </SvgCanvas>
  );
}

function LoopFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'loop' }> }) {
  const topXs = [110, 300, 490];
  const bottomXs = [110, 300, 490];

  return (
    <SvgCanvas>
      {figure.topRow.map((item, index) => (
        <g key={item.label}>
          <SvgPill x={topXs[index] - 74} y={92} w={148} h={42} label={item.label} tone={item.tone ?? 'primary'} />
          {index < figure.topRow.length - 1 ? <Arrow x1={topXs[index] + 78} y1={113} x2={topXs[index + 1] - 78} y2={113} color={toneColor[item.tone ?? 'primary']} /> : null}
        </g>
      ))}

      {figure.bottomRow.map((item, index) => (
        <g key={item.label}>
          <SvgPill x={bottomXs[index] - 82} y={202} w={164} h={42} label={item.label} tone={item.tone ?? 'warning'} />
          {index < figure.bottomRow.length - 1 ? <Arrow x1={bottomXs[index] + 86} y1={223} x2={bottomXs[index + 1] - 86} y2={223} color={toneColor[item.tone ?? 'warning']} /> : null}
        </g>
      ))}

      <path d="M 532 133 C 584 148, 584 196, 532 210" fill="none" stroke="rgba(248,250,252,0.24)" strokeWidth="3" strokeDasharray="7 7" />
      <path d="M 108 202 C 56 186, 56 140, 108 124" fill="none" stroke="rgba(248,250,252,0.24)" strokeWidth="3" strokeDasharray="7 7" />
      <SvgText x={320} y={292} text={figure.footer} size={13} color="rgba(248,250,252,0.68)" maxChars={54} />
    </SvgCanvas>
  );
}

function PillarsGridFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'pillars-grid' }> }) {
  const centers = [120, 320, 520];
  const gridPositions = [
    [120, 210],
    [320, 210],
    [120, 284],
    [320, 284],
  ];

  return (
    <SvgCanvas>
      {figure.pipeline.map((item, index) => (
        <g key={item.label}>
          <circle cx={centers[index]} cy="86" r="28" fill={toneFill[item.tone ?? 'primary']} stroke={toneColor[item.tone ?? 'primary']} strokeWidth="2" />
          <SvgText x={centers[index]} y={92} text={item.icon} size={21} />
          <SvgText x={centers[index]} y={128} text={item.label} size={13} maxChars={14} />
          {index < figure.pipeline.length - 1 ? <Arrow x1={centers[index] + 34} y1={86} x2={centers[index + 1] - 34} y2={86} color={toneColor[item.tone ?? 'primary']} /> : null}
        </g>
      ))}

      {figure.grid.map((item, index) => {
        const [x, y] = gridPositions[index];
        return (
          <g key={item.label}>
            <rect x={x - 82} y={y - 24} width="164" height="48" rx="18" fill={`${item.color}14`} stroke={`${item.color}`} strokeOpacity="0.5" />
            <SvgText x={x - 48} y={y + 6} text={item.icon} size={18} />
            <SvgText x={x + 10} y={y + 5} text={item.label} anchor="start" size={13} maxChars={14} />
          </g>
        );
      })}
    </SvgCanvas>
  );
}

function ImageFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'image' }> }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const src = resolveAssetPath(figure.src);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        role="button"
        tabIndex={0}
        aria-label={figure.alt}
        onClick={() => setPreviewOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setPreviewOpen(true);
          }
        }}
        sx={{
          width: '100%',
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
          bgcolor: '#000',
          aspectRatio: '16/10',
          cursor: 'zoom-in',
          outline: 'none',
        }}
      >
        <Box component="img" src={src} alt={figure.alt} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Box>

      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(6, 10, 20, 0.96)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 4,
            overflow: 'hidden',
          },
        }}
      >
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <Box component="img" src={src} alt={`${figure.alt} enlarged`} sx={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain', display: 'block', bgcolor: '#000', borderRadius: 3 }} />
        </Box>
      </Dialog>
    </Box>
  );
}

function NeuronFocusFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'neuron-focus' }> }) {
  const map = {
    overview: {
      middle: 'Σ(wi xi) + b',
      middleTone: 'secondary' as VisualTone,
      bottom: 'soma ponderada',
      output: 'estimativa numerica',
      outputTone: 'success' as VisualTone,
    },
    inputs: {
      middle: 'vetor x',
      middleTone: 'primary' as VisualTone,
      bottom: 'features numericas',
      output: 'sinais de entrada',
      outputTone: 'primary' as VisualTone,
    },
    weights: {
      middle: 'w · x',
      middleTone: 'warning' as VisualTone,
      bottom: 'importancia relativa',
      output: 'parametros treinaveis',
      outputTone: 'primary' as VisualTone,
    },
    bias: {
      middle: 'Σ(wi xi) + b',
      middleTone: 'secondary' as VisualTone,
      bottom: 'desloca a decisao',
      output: 'limiar flexivel',
      outputTone: 'primary' as VisualTone,
    },
    activation: {
      middle: 'f(z)',
      middleTone: 'primary' as VisualTone,
      bottom: 'introduz nao linearidade',
      output: 'saida ativada',
      outputTone: 'success' as VisualTone,
    },
    formula: {
      middle: 'y = f(Wx + b)',
      middleTone: 'secondary' as VisualTone,
      bottom: 'bloco completo',
      output: 'equacao final',
      outputTone: 'success' as VisualTone,
    },
  } as const;

  const config = map[figure.emphasis];
  const inputTone: VisualTone = figure.emphasis === 'inputs' ? 'warning' : 'primary';

  return (
    <SvgCanvas>
      {[0, 1, 2].map((index) => {
        const y = 108 + index * 58;
        return (
          <g key={index}>
            <SvgPill x={28} y={y} w={140} h={42} label={`x${index + 1}`} tone={inputTone} maxChars={8} />
            <Arrow x1={178} y1={y + 21} x2={244} y2={y + 21} color={toneColor[inputTone]} />
          </g>
        );
      })}

      <SvgPill x={260} y={132} w={160} h={44} label={config.middle} tone={config.middleTone} maxChars={18} />
      <SvgPill x={246} y={196} w={188} h={40} label={config.bottom} tone={config.middleTone} maxChars={18} />

      <Arrow x1={430} y1={154} x2={488} y2={154} color={toneColor[config.outputTone]} />
      <SvgPill x={498} y={120} w={110} h={42} label="saida" tone={config.outputTone} maxChars={8} />
      <SvgPill x={452} y={184} w={156} h={54} label={config.output} tone={config.outputTone} maxChars={16} />

      <SvgText x={320} y={310} text={figure.footer} size={13} color="rgba(248,250,252,0.68)" maxChars={56} />
    </SvgCanvas>
  );
}

function LayerStackFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'layer-stack' }> }) {
  const xs = [92, 246, 394, 544];

  return (
    <SvgCanvas>
      {figure.columns.map((column, index) => (
        <g key={column.label}>
          <SvgText x={xs[index]} y={44} text={column.label} size={13} color={column.emphasis ? '#f8fafc' : 'rgba(248,250,252,0.68)'} maxChars={14} />
          {Array.from({ length: column.nodes }).map((_, nodeIndex) => {
            const spacing = column.nodes === 1 ? 0 : 108 / (column.nodes - 1);
            const y = 124 + nodeIndex * spacing;
            const r = column.emphasis ? 12 : 10;
            return (
              <circle key={`${column.label}-${nodeIndex}`} cx={xs[index]} cy={y} r={r} fill={toneColor[column.tone]} fillOpacity={column.emphasis ? 1 : 0.94} />
            );
          })}
          {index < figure.columns.length - 1 ? (
            Array.from({ length: Math.max(column.nodes, figure.columns[index + 1].nodes) }).map((_, lineIndex) => {
              const next = figure.columns[index + 1];
              const y1 = 124 + (column.nodes === 1 ? 54 : (108 / Math.max(column.nodes - 1, 1)) * Math.min(lineIndex, column.nodes - 1));
              const y2 = 124 + (next.nodes === 1 ? 54 : (108 / Math.max(next.nodes - 1, 1)) * Math.min(lineIndex, next.nodes - 1));
              return <line key={`${column.label}-line-${lineIndex}`} x1={xs[index] + 18} y1={y1} x2={xs[index + 1] - 18} y2={y2} stroke="rgba(148,163,184,0.28)" strokeWidth="1.4" />;
            })
          ) : null}
        </g>
      ))}

      <SvgText x={320} y={312} text={figure.footer} size={13} color="rgba(248,250,252,0.68)" maxChars={56} />
    </SvgCanvas>
  );
}

function FlowSequenceFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'flow-sequence' }> }) {
  const flowTone: VisualTone = figure.reverse ? 'warning' : 'primary';
  const endTone: VisualTone = figure.reverse ? 'warning' : 'success';

  return (
    <SvgCanvas>
      <SvgPill x={32} y={114} w={120} h={42} label={figure.start} tone={flowTone} />
      <SvgPill x={178} y={114} w={124} h={42} label={figure.middle[0]} tone="secondary" />
      <SvgPill x={338} y={114} w={124} h={42} label={figure.middle[1]} tone="secondary" />
      <SvgPill x={486} y={114} w={120} h={42} label={figure.end} tone={endTone} />
      <Arrow x1={156} y1={135} x2={178} y2={135} color={toneColor[flowTone]} />
      <Arrow x1={304} y1={135} x2={338} y2={135} color={toneColor[flowTone]} />
      <Arrow x1={464} y1={135} x2={486} y2={135} color={toneColor[endTone]} />

      <rect x="34" y="206" width="264" height="82" rx="20" fill={`${toneFill[flowTone]}`} stroke={`${toneColor[flowTone]}`} strokeOpacity="0.42" />
      <SvgText x={58} y={228} text={figure.reverse ? 'backward' : 'forward'} anchor="start" size={12} color="rgba(248,250,252,0.58)" maxChars={16} />
      <SvgText x={166} y={258} text={figure.primaryNote} size={15} maxChars={24} />

      <rect x="344" y="206" width="264" height="82" rx="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
      <SvgText x={368} y={228} text="effect" anchor="start" size={12} color="rgba(248,250,252,0.58)" maxChars={16} />
      <SvgText x={476} y={258} text={figure.secondaryNote} size={15} maxChars={24} />
    </SvgCanvas>
  );
}

function MetricCompareFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'metric-compare' }> }) {
  return (
    <SvgCanvas>
      <line x1="84" y1="292" x2="560" y2="292" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <line x1="84" y1="64" x2="84" y2="292" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />

      <SvgText x={180} y={74} text={figure.leftLabel} size={13} color="rgba(248,250,252,0.68)" />
      <rect x="144" y={292 - figure.leftHeight} width="72" height={figure.leftHeight} rx="16" fill={toneFill.primary} stroke={toneColor.primary} strokeWidth="1.5" />
      <SvgText x={180} y={292 - figure.leftHeight + 28} text={figure.leftValue} size={16} weight={900} />

      <SvgText x={460} y={74} text={figure.rightLabel} size={13} color="rgba(248,250,252,0.68)" />
      <rect x="424" y={292 - figure.rightHeight} width="72" height={figure.rightHeight} rx="16" fill={toneFill.success} stroke={toneColor.success} strokeWidth="1.5" />
      <SvgText x={460} y={292 - figure.rightHeight + 28} text={figure.rightValue} size={16} weight={900} />

      <SvgText x={320} y={148} text={figure.centerLabel} size={24} color={toneColor.warning} weight={900} />
      <line x1="286" y1="162" x2="354" y2="162" stroke={toneColor.warning} strokeWidth="4" strokeLinecap="round" />
      <SvgText x={320} y={330} text={figure.footer} size={13} color="rgba(248,250,252,0.68)" maxChars={56} />
    </SvgCanvas>
  );
}

function LineChartFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'line-chart' }> }) {
  const points = figure.points.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <SvgCanvas>
      <line x1="42" y1="34" x2="42" y2="306" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <line x1="42" y1="306" x2="608" y2="306" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />

      <path d={`M ${points} L 608 306 L 42 306 Z`} fill="rgba(34,197,94,0.06)" />
      <polyline points={points} fill="none" stroke={toneColor.success} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

      {figure.points.map((point, index) => (
        <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="5.5" fill={toneColor[point.tone ?? (index < 2 ? 'warning' : index < 4 ? 'primary' : 'success')]} />
      ))}

      <SvgText x={78} y={334} text={figure.xLabel} anchor="start" size={12} color="rgba(248,250,252,0.58)" />
      <SvgText x={574} y={28} text={figure.yLabel} anchor="end" size={12} color="rgba(248,250,252,0.58)" />
      <SvgText x={320} y={334} text={figure.footer} size={13} color="rgba(248,250,252,0.68)" maxChars={58} />
    </SvgCanvas>
  );
}

export function SectionFigure({ figure }: { figure: FigureSpec }) {
  switch (figure.kind) {
    case 'vertical-steps':
      return <VerticalStepsFigure figure={figure} />;
    case 'dual-path':
      return <DualPathFigure figure={figure} />;
    case 'loop':
      return <LoopFigure figure={figure} />;
    case 'pillars-grid':
      return <PillarsGridFigure figure={figure} />;
    case 'image':
      return <ImageFigure figure={figure} />;
    case 'neuron-architecture':
      return <NeuronArchitectureDiagram />;
    case 'neuron-focus':
      return <NeuronFocusFigure figure={figure} />;
    case 'layer-stack':
      return <LayerStackFigure figure={figure} />;
    case 'flow-sequence':
      return <FlowSequenceFigure figure={figure} />;
    case 'metric-compare':
      return <MetricCompareFigure figure={figure} />;
    case 'line-chart':
      return <LineChartFigure figure={figure} />;
    default:
      return null;
  }
}
