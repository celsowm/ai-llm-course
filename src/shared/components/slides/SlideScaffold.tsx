import { Box, Typography } from '@mui/material';
import { type ReactNode } from 'react';
import type { SlideVisualConfig } from '../../../core/interfaces/Lesson';
import { SectionVisualPanel } from './SectionVisualPanel';

export function SlideScaffold({
  sectionId,
  title,
  eyebrow,
  visual,
  children,
}: {
  sectionId: string;
  title: string;
  eyebrow?: string;
  visual?: SlideVisualConfig;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        p: { xs: 1.75, md: 2.5 },
        height: '100%',
        minHeight: { md: 680 },
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.08)',
        background:
          'radial-gradient(circle at top left, rgba(59,130,246,0.09), rgba(15,23,42,0) 26%), radial-gradient(circle at bottom right, rgba(167,139,250,0.06), rgba(15,23,42,0) 24%), linear-gradient(180deg, rgba(13,18,34,0.98), rgba(8,12,22,0.98))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.3fr) minmax(380px, 1fr)' },
          gap: 2.25,
          flexGrow: 1,
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            p: { xs: 2.75, md: 4.25 },
            borderRadius: 3.5,
            border: '1px solid rgba(255,255,255,0.06)',
            bgcolor: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          {eyebrow ? (
            <Typography variant="overline" color="primary.main" fontWeight={800} sx={{ fontSize: '0.92rem', letterSpacing: '0.22em', opacity: 0.9 }}>
              {eyebrow}
            </Typography>
          ) : null}
          <Typography variant="h1" sx={{ mt: eyebrow ? 1.2 : 0, fontSize: { xs: '2.05rem', md: '3.05rem' }, lineHeight: 1.02, fontWeight: 900, letterSpacing: '-0.03em' }}>
            {title}
          </Typography>
          <Box sx={{ mt: 3.2 }}>
            {children}
          </Box>
        </Box>

        <Box sx={{ height: '100%', minHeight: { xs: 300, lg: 'auto' } }}>
          <SectionVisualPanel sectionId={sectionId} title={title} visual={visual} />
        </Box>
      </Box>
    </Box>
  );
}
