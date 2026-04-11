import { Chip, Stack, Typography, Card, CardContent } from '@mui/material';
import type { HeroSection } from '../../../core/interfaces/Lesson';
import type { SectionProps } from './types';

export function HeroSectionBlock({ section, variant }: SectionProps<HeroSection>) {
  if (variant === 'slide') {
    return (
      <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
        {section.eyebrow && (
          <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ fontSize: '1rem', letterSpacing: '0.2em' }}>
            {section.eyebrow}
          </Typography>
        )}
        <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.1 }}>
          {section.title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, lineHeight: 1.8, maxWidth: 800 }}>
          {section.body}
        </Typography>
        {section.chips && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {section.chips.map((c) => <Chip key={c} label={c} color="primary" variant="outlined" />)}
          </Stack>
        )}
      </Stack>
    );
  }

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
