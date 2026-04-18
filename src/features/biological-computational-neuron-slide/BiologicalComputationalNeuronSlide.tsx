import { Box, Card, Chip, Divider, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useI18n } from '../../i18n/I18nProvider';

type ComparisonCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  biologyTag: string;
  biologyTitle: string;
  computationTag: string;
  computationTitle: string;
  biologicalLabels: {
    dendrites: string;
    soma: string;
    cellBody: string;
    nucleus: string;
    axon: string;
    myelinLine1: string;
    myelinLine2: string;
    synapse: string;
    synapseGap: string;
    terminalsLine1: string;
    terminalsLine2: string;
  };
  computationalLabels: {
    inputs: string;
    synapses: string;
    weightedSumBias: string;
    activationLine1: string;
    activationLine2: string;
    axon: string;
  };
  biologyTable: {
    headers: [string, string, string];
    rows: Array<[string, string, string]>;
  };
  computationTable: {
    headers: [string, string, string];
    rows: Array<[string, string, string]>;
  };
  formulaLegend: {
    title: string;
    items: Array<{ symbol: string; title: string; body: string }>;
    domainBadge: string;
    domainFormula: string;
    domainBody: string;
  };
  footerNote: string;
};

const slideTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1d4ed8',
    },
    secondary: {
      main: '#6d28d9',
    },
    background: {
      default: '#f6efe6',
      paper: '#fffdf9',
    },
    text: {
      primary: '#14213d',
      secondary: 'rgba(20, 33, 61, 0.74)',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: ['"Averta Std"', '"Segoe UI"', 'Inter', 'sans-serif'].join(','),
    h2: {
      fontWeight: 900,
      fontSize: '1.9rem',
      lineHeight: 1.08,
    },
    h3: {
      fontWeight: 800,
      fontSize: '1.15rem',
      lineHeight: 1.15,
    },
    body2: {
      lineHeight: 1.45,
    },
  },
});

const tableHeaderSx = {
  py: 1.2,
  px: 1.25,
  color: '#fff',
  fontWeight: 800,
  fontSize: '0.77rem',
  textAlign: 'center',
  borderRight: '1px solid rgba(255,255,255,0.3)',
  '&:last-of-type': { borderRight: 'none' },
};

const tableCellSx = {
  py: 1.25,
  px: 1.1,
  minHeight: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#23324d',
  fontWeight: 700,
  borderRight: '1px solid rgba(255,255,255,0.88)',
  borderBottom: '1px solid rgba(255,255,255,0.88)',
  '&:nth-of-type(3n)': { borderRight: 'none' },
};

function ArrowLabel({
  x,
  y,
  textAnchor = 'middle',
  children,
}: {
  x: number;
  y: number;
  textAnchor?: 'start' | 'middle' | 'end';
  children: React.ReactNode;
}) {
  return (
    <text x={x} y={y} textAnchor={textAnchor} fontSize="13" fontWeight="700" fill="#111827">
      {children}
    </text>
  );
}

