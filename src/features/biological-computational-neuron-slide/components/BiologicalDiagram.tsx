import { Box } from '@mui/material';
import { ComparisonCopy } from '../types';
import { ArrowLabel } from './ArrowLabel';

export function BiologicalDiagram({ copy }: { copy: ComparisonCopy['biologicalLabels'] }) {
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
