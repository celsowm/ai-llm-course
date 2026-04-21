import { Box } from '@mui/material';
import { ComparisonCopy } from '../types';
import { ArrowLabel } from './ArrowLabel';

export function ComputationalDiagram({ copy }: { copy: ComparisonCopy['computationalLabels'] }) {
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
