import { Box } from '@mui/material';
import { VisualTone } from '../../../../core/interfaces/Lesson';
import { toneColor, toneFill, wrapWords } from './figure-utils';

export function SvgText({
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
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={size}
      fontWeight={weight}
      textAnchor={anchor}
      fontFamily="Sora, Inter, sans-serif"
    >
      {lines.map((line, index) => (
        <tspan key={`${text}-${index}`} x={x} dy={index === 0 ? 0 : size + 3}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function SvgPill({
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
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={h / 2}
        fill={toneFill[tone]}
        stroke={toneColor[tone]}
        strokeWidth="1.5"
      />
      <SvgText
        x={x + w / 2}
        y={y + h / 2 + 5}
        text={label}
        size={15}
        weight={800}
        maxChars={maxChars}
      />
    </g>
  );
}

export function SvgPanel({
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
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="24"
        fill={`${toneFill[tone]}`}
        stroke={`${toneColor[tone]}`}
        strokeOpacity="0.4"
      />
      <SvgText
        x={x + 18}
        y={y + 22}
        text={title}
        anchor="start"
        size={13}
        color="rgba(248,250,252,0.72)"
        maxChars={20}
      />
      {children}
    </g>
  );
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}) {
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
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${hx1},${hy1} ${hx2},${hy2}`} fill={color} />
    </g>
  );
}

export function SvgCanvas({
  children,
  height = 320,
}: {
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <Box sx={{ width: '100%', height }}>
      <svg
        viewBox="0 0 640 360"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        {children}
      </svg>
    </Box>
  );
}
