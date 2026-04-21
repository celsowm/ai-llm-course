import { FigureSpec } from '../../../core/interfaces/Lesson';
import { NeuronArchitectureDiagram } from './NeuronArchitectureDiagram';
import { VerticalStepsFigure } from './figures/VerticalStepsFigure';
import { DualPathFigure } from './figures/DualPathFigure';
import { LoopFigure } from './figures/LoopFigure';
import { PillarsGridFigure } from './figures/PillarsGridFigure';
import { ImageFigure } from './figures/ImageFigure';
import { NeuronFocusFigure } from './figures/NeuronFocusFigure';
import { LayerStackFigure } from './figures/LayerStackFigure';
import { FlowSequenceFigure } from './figures/FlowSequenceFigure';
import { MetricCompareFigure } from './figures/MetricCompareFigure';
import { LineChartFigure } from './figures/LineChartFigure';

export function SectionFigure({ figure }: { figure: FigureSpec }) {
  switch (figure.kind) {
    case 'vertical-steps':
      return (
        <VerticalStepsFigure
          figure={figure as Extract<FigureSpec, { kind: 'vertical-steps' }>}
        />
      );
    case 'dual-path':
      return (
        <DualPathFigure
          figure={figure as Extract<FigureSpec, { kind: 'dual-path' }>}
        />
      );
    case 'loop':
      return <LoopFigure figure={figure as Extract<FigureSpec, { kind: 'loop' }>} />;
    case 'pillars-grid':
      return (
        <PillarsGridFigure
          figure={figure as Extract<FigureSpec, { kind: 'pillars-grid' }>}
        />
      );
    case 'image':
      return <ImageFigure figure={figure as Extract<FigureSpec, { kind: 'image' }>} />;
    case 'neuron-architecture':
      return <NeuronArchitectureDiagram />;
    case 'neuron-focus':
      return (
        <NeuronFocusFigure
          figure={figure as Extract<FigureSpec, { kind: 'neuron-focus' }>}
        />
      );
    case 'layer-stack':
      return (
        <LayerStackFigure
          figure={figure as Extract<FigureSpec, { kind: 'layer-stack' }>}
        />
      );
    case 'flow-sequence':
      return (
        <FlowSequenceFigure
          figure={figure as Extract<FigureSpec, { kind: 'flow-sequence' }>}
        />
      );
    case 'metric-compare':
      return (
        <MetricCompareFigure
          figure={figure as Extract<FigureSpec, { kind: 'metric-compare' }>}
        />
      );
    case 'line-chart':
      return (
        <LineChartFigure
          figure={figure as Extract<FigureSpec, { kind: 'line-chart' }>}
        />
      );
    default:
      return null;
  }
}
