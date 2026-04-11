import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box, IconButton, Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react';

interface SlideDeckProps {
  children: ReactNode;
}

export function SlideDeck({ children }: SlideDeckProps) {
  const [activeStep, setActiveStep] = useState(0);
  const slides = React.Children.toArray(children);
  const maxSteps = slides.length;

  if (maxSteps === 0) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', minHeight: 500 }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', py: 2, px: 2 }}>
        <Box sx={{ width: '100%' }}>
          {slides[activeStep]}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, py: 1.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <IconButton onClick={() => setActiveStep(s => s - 1)} disabled={activeStep === 0} color="primary">
          <KeyboardArrowLeft />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {activeStep + 1} / {maxSteps}
        </Typography>
        <IconButton onClick={() => setActiveStep(s => s + 1)} disabled={activeStep === maxSteps - 1} color="primary">
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
}
