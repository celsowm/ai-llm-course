import { Box, Stack, Typography, Card, CardContent } from '@mui/material';
import type { TextSection } from '../../../core/interfaces/Lesson';
import type { SectionProps } from './types';
import { MarkdownRenderer } from '../../../shared/components/MarkdownRenderer';

export function TextSectionBlock({ section, variant }: SectionProps<TextSection>) {
  if (variant === 'slide') {
    return (
      <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1 }}>
          {section.title}
        </Typography>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6} alignItems="center">
          {section.imageUrl && (
            <Box
              component="img"
              src={section.imageUrl}
              alt={section.title}
              sx={{
                width: '100%',
                maxWidth: 500,
                height: 'auto',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
          )}

          <MarkdownRenderer
            content={section.body}
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              lineHeight: 1.9,
              maxWidth: section.imageUrl ? 600 : 900,
              flex: 1,
            }}
          />
        </Stack>
      </Stack>
    );
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={1.25}>
          <Typography variant="h3">{section.title}</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            {section.imageUrl && (
              <Box
                component="img"
                src={section.imageUrl}
                alt={section.title}
                sx={{
                  width: '100%',
                  maxWidth: 240,
                  height: 'auto',
                  borderRadius: 2,
                }}
              />
            )}
            <MarkdownRenderer content={section.body} variant="body1" color="text.secondary" sx={{ flex: 1 }} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
