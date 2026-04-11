export type SectionType =
  | 'hero'
  | 'text'
  | 'list'
  | 'code'
  | 'checkpoint'
  | 'callout'
  | 'timeline';

interface SectionBase {
  id: string;
  title: string;
  type: SectionType;
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
}

export interface ListSection extends SectionBase {
  type: 'list';
  items: string[];
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