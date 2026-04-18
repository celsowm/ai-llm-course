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
    // The neuron overview needs a tighter text column so the SVG gets more room.
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
          gridTemplateColumns: {
            xs: '1fr',
            lg: visual?.figure.kind === 'neuron-architecture'
              ? 'minmax(0, 0.92fr) minmax(470px, 1.18fr)'
              : 'minmax(0, 1.3fr) minmax(380px, 1fr)',
          },
          gap: visual?.figure.kind === 'neuron-architecture' ? 1.4 : 2.25,
          flexGrow: 1,
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            p: {
              xs: 2.75,
              md: visual?.figure.kind === 'neuron-architecture' ? 2.75 : 4.25,
            },
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
          <Typography
            variant="h1"
            sx={{
              mt: eyebrow ? 1.2 : 0,
              fontSize: {
                xs: '2.05rem',
                md: visual?.figure.kind === 'neuron-architecture' ? '2.3rem' : '3.05rem',
              },
              lineHeight: 1.0,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              maxWidth: visual?.figure.kind === 'neuron-architecture' ? 620 : 860,
            }}
          >
            {title}
          </Typography>
          <Box sx={{ mt: visual?.figure.kind === 'neuron-architecture' ? 2.15 : 3.2 }}>
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