function BiologicalDiagram({ copy }: { copy: ComparisonCopy['biologicalLabels'] }) {
  return (
    <Box sx={{ width: '100%', height: { xs: 300, md: 330 } }}>
      <svg viewBox="0 0 550 320" width="100%" height="100%" role="img" aria-label="Biological neuron diagram">
        <defs>
          <marker id="bio-arrowhead" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#111827" />
          </marker>
        </defs>

        <g stroke="#68b37c" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 120 160 L 50 80 L 30 90 M 50 80 L 40 50" strokeWidth="8" />
          <path d="M 120 160 L 40 140 M 120 160 L 50 220 L 20 240 M 50 220 L 70 260" strokeWidth="7" />
          <path d="M 120 160 L 160 80 L 190 60 M 160 80 L 130 50" strokeWidth="8" />
          <path d="M 120 160 L 170 240 L 150 280 M 170 240 L 210 260" strokeWidth="7" />
        </g>

        <path d="M 120 160 Q 250 180, 400 160" fill="none" stroke="#68b37c" strokeWidth="6" />

        <g stroke="#68b37c" fill="none" strokeLinecap="round" strokeWidth="4">
          <path d="M 400 160 Q 420 150, 440 100 M 420 125 Q 440 130, 460 115" />
          <path d="M 400 160 Q 420 170, 450 150" />
          <path d="M 400 160 Q 420 180, 430 210" />
          <path d="M 380 164 Q 400 200, 410 220" />
        </g>
        <g fill="#2e7d32">
          <circle cx="440" cy="100" r="4" />
          <circle cx="460" cy="115" r="4" />
          <circle cx="450" cy="150" r="4" />
          <circle cx="430" cy="210" r="4" />
          <circle cx="410" cy="220" r="4" />
        </g>

        <path
          d="M 120 120 C 150 110, 160 140, 165 160 C 160 185, 140 200, 120 195 C 90 190, 80 160, 90 135 C 100 120, 110 125, 120 120 Z"
          fill="#68b37c"
          stroke="#529464"
          strokeWidth="2"
        />
        <circle cx="123" cy="158" r="14" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />

        <g fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5">
          <rect x="180" y="157" width="35" height="14" rx="5" transform="rotate(3 197 164)" />
          <rect x="225" y="159" width="35" height="14" rx="5" transform="rotate(1 242 166)" />
          <rect x="270" y="159" width="35" height="14" rx="5" transform="rotate(-1 287 166)" />
          <rect x="315" y="157" width="35" height="14" rx="5" transform="rotate(-3 332 164)" />
          <rect x="360" y="153" width="35" height="14" rx="5" transform="rotate(-5 377 160)" />
        </g>

        <circle cx="475" cy="245" r="45" fill="#f0fdf4" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="435" y1="215" x2="450" y2="220" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.5" />
        <path d="M 445 210 C 455 220, 480 220, 485 240 C 485 255, 465 260, 450 250 Z" fill="#68b37c" stroke="#2e7d32" strokeWidth="1.5" />
        <circle cx="470" cy="248" r="2.5" fill="#3b82f6" />
        <circle cx="460" cy="255" r="2.5" fill="#3b82f6" />
        <circle cx="478" cy="258" r="2.5" fill="#3b82f6" />
        <path d="M 495 230 Q 470 255, 495 280" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />

        <ArrowLabel x={135} y={45}>{copy.dendrites}</ArrowLabel>
        <line x1="105" y1="52" x2="65" y2="85" stroke="#111827" strokeWidth="1.5" markerEnd="url(#bio-arrowhead)" />
        <line x1="135" y1="52" x2="145" y2="75" stroke="#111827" strokeWidth="1.5" markerEnd="url(#bio-arrowhead)" />

        <ArrowLabel x={210} y={70} textAnchor="end">{copy.soma}</ArrowLabel>
        <text x="210" y="85" textAnchor="end" fontSize="11" fill="#111827">{copy.cellBody}</text>
        <line x1="180" y1="92" x2="150" y2="130" stroke="#111827" strokeWidth="1.5" markerEnd="url(#bio-arrowhead)" />

        <ArrowLabel x={175} y={130} textAnchor="end">{copy.nucleus}</ArrowLabel>
        <line x1="140" y1="135" x2="125" y2="145" stroke="#111827" strokeWidth="1.5" markerEnd="url(#bio-arrowhead)" />

        <ArrowLabel x={280} y={115} textAnchor="middle">{copy.axon}</ArrowLabel>
        <line x1="270" y1="120" x2="265" y2="150" stroke="#111827" strokeWidth="1.5" markerEnd="url(#bio-arrowhead)" />

        <ArrowLabel x={200} y={240}>{copy.myelinLine1}</ArrowLabel>
        <ArrowLabel x={200} y={255}>{copy.myelinLine2}</ArrowLabel>
        <line x1="200" y1="225" x2="230" y2="180" stroke="#111827" strokeWidth="1.5" markerEnd="url(#bio-arrowhead)" />

        <ArrowLabel x={350} y={245}>{copy.synapse}</ArrowLabel>
        <text x="350" y="260" textAnchor="middle" fontSize="11" fill="#111827">{copy.synapseGap}</text>
        <line x1="395" y1="245" x2="425" y2="245" stroke="#111827" strokeWidth="1.5" markerEnd="url(#bio-arrowhead)" />

        <ArrowLabel x={475} y={45}>{copy.terminalsLine1}</ArrowLabel>
        <ArrowLabel x={475} y={60}>{copy.terminalsLine2}</ArrowLabel>
        <line x1="465" y1="65" x2="445" y2="92" stroke="#111827" strokeWidth="1.5" markerEnd="url(#bio-arrowhead)" />
      </svg>
    </Box>
  );
}

