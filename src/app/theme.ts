import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6',
    },
    secondary: {
      main: '#22c55e',
    },
    background: {
      default: '#0b1020',
      paper: '#121a2f',
    },
    text: {
      primary: '#f8fafc',
      secondary: 'rgba(248,250,252,0.82)',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      'Sora',
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.45rem',
      lineHeight: 1.02,
      fontWeight: 900,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontSize: '1.75rem',
      lineHeight: 1.12,
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontSize: '1.2rem',
      lineHeight: 1.22,
      fontWeight: 700,
    },
    body1: {
      lineHeight: 1.62,
    },
    overline: {
      fontSize: '0.76rem',
      fontWeight: 800,
      letterSpacing: '0.16em',
      color: '#a78bfa',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.32), 0 4px 12px rgba(0, 0, 0, 0.18)',
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(255,255,255,0.06)',
        },
        bar: {
          borderRadius: 2,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
