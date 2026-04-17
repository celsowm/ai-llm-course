import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { MarkdownRenderer } from '../../shared/components/MarkdownRenderer';

interface StepNode {
  id: string;
  x: number;
  y: number;
  column: number;
}

interface NetworkStep {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  activeColumns: number[];
  emphasisNodeIds?: string[];
  highlightEdges?: Array<[string, string]>;
  helper: string;
}

const nodes: StepNode[] = [
  { id: 'input-1', x: 14, y: 22, column: 0 },
  { id: 'input-2', x: 14, y: 50, column: 0 },
  { id: 'input-3', x: 14, y: 78, column: 0 },
  { id: 'embed-1', x: 34, y: 30, column: 1 },
  { id: 'embed-2', x: 34, y: 70, column: 1 },
  { id: 'attn-1', x: 54, y: 22, column: 2 },
  { id: 'attn-2', x: 54, y: 50, column: 2 },
  { id: 'attn-3', x: 54, y: 78, column: 2 },
  { id: 'layer-1', x: 74, y: 30, column: 3 },
  { id: 'layer-2', x: 74, y: 70, column: 3 },
  { id: 'output-1', x: 90, y: 50, column: 4 },
];

const edges: Array<[string, string]> = [
  ['input-1', 'embed-1'],
  ['input-2', 'embed-1'],
  ['input-3', 'embed-2'],
  ['embed-1', 'attn-1'],
  ['embed-1', 'attn-2'],
  ['embed-2', 'attn-3'],
  ['attn-1', 'layer-1'],
  ['attn-2', 'layer-1'],
  ['attn-2', 'layer-2'],
  ['attn-3', 'layer-2'],
  ['layer-1', 'output-1'],
  ['layer-2', 'output-1'],
];

function findNode(id: string) {
  const node = nodes.find((item) => item.id === id);
  if (!node) throw new Error(`Node not found: ${id}`);
  return node;
}

function getSteps(copy: Array<{ id: string; eyebrow: string; title: string; description: string; helper: string }>): NetworkStep[] {
  return [
    {
      ...copy[0],
      activeColumns: [],
      emphasisNodeIds: [],
      highlightEdges: [],
    },
    {
      ...copy[1],
      activeColumns: [0],
      emphasisNodeIds: ['input-1', 'input-2'],
      highlightEdges: [
        ['input-1', 'embed-1'],
        ['input-2', 'embed-1'],
      ],
    },
    {
      ...copy[2],
      activeColumns: [0, 1],
      emphasisNodeIds: ['input-3', 'embed-1', 'embed-2'],
      highlightEdges: [
        ['input-3', 'embed-2'],
        ['input-2', 'embed-1'],
      ],
    },
    {
      ...copy[3],
      activeColumns: [1, 2],
      emphasisNodeIds: ['attn-1', 'attn-2', 'attn-3'],
      highlightEdges: [
        ['embed-1', 'attn-1'],
        ['embed-1', 'attn-2'],
        ['embed-2', 'attn-3'],
      ],
    },
    {
      ...copy[4],
      activeColumns: [2, 3],
      emphasisNodeIds: ['layer-1', 'layer-2'],
      highlightEdges: [
        ['attn-1', 'layer-1'],
        ['attn-2', 'layer-1'],
        ['attn-2', 'layer-2'],
        ['attn-3', 'layer-2'],
      ],
    },
    {
      ...copy[5],
      activeColumns: [3, 4],
      emphasisNodeIds: ['output-1'],
      highlightEdges: [
        ['layer-1', 'output-1'],
        ['layer-2', 'output-1'],
      ],
    },
  ];
}

