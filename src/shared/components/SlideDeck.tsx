import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';

interface SlideDeckProps {
  children: ReactNode;
}

export function SlideDeck({ children }: SlideDeckProps) {
  const { t } = useI18n();
  const [activeStep, setActiveStep] = useState(0);
  const slides = React.Children.toArray(children);
  const maxSteps = slides.length;

  const handleNext = useCallback(() => {
    setActiveStep((prev) => Math.min(prev + 1, maxSteps - 1));
  }, [maxSteps]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't change slides if the user is typing in an input, textarea or contentEditable element
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack]);

  if (maxSteps === 0) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', minHeight: 500 }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', py: 2, px: 2 }}>
        <Box sx={{ width: '100%' }}>
          {slides[activeStep]}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, py: 1.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Tooltip title={t('common.previousSlide')}>
          <span>
            <IconButton
              onClick={handleBack}
              disabled={activeStep === 0}
              color="primary"
              aria-label={t('common.previousSlide')}
            >
              <KeyboardArrowLeft />
            </IconButton>
          </span>
        </Tooltip>
        <Typography variant="caption" color="text.secondary">
          {activeStep + 1} / {maxSteps}
        </Typography>
        <Tooltip title={t('common.nextSlide')}>
          <span>
            <IconButton
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              color="primary"
              aria-label={t('common.nextSlide')}
            >
              <KeyboardArrowRight />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}
