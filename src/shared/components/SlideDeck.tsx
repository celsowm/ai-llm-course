import { Box, LinearProgress } from '@mui/material';
import React, { type ReactNode, useCallback, useEffect, useState } from 'react';
import { useSlideNav } from './SlideNavContext';

interface SlideDeckProps {
  children: ReactNode;
  activeStep?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export function SlideDeck({ children, activeStep: controlledActiveStep, onPrev, onNext }: SlideDeckProps) {
  const [internalActiveStep, setInternalActiveStep] = useState(0);
  const slides = React.Children.toArray(children);
  const maxSteps = slides.length;
  const { setNav } = useSlideNav();

  const isControlled = controlledActiveStep !== undefined;
  const activeStep = isControlled ? controlledActiveStep : internalActiveStep;

  const handlePrev = useCallback(() => {
    if (onPrev) {
      onPrev();
    } else {
      setInternalActiveStep(s => Math.max(0, s - 1));
    }
  }, [onPrev]);

  const handleNext = useCallback(() => {
    if (onNext) {
      onNext();
    } else {
      setInternalActiveStep(s => Math.min(maxSteps - 1, s + 1));
    }
  }, [onNext, maxSteps]);

  useEffect(() => {
    setNav({ activeStep, maxSteps, onPrev: handlePrev, onNext: handleNext });
  }, [activeStep, maxSteps, handlePrev, handleNext, setNav]);

  useEffect(() => {
    return () => setNav(null);
  }, [setNav]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  if (maxSteps === 0) return null;

  const progress = maxSteps > 1 ? (activeStep / (maxSteps - 1)) * 100 : 100;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 52px)', minHeight: 500, overflow: 'hidden' }}>
      <LinearProgress variant="determinate" value={progress} sx={{ height: 3, flexShrink: 0 }} />

      <Box sx={{ flexGrow: 1, minHeight: 0, overflow: 'auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', py: 2, px: 2 }}>
        <Box
          key={activeStep}
          sx={{
            width: '100%',
            maxWidth: 1400,
            mx: 'auto',
            minHeight: 0,
            overflow: 'auto',
            animation: 'fadeIn 0.3s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          {slides[activeStep]}
        </Box>
      </Box>
    </Box>
  );
}
