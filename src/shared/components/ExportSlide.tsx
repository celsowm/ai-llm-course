
import { Box, type BoxProps } from '@mui/material';
import type { ReactNode } from 'react';

interface ExportSlideProps extends BoxProps {
  title: string;
  children: ReactNode;
}

export function ExportSlide({ title, children, sx, ...boxProps }: ExportSlideProps) {
  return (
    <Box
      data-export-slide="true"
      data-export-title={title}
      sx={{
        width: '100%',
        ...sx,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
}
