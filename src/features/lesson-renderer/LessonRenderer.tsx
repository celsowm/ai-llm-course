import { Grid } from '@mui/material';
import type {
  Lesson,
  LessonSection,
} from '../../core/interfaces/Lesson';
import { ExportSlide } from '../../shared/components/ExportSlide';
import { HeroSectionBlock } from './sections/HeroSectionBlock';
import { TextSectionBlock } from './sections/TextSectionBlock';
import { ListSectionBlock } from './sections/ListSectionBlock';
import { CodeSectionBlock } from './sections/CodeSectionBlock';
import { CheckpointSectionBlock } from './sections/CheckpointSectionBlock';
import { CalloutSectionBlock } from './sections/CalloutSectionBlock';
import { TimelineSectionBlock } from './sections/TimelineSectionBlock';

interface LessonRendererProps {
  lesson: Lesson;
}

function renderSection(section: LessonSection) {
  switch (section.type) {
    case 'hero':
      return <HeroSectionBlock section={section} variant="document" />;
    case 'text':
      return <TextSectionBlock section={section} variant="document" />;
    case 'list':
      return <ListSectionBlock section={section} variant="document" />;
    case 'code':
      return <CodeSectionBlock section={section} variant="document" />;
    case 'checkpoint':
      return <CheckpointSectionBlock section={section} variant="document" />;
    case 'callout':
      return <CalloutSectionBlock section={section} variant="document" />;
    case 'timeline':
      return <TimelineSectionBlock section={section} variant="document" />;
    default:
      return null;
  }
}

export function LessonRenderer({ lesson }: LessonRendererProps) {
  return (
    <Grid container spacing={3}>
      {lesson.sections.map((section) => (
        <Grid size={{ xs: 12 }} key={section.id}>
          <ExportSlide title={section.title}>
            {renderSection(section)}
          </ExportSlide>
        </Grid>
      ))}
    </Grid>
  );
}
