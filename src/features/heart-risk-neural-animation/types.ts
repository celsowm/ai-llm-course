import type { ForwardResult, NetworkState, PatientSample } from './engine';

export type Phase = 'idle' | 'forward' | 'backward';

export type EpochSummary = { epoch: number; meanLoss: number };

export type LabState = {
  network: NetworkState;
  iteration: number;
  currentSampleIdx: number;
  displaySampleIdx: number;
  currentLoss: number;
  smoothedLoss: number;
  activations: ForwardResult;
  phase: Phase;
  error: number;
  target: number;
  deltaO: number;
  deltaH: number[];
  deltaWHO: number[];
  deltaBO: number;
  deltaWIH: number[][];
  deltaBH: number[];
  completedEpochs: EpochSummary[];
  epochLossAccumulator: number;
  epochStepCount: number;
  lossHistory: number[];
};

export type NodeData = { id: string; x: number; y: number; label: string; group: 'input' | 'hidden' | 'output' };
export type EdgeData = { id: string; from: string; to: string; layer: 'ih' | 'ho'; fromIndex: number; toIndex: number };

export const svgWidth = 920;
export const svgHeight = 470;
export const nodeRadius = 26;

export const nodes: NodeData[] = [
  { id: 'in-0', x: 80,  y: 80,  label: 'Age',         group: 'input'  },
  { id: 'in-1', x: 80,  y: 175, label: 'Pressure',    group: 'input'  },
  { id: 'in-2', x: 80,  y: 270, label: 'Cholesterol', group: 'input'  },
  { id: 'in-3', x: 80,  y: 365, label: 'Fumo',        group: 'input'  },
  { id: 'h-0',  x: 340, y: 165, label: 'H1',          group: 'hidden' },
  { id: 'h-1',  x: 340, y: 280, label: 'H2',          group: 'hidden' },
  { id: 'out-0',x: 560, y: 222, label: 'Risco',       group: 'output' },
];

export const edges: EdgeData[] = [
  { id: 'ih-0-0', from: 'in-0', to: 'h-0',   layer: 'ih', fromIndex: 0, toIndex: 0 },
  { id: 'ih-0-1', from: 'in-0', to: 'h-1',   layer: 'ih', fromIndex: 0, toIndex: 1 },
  { id: 'ih-1-0', from: 'in-1', to: 'h-0',   layer: 'ih', fromIndex: 1, toIndex: 0 },
  { id: 'ih-1-1', from: 'in-1', to: 'h-1',   layer: 'ih', fromIndex: 1, toIndex: 1 },
  { id: 'ih-2-0', from: 'in-2', to: 'h-0',   layer: 'ih', fromIndex: 2, toIndex: 0 },
  { id: 'ih-2-1', from: 'in-2', to: 'h-1',   layer: 'ih', fromIndex: 2, toIndex: 1 },
  { id: 'ih-3-0', from: 'in-3', to: 'h-0',   layer: 'ih', fromIndex: 3, toIndex: 0 },
  { id: 'ih-3-1', from: 'in-3', to: 'h-1',   layer: 'ih', fromIndex: 3, toIndex: 1 },
  { id: 'ho-0',   from: 'h-0',  to: 'out-0', layer: 'ho', fromIndex: 0, toIndex: 0 },
  { id: 'ho-1',   from: 'h-1',  to: 'out-0', layer: 'ho', fromIndex: 1, toIndex: 0 },
];

export function getNode(id: string): NodeData {
  const found = nodes.find((n) => n.id === id);
  if (!found) throw new Error(`Node ${id} not found`);
  return found;
}

export function getEdgeWeight(network: NetworkState, edge: EdgeData): number {
  return edge.layer === 'ih' ? network.wIH[edge.fromIndex][edge.toIndex] : network.wHO[edge.fromIndex];
}

export function activeNodeIds(phase: Phase): string[] {
  if (phase === 'forward')  return ['in-0','in-1','in-2','in-3','h-0','h-1','out-0'];
  if (phase === 'backward') return ['out-0','h-0','h-1','in-0','in-1','in-2','in-3'];
  return ['in-0','in-1','in-2','in-3'];
}

export function activeEdgeIds(phase: Phase): string[] {
  if (phase === 'idle') return [];
  return edges.map((e) => e.id);
}

export function lossPolyline(history: number[]): string {
  if (history.length < 2) return '';
  return history.map((v, i) => `${(i / (history.length - 1)) * 320},${56 - Math.min(1, v) * 56}`).join(' ');
}

export type LabLabels = Record<string, string>;

export type InferInput = { idade: number; pressao: number; colesterol: number; fumante: 0 | 1 };

export type CurrentSampleInfo = { sample: PatientSample; description: string };
