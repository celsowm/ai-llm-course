import { Box, Button, Stack, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { ComparisonPanel } from './components/ComparisonPanel';
import { LINEAR_CODE, SIGMOID_CODE } from './codeSnippets';
import { COPY } from './copy';
import {
  LinearRegressionModel,
  LogisticCircleClassifier,
  Point,
  generateDataset,
  type LinearSnapshot,
  type SigmoidSnapshot,
} from './models';
import {
  formatLinearSummary,
  formatSigmoidSummary,
  formatTrainingLog,
} from './utils';

const slideTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#7c3aed',
    },
    warning: {
      main: '#d97706',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: 'rgba(15,23,42,0.72)',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const LINEAR_TRAINING_EPOCHS = 120;
const SIGMOID_TRAINING_EPOCHS = 120;

export function RegressionVsSigmoidSlide() {
  const { locale } = useI18n();
  const copy = COPY[locale];

  const [datasetSeed, setDatasetSeed] = useState(42);
  const [dataset, setDataset] = useState<Point[]>(() =>
    generateDataset('circles', 42),
  );
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(4);
  const [renderTick, setRenderTick] = useState(0);
  const [consoleTranscripts, setConsoleTranscripts] = useState<{
    linear: string[];
    sigmoid: string[];
  }>({
    linear: [],
    sigmoid: [],
  });
  const [snapshots, setSnapshots] = useState<{
    linear: LinearSnapshot;
    sigmoid: SigmoidSnapshot;
  }>(() => ({
    linear: new LinearRegressionModel().snapshot(),
    sigmoid: new LogisticCircleClassifier().snapshot(),
  }));

  const linearRef = useRef(new LinearRegressionModel());
  const sigmoidRef = useRef(new LogisticCircleClassifier());

  const regenerateDataset = () => {
    const nextSeed = datasetSeed + 1;
    setDatasetSeed(nextSeed);
    setDataset(generateDataset('circles', nextSeed));
    setConsoleTranscripts({ linear: [], sigmoid: [] });
    setRenderTick((value) => value + 1);
  };

  const resetModels = () => {
    linearRef.current.reset();
    sigmoidRef.current.reset();
    setConsoleTranscripts({ linear: [], sigmoid: [] });
    setSnapshots({
      linear: linearRef.current.snapshot(),
      sigmoid: sigmoidRef.current.snapshot(),
    });
    setRunning(false);
    setRenderTick((value) => value + 1);
  };

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    let timer = 0;
    let cancelled = false;
    const intervalMs = Math.max(50, Math.round(1000 / Math.max(1, speed)));

    const loop = () => {
      if (cancelled) {
        return;
      }

      const nextConsoleLines: { linear: string[]; sigmoid: string[] } = {
        linear: [],
        sigmoid: [],
      };

      if (linearRef.current.epoch < LINEAR_TRAINING_EPOCHS) {
        linearRef.current.step(dataset);
        nextConsoleLines.linear = [
          formatTrainingLog(
            linearRef.current.epoch,
            linearRef.current.loss,
            linearRef.current.acc,
          ),
        ];
      }
      if (sigmoidRef.current.epoch < SIGMOID_TRAINING_EPOCHS) {
        sigmoidRef.current.step(dataset);
        nextConsoleLines.sigmoid = [
          formatTrainingLog(
            sigmoidRef.current.epoch,
            sigmoidRef.current.loss,
            sigmoidRef.current.acc,
          ),
        ];
      }

      setSnapshots({
        linear: linearRef.current.snapshot(),
        sigmoid: sigmoidRef.current.snapshot(),
      });
      setConsoleTranscripts((prev) => ({
        linear: [
          ...prev.linear,
          ...nextConsoleLines.linear,
          ...(linearRef.current.epoch >= LINEAR_TRAINING_EPOCHS &&
          prev.linear.length + nextConsoleLines.linear.length ===
            LINEAR_TRAINING_EPOCHS
            ? formatLinearSummary(linearRef.current)
            : []),
        ],
        sigmoid: [
          ...prev.sigmoid,
          ...nextConsoleLines.sigmoid,
          ...(sigmoidRef.current.epoch >= SIGMOID_TRAINING_EPOCHS &&
          prev.sigmoid.length + nextConsoleLines.sigmoid.length ===
            SIGMOID_TRAINING_EPOCHS
            ? formatSigmoidSummary(sigmoidRef.current)
            : []),
        ],
      }));
      setRenderTick((value) => value + 1);

      if (
        linearRef.current.epoch >= LINEAR_TRAINING_EPOCHS &&
        sigmoidRef.current.epoch >= SIGMOID_TRAINING_EPOCHS
      ) {
        setRunning(false);
        return;
      }

      timer = window.setTimeout(loop, intervalMs);
    };

    timer = window.setTimeout(loop, intervalMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [dataset, running, speed]);

  const linearSnapshot = snapshots.linear;
  const sigmoidSnapshot = snapshots.sigmoid;
  const linearConsoleLines = consoleTranscripts.linear;
  const sigmoidConsoleLines = consoleTranscripts.sigmoid;

  const linearConsoleTitle = `${copy.graph.console} · ${copy.panels.linear.title}`;
  const sigmoidConsoleTitle = `${copy.graph.console} · ${copy.panels.sigmoid.title}`;

  return (
    <ThemeProvider theme={slideTheme}>
      <Box
        sx={{
          width: '100%',
          minHeight: '100%',
          p: { xs: 1.5, md: 2.25 },
          borderRadius: 5,
          color: '#e2e8f0',
          background:
            'radial-gradient(circle at top left, rgba(96,165,250,0.16), rgba(15,23,42,0) 28%), radial-gradient(circle at bottom right, rgba(167,139,250,0.14), rgba(15,23,42,0) 30%), linear-gradient(180deg, rgba(11,16,32,0.96), rgba(9,14,26,0.96))',
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              p: { xs: 1.6, md: 2 },
              borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.08)',
              bgcolor: 'rgba(18,26,47,0.78)',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 18px 42px rgba(0,0,0,0.22)',
              color: '#e2e8f0',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  lg: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
                },
                gap: 1.5,
                alignItems: 'start',
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.85rem', md: '2.35rem' },
                    lineHeight: 1.02,
                    fontWeight: 950,
                    color: '#f8fafc',
                    maxWidth: 760,
                  }}
                >
                  {copy.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 0.6, maxWidth: 740, color: 'rgba(226,232,240,0.72)' }}
                >
                  {copy.subtitle}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, minmax(0, 1fr))',
                  },
                  gap: 1,
                  p: 1,
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.08)',
                  bgcolor: 'rgba(255,255,255,0.04)',
                  minWidth: 0,
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  onClick={regenerateDataset}
                  data-testid="generate-data"
                  sx={{ minHeight: 36, px: 1.2, fontSize: 12.5, whiteSpace: 'nowrap' }}
                >
                  {copy.controls.generate}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setRunning(true)}
                  data-testid="start-training"
                  sx={{ minHeight: 36, px: 1.2, fontSize: 12.5, whiteSpace: 'nowrap' }}
                >
                  {copy.controls.start}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setRunning(false)}
                  data-testid="pause-training"
                  sx={{ minHeight: 36, px: 1.2, fontSize: 12.5, whiteSpace: 'nowrap' }}
                >
                  {copy.controls.pause}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={resetModels}
                  data-testid="reset-models"
                  sx={{ minHeight: 36, px: 1.2, fontSize: 12.5, whiteSpace: 'nowrap' }}
                >
                  {copy.controls.reset}
                </Button>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    gridColumn: '1 / -1',
                    p: 0.8,
                    borderRadius: 2.5,
                    border: '1px solid rgba(255,255,255,0.08)',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    minWidth: 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={800}
                    sx={{ color: '#e2e8f0', whiteSpace: 'nowrap' }}
                  >
                    {copy.controls.speed}
                  </Typography>
                  <Box sx={{ flex: 1, minWidth: 0, px: 0.5 }}>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      step={1}
                      value={speed}
                      onChange={(event) => setSpeed(Number(event.target.value))}
                      data-testid="speed-slider"
                      style={{ width: '100%' }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight={900}
                    sx={{ minWidth: 34, textAlign: 'right', color: '#e2e8f0' }}
                  >
                    {speed}×
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) minmax(0, 1fr)' },
              gap: 2,
              alignItems: 'start',
              maxWidth: 1440,
              mx: 'auto',
            }}
          >
            <ComparisonPanel
              variant="linear"
              title={copy.panels.linear.title}
              subtitle={copy.panels.linear.subtitle}
              accent="#2563eb"
              badgeColor="#60a5fa"
              model={linearRef.current}
              snapshot={linearSnapshot}
              dataset={dataset}
              consoleTitle={linearConsoleTitle}
              code={LINEAR_CODE}
              labels={copy.tabs}
              localeCopy={copy}
              consoleLines={linearConsoleLines}
              renderTick={renderTick}
            />

            <ComparisonPanel
              variant="sigmoid"
              title={copy.panels.sigmoid.title}
              subtitle={copy.panels.sigmoid.subtitle}
              accent="#7c3aed"
              badgeColor="#a78bfa"
              model={sigmoidRef.current}
              snapshot={sigmoidSnapshot}
              dataset={dataset}
              consoleTitle={sigmoidConsoleTitle}
              code={SIGMOID_CODE}
              labels={copy.tabs}
              localeCopy={copy}
              consoleLines={sigmoidConsoleLines}
              renderTick={renderTick}
            />
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
