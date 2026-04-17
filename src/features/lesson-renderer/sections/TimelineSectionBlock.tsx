import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import type { TimelineSection } from '../../../core/interfaces/Lesson';
import type { SectionProps } from './types';
import { MarkdownRenderer } from '../../../shared/components/MarkdownRenderer';

export function TimelineSectionBlock({ section, variant }: SectionProps<TimelineSection>) {
  if (variant === 'slide') {
    return (
      <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1 }}>
          {section.title}
        </Typography>
        <Stack spacing={2} sx={{ maxWidth: 800 }}>
          {section.items.map((item, idx) => (
            <Card key={idx} variant="outlined" sx={{ bgcolor: 'background.default' }}>
              <CardContent sx={{ py: '12px !important' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary.light" fontWeight={800}>
                    {item.label}
                  </Typography>
                  <Chip label={item.minutes} size="small" variant="outlined" color="secondary" />
                </Stack>
                <MarkdownRenderer content={item.summary} variant="body1" color="text.secondary" sx={{ mt: 0.5 }} />
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    );
  }

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
                  <MarkdownRenderer content={item.summary} variant="body2" color="text.secondary" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
