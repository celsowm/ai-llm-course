export type SectionType =
  | 'hero'
  | 'text'
  | 'list'
  | 'code'
  | 'checkpoint'
  | 'callout'
  | 'timeline';

export type VisualTone = 'primary' | 'secondary' | 'success' | 'warning';

export type FigureSpec =
  | {
      kind: 'vertical-steps';
      steps: Array<{
        label: string;
        icon?: string;
        active?: boolean;
      }>;
    }
  | {
      kind: 'dual-path';
      left: {
        title: string;
        caption: string;
        tone: VisualTone;
        steps: string[];
      };
      right: {
        title: string;
        caption: string;
        tone: VisualTone;
        steps: string[];
      };
      centerLabel?: string;
    }
  | {
      kind: 'loop';
      topRow: Array<{ label: string; tone?: VisualTone }>;
      bottomRow: Array<{ label: string; tone?: VisualTone }>;
      footer: string;
    }
  | {
      kind: 'pillars-grid';
      pipeline: Array<{ label: string; icon: string; tone?: VisualTone }>;
      grid: Array<{ label: string; icon: string; color: string }>;
    }
  | {
      kind: 'image';
      src: string;
      alt: string;
    }
  | {
      kind: 'neuron-focus';
      emphasis: 'overview' | 'inputs' | 'weights' | 'bias' | 'activation' | 'formula';
      footer: string;
    }
  | {
      kind: 'neuron-architecture';
    }
  | {
      kind: 'layer-stack';
      columns: Array<{
        label: string;
        nodes: number;
        tone: VisualTone;
        emphasis?: boolean;
      }>;
      footer: string;
    }
  | {
      kind: 'flow-sequence';
      reverse?: boolean;
      start: string;
      middle: string[];
      end: string;
      primaryNote: string;
      secondaryNote: string;
    }
  | {
      kind: 'metric-compare';
      leftLabel: string;
      leftValue: string;
      leftHeight: number;
      rightLabel: string;
      rightValue: string;
      rightHeight: number;
      centerLabel: string;
      footer: string;
    }
  | {
      kind: 'line-chart';
      points: Array<{
        x: number;
        y: number;
        tone?: VisualTone;
      }>;
      xLabel: string;
      yLabel: string;
      footer: string;
    };

export interface SlideVisualConfig {
  kicker: string;
  figureTitle: string;
  figureCaption: string;
  callouts: string[];
  figure: FigureSpec;
}

interface SectionBase {
  id: string;
  title: string;
  type: SectionType;
  visual?: SlideVisualConfig;
}

export interface HeroSection extends SectionBase {
  type: 'hero';
  eyebrow?: string;
  body: string;
  chips?: string[];
}

export interface TextSection extends SectionBase {
  type: 'text';
  body: string;
  imageUrl?: string;
}

export interface ListSection extends SectionBase {
  type: 'list';
  items: Array<string | { text: string; isEmphasis?: boolean }>;
}

export interface CodeSection extends SectionBase {
  type: 'code';
  language: 'python' | 'bash' | 'tsx';
  caption: string;
  code: string;
}

export interface CheckpointSection extends SectionBase {
  type: 'checkpoint';
  items: string[];
}

export interface CalloutSection extends SectionBase {
  type: 'callout';
  tone: 'info' | 'success' | 'warning';
  body: string;
}

export interface TimelineSection extends SectionBase {
  type: 'timeline';
  items: Array<{
    label: string;
    minutes: string;
    summary: string;
  }>;
}

export type LessonSection =
  | HeroSection
  | TextSection
  | ListSection
  | CodeSection
  | CheckpointSection
  | CalloutSection
  | TimelineSection;

export interface Lesson {
  id: string;
  title: string;
  durationLabel: string;
  summary: string;
  sections: LessonSection[];
}
