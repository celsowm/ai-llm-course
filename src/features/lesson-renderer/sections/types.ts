import type { LessonSection } from '../../../core/interfaces/Lesson';

export type SectionVariant = 'slide' | 'document';

export interface SectionProps<T extends LessonSection> {
  section: T;
  variant: SectionVariant;
}
