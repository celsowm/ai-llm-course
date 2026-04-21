import { useState } from 'react';
import { Box, Dialog } from '@mui/material';
import { FigureSpec } from '../../../../core/interfaces/Lesson';
import { resolveAssetPath } from './figure-utils';

export function ImageFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'image' }> }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const src = resolveAssetPath(figure.src);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        role="button"
        tabIndex={0}
        aria-label={figure.alt}
        onClick={() => setPreviewOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setPreviewOpen(true);
          }
        }}
        sx={{
          width: '100%',
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
          bgcolor: '#000',
          aspectRatio: '16/10',
          cursor: 'zoom-in',
          outline: 'none',
        }}
      >
        <Box
          component="img"
          src={src}
          alt={figure.alt}
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>

      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(6, 10, 20, 0.96)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 4,
            overflow: 'hidden',
          },
        }}
      >
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <Box
            component="img"
            src={src}
            alt={`${figure.alt} enlarged`}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain',
              display: 'block',
              bgcolor: '#000',
              borderRadius: 3,
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
}
