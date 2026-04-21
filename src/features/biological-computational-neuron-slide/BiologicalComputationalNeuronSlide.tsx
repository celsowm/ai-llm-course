import {
  Box,
  Card,
  Chip,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useI18n } from '../../i18n/I18nProvider';
import { BiologicalDiagram } from './components/BiologicalDiagram';
import { ComputationalDiagram } from './components/ComputationalDiagram';
import { ComparisonTable } from './components/ComparisonTable';
import { FormulaLegend } from './components/FormulaLegend';
import { ComparisonCopy } from './types';

const slideTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1d4ed8',
    },
    secondary: {
      main: '#6d28d9',
    },
    background: {
      default: '#f6efe6',
      paper: '#fffdf9',
    },
    text: {
      primary: '#14213d',
      secondary: 'rgba(20, 33, 61, 0.74)',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: ['"Averta Std"', '"Segoe UI"', 'Inter', 'sans-serif'].join(','),
    h2: {
      fontWeight: 900,
      fontSize: '1.9rem',
      lineHeight: 1.08,
    },
    h3: {
      fontWeight: 800,
      fontSize: '1.15rem',
      lineHeight: 1.15,
    },
    body2: {
      lineHeight: 1.45,
    },
  },
});

export function BiologicalComputationalNeuronSlide() {
  const { tm } = useI18n();
  const copy = tm<ComparisonCopy>('neuronComparison');

  return (
    <ThemeProvider theme={slideTheme}>
      <Box
        sx={{
          minHeight: '100%',
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          bgcolor: 'background.default',
          backgroundImage:
            'radial-gradient(circle at top left, rgba(255,255,255,0.95), rgba(246,239,230,0.82) 45%, rgba(242,233,222,0.72) 100%)',
        }}
      >
        <Stack spacing={2.5}>
          <Box sx={{ maxWidth: 820 }}>
            <Typography
              variant="overline"
              sx={{ color: '#327d42', letterSpacing: '0.12em' }}
            >
              {copy.eyebrow}
            </Typography>
            <Typography variant="h2" color="text.primary" sx={{ mt: 0.4 }}>
              {copy.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1.2, maxWidth: 760 }}
            >
              {copy.subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 2.5,
              gridTemplateColumns: { xs: '1fr', xl: 'repeat(2, minmax(0, 1fr))' },
            }}
          >
            <Card sx={{ p: { xs: 2, md: 2.5 }, bgcolor: 'background.paper' }}>
              <Stack spacing={1.5}>
                <Chip
                  label={copy.biologyTag}
                  sx={{
                    alignSelf: 'flex-start',
                    bgcolor: '#327d42',
                    color: '#fff',
                    fontWeight: 900,
                  }}
                />
                <Typography variant="h3" color="text.primary" textAlign="center">
                  {copy.biologyTitle}
                </Typography>
                <BiologicalDiagram copy={copy.biologicalLabels} />
              </Stack>
            </Card>

            <Card sx={{ p: { xs: 2, md: 2.5 }, bgcolor: 'background.paper' }}>
              <Stack spacing={1.5}>
                <Chip
                  label={copy.computationTag}
                  sx={{
                    alignSelf: 'flex-end',
                    bgcolor: '#7030a0',
                    color: '#fff',
                    fontWeight: 900,
                  }}
                />
                <Typography variant="h3" color="text.primary" textAlign="center">
                  {copy.computationTitle}
                </Typography>
                <ComputationalDiagram copy={copy.computationalLabels} />
              </Stack>
            </Card>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 2.5,
              gridTemplateColumns: { xs: '1fr', xl: 'repeat(2, minmax(0, 1fr))' },
            }}
          >
            <ComparisonTable
              headers={copy.biologyTable.headers}
              rows={copy.biologyTable.rows}
              headerColors={['#327d42', '#0070c0', '#005e8a']}
              cellColors={['#d9ead3', '#d9ead3', '#c0dbb8', '#c0dbb8']}
            />
            <ComparisonTable
              headers={copy.computationTable.headers}
              rows={copy.computationTable.rows}
              headerColors={['#e36c0a', '#f79646', '#7030a0']}
              cellColors={['#fce4d6', '#e4dfec', '#f8cbad', '#ccc1d9']}
            />
          </Box>

          <FormulaLegend copy={copy.formulaLegend} />

          <Divider sx={{ borderColor: 'rgba(20, 33, 61, 0.12)' }} />

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            fontStyle="italic"
          >
            {copy.footerNote}
          </Typography>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
