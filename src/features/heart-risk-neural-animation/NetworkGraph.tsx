import { Box, Chip, Stack, Typography } from '@mui/material';
import type { ForwardResult, NetworkState, PatientSample } from './engine';
import { formatSigned } from './engine';
import { activeEdgeIds, activeNodeIds, edges, getEdgeWeight, getNode, nodeRadius, nodes } from './types';
import type { LabLabels, Phase } from './types';

interface Props {
  labels: LabLabels;
  nodeLabelMap: Record<string, string>;
  network: NetworkState;
  activations: ForwardResult;
  phase: Phase;
  currentSample: PatientSample;
  sampleDescription: string;
  deltaWIH: number[][];
  deltaWHO: number[];
  speed: number;
}

export function NetworkGraph({ labels, nodeLabelMap, network, activations, phase, currentSample, sampleDescription, deltaWIH, deltaWHO, speed }: Props) {
  const activeNodes = new Set(activeNodeIds(phase));
  const activeEdges = new Set(activeEdgeIds(phase));
  const motionDur = `${(1.1 / speed).toFixed(2)}s`;
  const pulseDur = `${(0.95 / speed).toFixed(2)}s`;

  return (
    <Box sx={{ borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', bgcolor: 'rgba(8,15,30,0.95)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 1, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="center">
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>{labels.currentFlow}</Typography>
            <Typography variant="caption" color="text.secondary">{sampleDescription}</Typography>
          </Box>
          <Chip label={`${labels.target} = ${currentSample.y}`} color={currentSample.y === 1 ? 'error' : 'success'} variant="outlined" size="small" />
        </Stack>
      </Box>

      <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <svg width="100%" viewBox="0 0 640 430" style={{ display: 'block' }} role="img" aria-label={labels.aria}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <text x={60}  y={34} fill="currentColor" style={{ fontSize: 16, fontWeight: 700 }}>{labels.inputs}</text>
          <text x={300} y={34} fill="currentColor" style={{ fontSize: 16, fontWeight: 700 }}>{labels.hidden}</text>
          <text x={530} y={34} fill="currentColor" style={{ fontSize: 16, fontWeight: 700 }}>{labels.output}</text>

          {edges.map((edge) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            const weight = getEdgeWeight(network, edge);
            const active = activeEdges.has(edge.id);
            const stroke = weight >= 0 ? '#34d399' : '#fb7185';
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            const delta = edge.layer === 'ih' ? deltaWIH[edge.fromIndex][edge.toIndex] : deltaWHO[edge.fromIndex];

            return (
              <g key={edge.id}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={stroke} strokeOpacity={active ? 0.78 : 0.16}
                  strokeWidth={Math.min(6, Math.abs(weight) * 4 + 0.8)} strokeLinecap="round"
                  filter={active ? 'url(#glow)' : undefined}
                  style={{ transition: 'all 220ms ease' }}
                />
                {active && (
                  <circle r="4" fill={phase === 'backward' ? '#fbbf24' : '#93c5fd'}>
                    <animateMotion dur={motionDur} repeatCount="indefinite"
                      path={phase === 'backward' ? `M ${to.x} ${to.y} L ${from.x} ${from.y}` : `M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                    />
                  </circle>
                )}
                <rect x={midX - 28} y={midY - 11} width={56} height={22} rx={4} fill="rgba(3,7,18,0.92)" stroke="rgba(255,255,255,0.08)" />
                <text x={midX} y={midY + 4} textAnchor="middle" fill={stroke} style={{ fontSize: 10, fontWeight: 700 }}>{weight.toFixed(2)}</text>
                {phase === 'backward' && (
                  <text x={midX} y={midY + 22} textAnchor="middle" fill="#fbbf24" style={{ fontSize: 9, fontWeight: 700 }}>{formatSigned(delta)}</text>
                )}
              </g>
            );
          })}

          {nodes.map((node) => {
            const active = activeNodes.has(node.id);
            const isInput = node.group === 'input';
            const isHidden = node.group === 'hidden';
            const fill = isInput
              ? active ? '#14532d' : 'rgba(20,83,45,0.42)'
              : isHidden
                ? active ? '#3b0764' : 'rgba(59,7,100,0.38)'
                : active ? '#7f1d1d' : 'rgba(127,29,29,0.42)';
            const value = node.group === 'input'
              ? currentSample.x[Number(node.id.split('-')[1])]
              : node.group === 'hidden'
                ? activations.hidden[Number(node.id.split('-')[1])]
                : activations.output;

            return (
              <g key={node.id}>
                <circle cx={node.x} cy={node.y} r={nodeRadius}
                  fill={fill} stroke={active ? '#ffffff' : 'rgba(255,255,255,0.22)'}
                  strokeWidth={active ? 2.5 : 1.2}
                  filter={active ? 'url(#glow)' : undefined}
                  style={{ transition: 'all 220ms ease' }}
                >
                  {active && <animate attributeName="r" values={`${nodeRadius};${nodeRadius + 2};${nodeRadius}`} dur={pulseDur} repeatCount="indefinite" />}
                </circle>
                <text x={node.x} y={node.y - 4} textAnchor="middle" fill="#fff" style={{ fontSize: 12, fontWeight: 700 }}>{nodeLabelMap[node.id] ?? node.label}</text>
                <text x={node.x} y={node.y + 14} textAnchor="middle" fill="rgba(255,255,255,0.88)" style={{ fontSize: 11 }}>{value.toFixed(2)}</text>
              </g>
            );
          })}
        </svg>
      </Box>
    </Box>
  );
}