function ComputationalDiagram({ copy }: { copy: ComparisonCopy['computationalLabels'] }) {
  return (
    <Box sx={{ width: '100%', height: { xs: 300, md: 330 } }}>
      <svg viewBox="0 0 540 320" width="100%" height="100%" role="img" aria-label="Computational neuron diagram">
        <defs>
          <marker id="comp-arrowhead" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#111827" />
          </marker>
        </defs>

        <circle cx="340" cy="160" r="45" fill="#fce4d6" stroke="#e36c0a" strokeWidth="3" />
        <text x="340" y="165" textAnchor="middle" fontFamily="Times New Roman, serif">
          <tspan fontSize="24" dy="2">∑</tspan>
          <tspan fontStyle="italic" fontSize="18" dx="2" dy="-2">w</tspan>
          <tspan fontStyle="italic" fontSize="10" dy="5">i</tspan>
          <tspan fontStyle="italic" fontSize="18" dy="-5">x</tspan>
          <tspan fontStyle="italic" fontSize="10" dy="5">i</tspan>
          <tspan fontSize="16" dy="-5"> + </tspan>
          <tspan fontStyle="italic" fontSize="18">b</tspan>
        </text>

        <circle cx="460" cy="160" r="25" fill="#e4dfec" stroke="#7030a0" strokeWidth="3" />
        <text x="460" y="168" textAnchor="middle" fontSize="26" fontFamily="Times New Roman, serif" fontStyle="italic">σ</text>

        <text x="50" y="100" fontSize="22" fontFamily="Times New Roman, serif">
          <tspan fontStyle="italic">x</tspan>
          <tspan fontSize="14" dy="5">1</tspan>
        </text>
        <text x="50" y="140" fontSize="22" fontFamily="Times New Roman, serif">
          <tspan fontStyle="italic">x</tspan>
          <tspan fontSize="14" dy="5">2</tspan>
        </text>
        <text x="52" y="190" fontSize="24" fontFamily="Arial" fontWeight="bold">⋮</text>
        <text x="50" y="235" fontSize="22" fontFamily="Times New Roman, serif">
          <tspan fontStyle="italic">x</tspan>
          <tspan fontSize="14" dy="5">n</tspan>
        </text>

        <line x1="80" y1="95" x2="290" y2="145" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />
        <text x="170" y="105" fontSize="20" fontFamily="Times New Roman, serif">
          <tspan fontStyle="italic">w</tspan>
          <tspan fontSize="12" dy="5">1</tspan>
        </text>
        <line x1="80" y1="135" x2="290" y2="155" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />
        <text x="170" y="145" fontSize="20" fontFamily="Times New Roman, serif">
          <tspan fontStyle="italic">w</tspan>
          <tspan fontSize="12" dy="5">2</tspan>
        </text>
        <line x1="80" y1="230" x2="290" y2="175" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />
        <text x="170" y="230" fontSize="20" fontFamily="Times New Roman, serif">
          <tspan fontStyle="italic">w</tspan>
          <tspan fontSize="12" dy="5">n</tspan>
        </text>

        <line x1="385" y1="160" x2="430" y2="160" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />
        <text x="407" y="150" textAnchor="middle" fontSize="22" fontFamily="Times New Roman, serif" fontStyle="italic">z</text>
        <line x1="485" y1="160" x2="520" y2="160" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />
        <text x="530" y="165" fontSize="22" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>

        <ArrowLabel x={55} y={45}>{copy.inputs}</ArrowLabel>
        <line x1="55" y1="52" x2="55" y2="68" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />

        <ArrowLabel x={210} y={65}>{copy.synapses}</ArrowLabel>
        <line x1="185" y1="72" x2="165" y2="90" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />
        <line x1="235" y1="72" x2="255" y2="90" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />

        <ArrowLabel x={340} y={265}>{copy.weightedSumBias}</ArrowLabel>
        <line x1="340" y1="250" x2="340" y2="210" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />

        <ArrowLabel x={460} y={250}>{copy.activationLine1}</ArrowLabel>
        <ArrowLabel x={460} y={265}>{copy.activationLine2}</ArrowLabel>
        <line x1="460" y1="235" x2="460" y2="190" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />

        <ArrowLabel x={535} y={225} textAnchor="end">{copy.axon}</ArrowLabel>
        <line x1="515" y1="210" x2="500" y2="185" stroke="#111827" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />
      </svg>
    </Box>
  );
}

function ComparisonTable({
  headers,
  rows,
  headerColors,
  cellColors,
}: {
  headers: [string, string, string];
  rows: Array<[string, string, string]>;
  headerColors: [string, string, string];
  cellColors: [string, string, string, string];
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid rgba(18, 26, 47, 0.08)',
      }}
    >
      {headers.map((header, index) => (
        <Box key={header} sx={{ ...tableHeaderSx, bgcolor: headerColors[index] }}>
          {header}
        </Box>
      ))}

      {rows.flatMap((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Box
            key={`${rowIndex}-${cellIndex}`}
            sx={{
              ...tableCellSx,
              bgcolor:
                rowIndex % 2 === 0
                  ? cellIndex === 1
                    ? cellColors[0]
                    : cellColors[1]
                  : cellIndex === 1
                    ? cellColors[2]
                    : cellColors[3],
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              {cell}
            </Typography>
          </Box>
        )),
      )}
    </Box>
  );
}