export function NeuralNetworkStepper() {
  const { t, tm } = useI18n();
  const [stepIndex, setStepIndex] = useState(0);
  const steps = useMemo(() => getSteps(tm<Array<{ id: string; eyebrow: string; title: string; description: string; helper: string }>>('stepper.steps')), [tm]);
  const nodeLabels = useMemo(() => tm<Record<string, string>>('stepper.nodes'), [tm]);
  const step = steps[stepIndex];

  const highlightedEdges = useMemo(() => {
    return new Set((step.highlightEdges ?? []).map(([from, to]) => `${from}-${to}`));
  }, [step.highlightEdges]);

  const highlightedNodes = useMemo(() => new Set(step.emphasisNodeIds ?? []), [step.emphasisNodeIds]);

  const nextStep = () => setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  const previousStep = () => setStepIndex((current) => Math.max(current - 1, 0));
  const reset = () => setStepIndex(0);

  return (
    <Card
      sx={{
        overflow: 'hidden',
        backgroundImage:
          'radial-gradient(circle at top left, rgba(124,58,237,0.18), rgba(15,23,42,0.98) 40%, rgba(15,23,42,1) 100%)',
      }}
    >
      <CardContent>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between">
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <HubRoundedIcon color="primary" />
                <Typography variant="h3">{t('stepper.title')}</Typography>
              </Stack>
              <MarkdownRenderer content={t('stepper.subtitle')} variant="body2" color="text.secondary" />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip color="secondary" label={`${stepIndex + 1} / ${steps.length}`} />
              <Button variant="outlined" startIcon={<PlayArrowRoundedIcon />} onClick={reset}>
                {t('common.restart')}
              </Button>
            </Stack>
          </Stack>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1.4fr) minmax(320px, 0.8fr)' }, gap: 2 }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(2,6,23,0.56)',
                overflow: 'hidden',
                p: 2,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '44px 44px',
                  opacity: 0.3,
                }}
              />

              <Box
                sx={{
                  '@keyframes edgePulse': {
                    '0%': { opacity: 0.45 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0.45 },
                  },
                  '@keyframes nodePulse': {
                    '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(124,58,237,0.32)' },
                    '50%': { transform: 'scale(1.06)', boxShadow: '0 0 0 10px rgba(124,58,237,0.02)' },
                    '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(124,58,237,0.12)' },
                  },
                }}
              >
                <svg viewBox="5 12 90 78" width="100%" height="100%" style={{ minHeight: 380, display: 'block' }}>
                  {edges.map(([fromId, toId]) => {
                    const from = findNode(fromId);
                    const to = findNode(toId);
                    const active = step.activeColumns.includes(from.column) || step.activeColumns.includes(to.column);
                    const highlighted = highlightedEdges.has(`${fromId}-${toId}`);

                    return (
                      <line
                        key={`${fromId}-${toId}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={highlighted ? '#8b5cf6' : active ? 'rgba(96,165,250,0.7)' : 'rgba(148,163,184,0.24)'}
                        strokeWidth={highlighted ? 1.6 : 1}
                        style={{ animation: highlighted ? 'edgePulse 1.8s ease-in-out infinite' : undefined, transition: 'all 220ms ease' }}
                      />
                    );
                  })}

                  {nodes.map((node) => {
                    const active = step.activeColumns.includes(node.column);
                    const highlighted = highlightedNodes.has(node.id);
                    return (
                      <g key={node.id}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={highlighted ? 4.9 : 4.35}
                          fill={highlighted ? '#8b5cf6' : active ? 'rgba(96,165,250,0.88)' : 'rgba(148,163,184,0.38)'}
                          style={{ animation: highlighted ? 'nodePulse 1.8s ease-in-out infinite' : undefined, transition: 'all 220ms ease' }}
                        />
                        <text x={node.x} y={node.y + 8.4} textAnchor="middle" fill={active ? '#e2e8f0' : 'rgba(226,232,240,0.55)'} style={{ fontSize: 3.05, fontWeight: 700 }}>
                          {nodeLabels[node.id]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </Box>
            </Box>

            <Stack spacing={2}>
              <Box sx={{ p: 2.25, borderRadius: 3, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(2,6,23,0.42)' }}>
                <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800 }}>
                  {step.eyebrow}
                </Typography>
                <Typography variant="h3" sx={{ mt: 0.5 }}>
                  {step.title}
                </Typography>
                <MarkdownRenderer content={step.description} variant="body2" color="text.secondary" sx={{ mt: 1.2 }} />
              </Box>

              <Box sx={{ p: 2.25, borderRadius: 3, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(2,6,23,0.42)' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t('stepper.liveTipTitle')}
                </Typography>
                <Divider sx={{ my: 1.4 }} />
                <MarkdownRenderer content={step.helper} variant="body2" />
              </Box>

              <Stack direction="row" spacing={1.2} justifyContent="space-between">
                <Button variant="outlined" startIcon={<ChevronLeftRoundedIcon />} onClick={previousStep} disabled={stepIndex === 0}>
                  {'<'}
                </Button>
                <Button variant="contained" endIcon={<ChevronRightRoundedIcon />} onClick={nextStep} disabled={stepIndex === steps.length - 1}>
                  {'>'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
