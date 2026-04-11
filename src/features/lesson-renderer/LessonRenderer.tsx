import {
  Alert,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import type {
  CalloutSection,
  CheckpointSection,
  CodeSection,
  HeroSection,
  Lesson,
  LessonSection,
  ListSection,
  TextSection,
  TimelineSection,
} from '../../core/interfaces/Lesson';
import { CodeBlock } from '../code-block/CodeBlock';
import { ExportSlide } from '../../shared/components/ExportSlide';

interface LessonRendererProps {
  lesson: Lesson;
}

function HeroBlock({ section }: { section: HeroSection }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {section.eyebrow ? (
            <Typography variant="overline" color="primary.main" fontWeight={800}>
              {section.eyebrow}
            </Typography>
          ) : null}

          <Typography variant="h1">{section.title}</Typography>

          <Typography variant="body1" color="text.secondary">
            {section.body}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {section.chips?.map((chip) => (
              <Chip key={chip} label={chip} color="primary" variant="outlined" />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function TextBlock({ section }: { section: TextSection }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1.25}>
          <Typography variant="h3">{section.title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {section.body}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

function ListBlock({ section }: { section: ListSection }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          {section.title}
        </Typography>

        <List disablePadding>
          {section.items.map((item) => (
            <ListItem key={item} disableGutters sx={{ py: 0.65 }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function CodeSectionBlock({ section }: { section: CodeSection }) {
  return (
    <Stack spacing={1.25}>
      <Typography variant="h3">{section.title}</Typography>
      <CodeBlock language={section.language} caption={section.caption} code={section.code} />
    </Stack>
  );
}

function TimelineBlock({ section }: { section: TimelineSection }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h3">{section.title}</Typography>

          <Stack spacing={1.5}>
            {section.items.map((item) => (
              <Card key={`${item.label}-${item.minutes}`} variant="outlined">
                <CardContent>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Typography variant="subtitle1" fontWeight={800}>
                      {item.label}
                    </Typography>
                    <Chip label={item.minutes} size="small" color="secondary" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {item.summary}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function CheckpointBlock({ section }: { section: CheckpointSection }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          {section.title}
        </Typography>

        <List disablePadding>
          {section.items.map((item) => (
            <ListItem key={item} disableGutters sx={{ py: 0.65 }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function CalloutBlock({ section }: { section: CalloutSection }) {
  const severityMap = {
    info: 'info',
    success: 'success',
    warning: 'warning',
  } as const;

  return (
    <Alert severity={severityMap[section.tone]}>
      <strong>{section.title}:</strong> {section.body}
    </Alert>
  );
}

function renderSection(section: LessonSection) {
  switch (section.type) {
    case 'hero':
      return <HeroBlock section={section} />;
    case 'text':
      return <TextBlock section={section} />;
    case 'list':
      return <ListBlock section={section} />;
    case 'code':
      return <CodeSectionBlock section={section} />;
    case 'checkpoint':
      return <CheckpointBlock section={section} />;
    case 'callout':
      return <CalloutBlock section={section} />;
    case 'timeline':
      return <TimelineBlock section={section} />;
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