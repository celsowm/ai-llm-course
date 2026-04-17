import { Box, Stack } from '@mui/material';
import { type ReactNode } from 'react';

export type Tone = 'primary' | 'secondary' | 'success' | 'warning';

const tonePalette = {
  primary: { border: 'rgba(96,165,250,0.45)', bg: 'rgba(96,165,250,0.12)' },
  secondary: { border: 'rgba(167,139,250,0.45)', bg: 'rgba(167,139,250,0.12)' },
  success: { border: 'rgba(52,211,153,0.45)', bg: 'rgba(52,211,153,0.12)' },
  warning: { border: 'rgba(251,191,36,0.45)', bg: 'rgba(251,191,36,0.12)' },
} as const;

const badgePalette = {
  primary: { border: 'rgba(96,165,250,0.35)', bg: 'rgba(96,165,250,0.12)' },
  secondary: { border: 'rgba(167,139,250,0.35)', bg: 'rgba(167,139,250,0.12)' },
  warning: { border: 'rgba(245,158,11,0.35)', bg: 'rgba(245,158,11,0.12)' },
  success: { border: 'rgba(52,211,153,0.35)', bg: 'rgba(52,211,153,0.12)' },
} as const;

export function FigureNode({
  children,
  sx,
  tone = 'primary',
}: {
  children: ReactNode;
  sx?: object;
  tone?: Tone;
}) {
  return (
    <Box
      sx={{
        px: 1.4,
        py: 0.9,
        borderRadius: 2.5,
        border: `1px solid ${tonePalette[tone].border}`,
        bgcolor: tonePalette[tone].bg,
        color: '#e5eefc',
        fontSize: '0.88rem',
        fontWeight: 700,
        textAlign: 'center',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function MiniBadge({ text, tone = 'primary' }: { text: string; tone?: Tone }) {
  return (
    <Box sx={{ px: 1.2, py: 0.7, borderRadius: 999, border: `1px solid ${badgePalette[tone].border}`, bgcolor: badgePalette[tone].bg, fontSize: '0.8rem', fontWeight: 700 }}>
      {text}
    </Box>
  );
}

export function Connector({ direction = 'right', color = 'primary.main' }: { direction?: 'right' | 'down'; color?: string }) {
  const isRight = direction === 'right';
  return (
    <Box
      sx={{
        position: 'relative',
        width: isRight ? 34 : 2,
        height: isRight ? 2 : 34,
        bgcolor: color,
        opacity: 0.85,
        '&::after': {
          content: '""',
          position: 'absolute',
          ...(isRight
            ? {
                right: -5,
                top: -4,
                borderTop: '5px solid transparent',
                borderBottom: '5px solid transparent',
                borderLeft: `7px solid ${color}`,
              }
            : {
                bottom: -5,
                left: -4,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `7px solid ${color}`,
              }),
        },
      }}
    />
  );
}

export function splitItems(items: string[]) {
  const midpoint = Math.ceil(items.length / 2);
  return {
    primary: items.slice(0, midpoint),
    secondary: items.slice(midpoint),
  };
}