function FormulaLegend({ copy }: { copy: ComparisonCopy['formulaLegend'] }) {
  const symbolColors = ['#dbeafe', '#dcfce7', '#ede9fe', '#ede9fe', '#fef3c7', '#fee2e2'];
  const symbolBorders = ['#93c5fd', '#86efac', '#c4b5fd', '#c4b5fd', '#fcd34d', '#fca5a5'];

  return (
    <Card
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        border: '3px solid #1d3b70',
        bgcolor: '#fff',
        boxShadow: '0 18px 48px rgba(17, 24, 39, 0.12)',
      }}
    >
      <Chip
        label={copy.title}
        sx={{
          mb: 2.25,
          bgcolor: '#1d3b70',
          color: '#fff',
          fontWeight: 900,
          fontSize: '0.92rem',
          px: 0.8,
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          alignItems: 'stretch',
          gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1fr) 250px' },
        }}
      >
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' } }}>
          {copy.items.map((item, index) => (
            <Stack key={item.symbol} direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  minWidth: 58,
                  height: 58,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 2.5,
                  fontFamily: '"Times New Roman", serif',
                  fontSize: item.symbol === 'σ' ? '1.7rem' : '1.45rem',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  bgcolor: symbolColors[index],
                  border: `2px solid ${symbolBorders[index]}`,
                }}
              >
                {item.symbol}
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={900} sx={{ mb: 0.35 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.body}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>

        <Box
          sx={{
            borderRadius: 3,
            bgcolor: '#eaf3fa',
            border: '1px solid #d4e6f7',
            p: 2.25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Chip
            label={copy.domainBadge}
            sx={{
              alignSelf: 'center',
              mb: 1.5,
              bgcolor: '#1d3b70',
              color: '#fff',
              fontWeight: 800,
            }}
          />
          <Typography sx={{ fontFamily: '"Times New Roman", serif', fontSize: '1.35rem', fontStyle: 'italic', fontWeight: 700, mb: 1 }}>
            {copy.domainFormula}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {copy.domainBody}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export function BiologicalComputationalNeuronSlide() {
  const { tm } = useI18n();
  const copy = tm<ComparisonCopy>('neuronComparison');

  return (
    <ThemeProvider theme={slideTheme}>
      <Box
        sx={{
          minHeight: '100%',
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          bgcolor: 'background.default',
          backgroundImage: 'radial-gradient(circle at top left, rgba(255,255,255,0.95), rgba(246,239,230,0.82) 45%, rgba(242,233,222,0.72) 100%)',
        }}
      >
        <Stack spacing={2.5}>
          <Box sx={{ maxWidth: 820 }}>
            <Typography variant="overline" sx={{ color: '#327d42', letterSpacing: '0.12em' }}>
              {copy.eyebrow}
            </Typography>
            <Typography variant="h2" color="text.primary" sx={{ mt: 0.4 }}>
              {copy.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1.2, maxWidth: 760 }}>
              {copy.subtitle}
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', xl: 'repeat(2, minmax(0, 1fr))' } }}>
            <Card sx={{ p: { xs: 2, md: 2.5 }, bgcolor: 'background.paper' }}>
              <Stack spacing={1.5}>
                <Chip label={copy.biologyTag} sx={{ alignSelf: 'flex-start', bgcolor: '#327d42', color: '#fff', fontWeight: 900 }} />
                <Typography variant="h3" color="text.primary" textAlign="center">
                  {copy.biologyTitle}
                </Typography>
                <BiologicalDiagram copy={copy.biologicalLabels} />
              </Stack>
            </Card>

            <Card sx={{ p: { xs: 2, md: 2.5 }, bgcolor: 'background.paper' }}>
              <Stack spacing={1.5}>
                <Chip label={copy.computationTag} sx={{ alignSelf: 'flex-end', bgcolor: '#7030a0', color: '#fff', fontWeight: 900 }} />
                <Typography variant="h3" color="text.primary" textAlign="center">
                  {copy.computationTitle}
                </Typography>
                <ComputationalDiagram copy={copy.computationalLabels} />
              </Stack>
            </Card>
          </Box>

          <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', xl: 'repeat(2, minmax(0, 1fr))' } }}>
            <ComparisonTable
              headers={copy.biologyTable.headers}
              rows={copy.biologyTable.rows}
              headerColors={['#327d42', '#0070c0', '#005e8a']}
              cellColors={['#d9ead3', '#d9ead3', '#c0dbb8', '#c0dbb8']}
            />
            <ComparisonTable
              headers={copy.computationTable.headers}
              rows={copy.computationTable.rows}
              headerColors={['#e36c0a', '#f79646', '#7030a0']}
              cellColors={['#fce4d6', '#e4dfec', '#f8cbad', '#ccc1d9']}
            />
          </Box>

          <FormulaLegend copy={copy.formulaLegend} />

          <Divider sx={{ borderColor: 'rgba(20, 33, 61, 0.12)' }} />

          <Typography variant="body2" color="text.secondary" textAlign="center" fontStyle="italic">
            {copy.footerNote}
          </Typography>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
