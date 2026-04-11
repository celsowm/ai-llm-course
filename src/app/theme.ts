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
      secondary: 'rgba(248,250,252,0.74)',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.35rem',
      lineHeight: 1.1,
      fontWeight: 800,
    },
    h2: {
      fontSize: '1.75rem',
      lineHeight: 1.2,
      fontWeight: 800,
    },
    h3: {
      fontSize: '1.15rem',
      lineHeight: 1.3,
      fontWeight: 700,
    },
    body1: {
      lineHeight: 1.7,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 14px 32px rgba(0, 0, 0, 0.22)',
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
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});