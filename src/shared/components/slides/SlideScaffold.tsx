import { Box, Typography } from '@mui/material';
import { type ReactNode } from 'react';
import { SectionVisualPanel } from './SectionVisualPanel';

export function SlideScaffold({
  sectionId,
  title,
  eyebrow,
  children,
}: {
  sectionId: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        height: '100%',
        minHeight: { md: 680 },
        borderRadius: 5,
        border: '1px solid rgba(255,255,255,0.08)',
        background:
          'radial-gradient(circle at top left, rgba(59,130,246,0.12), rgba(15,23,42,0) 25%), radial-gradient(circle at bottom right, rgba(167,139,250,0.08), rgba(15,23,42,0) 25%), linear-gradient(180deg, rgba(15,23,42,0.98), rgba(9,14,26,0.98))',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.45fr) minmax(360px, 0.95fr)' },
          gap: 3,
          flexGrow: 1,
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.06)',
            bgcolor: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          {eyebrow ? (
            <Typography variant="overline" color="primary.main" fontWeight={800} sx={{ fontSize: '1rem', letterSpacing: '0.25em', opacity: 0.9 }}>
              {eyebrow}
            </Typography>
          ) : null}
          <Typography variant="h1" sx={{ mt: eyebrow ? 1.5 : 0, fontSize: { xs: '2.2rem', md: '3.2rem' }, lineHeight: 1.05, fontWeight: 900 }}>
            {title}
          </Typography>
          <Box sx={{ mt: 4 }}>
            {children}
          </Box>
        </Box>

        <Box sx={{ height: '100%', minHeight: { xs: 300, lg: 'auto' } }}>
          <SectionVisualPanel sectionId={sectionId} title={title} />
        </Box>
      </Box>
    </Box>
  );
}
