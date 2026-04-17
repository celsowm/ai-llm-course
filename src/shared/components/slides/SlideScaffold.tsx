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
        minHeight: 0,
        borderRadius: 5,
        border: '1px solid rgba(255,255,255,0.08)',
        background:
          'radial-gradient(circle at top left, rgba(59,130,246,0.16), rgba(15,23,42,0) 28%), linear-gradient(180deg, rgba(15,23,42,0.98), rgba(9,14,26,0.98))',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.45fr) minmax(320px, 0.95fr)' },
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.08)',
            bgcolor: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            minHeight: 0,
          }}
        >
          {eyebrow ? (
            <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ fontSize: '0.95rem', letterSpacing: '0.22em' }}>
              {eyebrow}
            </Typography>
          ) : null}
          <Typography variant="h1" sx={{ mt: eyebrow ? 1.1 : 0, fontSize: { xs: '1.95rem', md: '2.65rem' }, lineHeight: 1.06 }}>
            {title}
          </Typography>
          <Box sx={{ mt: 2.25 }}>
            {children}
          </Box>
        </Box>

        <SectionVisualPanel sectionId={sectionId} title={title} />
      </Box>
    </Box>
  );
}
