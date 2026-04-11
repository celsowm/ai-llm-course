import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { CodeBlock } from '../code-block/CodeBlock';
import {
  LEARNING_RATE,
  PYTHON_TRAINING_CODE,
  TRAINING_DATA,
  cloneNetwork,
  createInitialNetwork,
  evaluateDataset,
  sampleDescription,
  trainSingleSample,
  type ForwardResult,
  type NetworkState,
} from './engine';
import { InferencePanel } from './InferencePanel';
import { NetworkGraph } from './NetworkGraph';
import { TrainingControls } from './TrainingControls';
import { TrainingStats } from './TrainingStats';
import type { EpochSummary, InferInput, LabState, Phase } from './types';

// ── helpers ──────────────────────────────────────────────────────────────────

function createInitialState(): LabState {
  return {
    network: createInitialNetwork(),
    iteration: 0, currentSampleIdx: 0, displaySampleIdx: 0,
    currentLoss: 0, smoothedLoss: 0,
    activations: { hidden: [0, 0], output: 0 },
    phase: 'idle', error: 0, target: TRAINING_DATA[0].y,
    deltaO: 0, deltaH: [0, 0], deltaWHO: [0, 0], deltaBO: 0,
    deltaWIH: Array.from({ length: 4 }, () => [0, 0]), deltaBH: [0, 0],
    completedEpochs: [], epochLossAccumulator: 0, epochStepCount: 0, lossHistory: [],
  };
}

function cloneState(s: LabState): LabState {
  return {
    ...s,
    network: cloneNetwork(s.network),
    activations: { hidden: [...s.activations.hidden], output: s.activations.output },
    deltaH: [...s.deltaH], deltaWHO: [...s.deltaWHO],
    deltaWIH: s.deltaWIH.map((r) => [...r]), deltaBH: [...s.deltaBH],
    completedEpochs: s.completedEpochs.map((e) => ({ ...e })),
    lossHistory: [...s.lossHistory],
  };
}

function findLines(snippets: string[]): number[] {
  const lines = PYTHON_TRAINING_CODE.split('\n');
  const nums = new Set<number>();
  snippets.forEach((s) => lines.forEach((l, i) => { if (l.includes(s)) nums.add(i + 1); }));
  return [...nums].sort((a, b) => a - b);
}

const FORWARD_LINES = findLines(['def forward(self', 'h = []', 'soma = sum', 'h.append', 'soma_saida', 'y_pred = sigmoid', 'return h, y_pred', '_, y_pred = self.forward']);
const BACKWARD_LINES = findLines(['def treinar_exemplo', 'h, y_pred = self.forward', 'erro = y_real', 'loss = erro', 'delta_o =', 'delta = self.w_ho', 'self.w_ho[j] +=', 'self.b_o +=', 'self.w_ih[i][j] +=', 'self.b_h[j] +=', 'return loss']);
const EPOCH_LINES = findLines(['for epoca in range', 'loss_total = 0.0', 'for x, y_real', 'loss_total +=', 'loss_media =', 'print(f"Época']);

function activeLines(phase: Phase) {
  if (phase === 'forward') return FORWARD_LINES;
  if (phase === 'backward') return [...BACKWARD_LINES, ...EPOCH_LINES];
  return EPOCH_LINES;
}

function codeAnnotations(lab: LabState): Record<number, string> {
  if (lab.phase === 'idle') return {};
  const lines = PYTHON_TRAINING_CODE.split('\n');
  const out: Record<number, string> = {};
  const add = (snippet: string, text: string) => {
    const i = lines.findIndex((l) => l.includes(snippet));
    if (i >= 0) out[i + 1] = text;
  };
  add('erro = y_real', `# erro = ${lab.error.toFixed(4)}`);
  add('loss = erro', `# loss = ${lab.currentLoss.toFixed(5)}`);
  add('delta_o =', `# delta_o = ${lab.deltaO.toFixed(5)}`);
  return out;
}

function StatCard({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'success' | 'danger' | 'warning' }) {
  const color = { default: 'text.primary', success: 'success.main', danger: 'error.main', warning: 'warning.main' }[tone];
  return (
    <Box sx={{ flex: 1, px: 1.5, py: 0.75, borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="caption" color="text.secondary" noWrap sx={{ flexShrink: 0 }}>{label}</Typography>
      <Typography variant="body2" fontWeight={800} color={color} noWrap>{value}</Typography>
    </Box>
  );
}

// ── component ─────────────────────────────────────────────────────────────────

export function HeartRiskNeuralAnimation() {
  const { locale, tm } = useI18n();
  const labels = tm<Record<string, string>>('heartRisk');
  const nodeLabelMap: Record<string, string> = {
    'in-0': labels.age, 'in-1': labels.pressure, 'in-2': labels.cholesterol,
    'in-3': labels.smoking, 'h-0': 'H1', 'h-1': 'H2', 'out-0': labels.risk,
  };

  const [lab, setLab] = useState<LabState>(createInitialState);
  const [history, setHistory] = useState<LabState[]>([]);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inferInput, setInferInput] = useState<InferInput>({ idade: 55, pressao: 150, colesterol: 230, fumante: 1 });

  const labRef = useRef(lab);
  const speedRef = useRef(speed);
  const busyRef = useRef(false);
  const fwdTimer = useRef<number | null>(null);
  const autoTimer = useRef<number | null>(null);

  useEffect(() => { labRef.current = lab; }, [lab]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => () => {
    if (fwdTimer.current) clearTimeout(fwdTimer.current);
    if (autoTimer.current) clearInterval(autoTimer.current);
  }, []);

  const evaluation = useMemo(() => evaluateDataset(lab.network), [lab.network]);
  const currentEpoch = Math.floor(lab.iteration / TRAINING_DATA.length) + 1;
  const progressInEpoch = ((lab.currentSampleIdx + (lab.phase === 'backward' ? 1 : 0)) / TRAINING_DATA.length) * 100;
  const currentSample = TRAINING_DATA[lab.displaySampleIdx];

  const runStep = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    const cur = labRef.current;
    const sample = TRAINING_DATA[cur.currentSampleIdx];
    const result = trainSingleSample(cur.network, sample, LEARNING_RATE);

    setHistory((h) => [...h, cloneState(cur)]);
    setLab({ ...cur, phase: 'forward', activations: result.forward, displaySampleIdx: cur.currentSampleIdx, currentLoss: result.loss, target: sample.y, error: result.error, deltaO: result.deltaO, deltaH: result.deltaH, deltaWHO: result.deltaWHO, deltaBO: result.deltaBO, deltaWIH: result.deltaWIH, deltaBH: result.deltaBH });

    fwdTimer.current = window.setTimeout(() => {
      const nextIdx = (cur.currentSampleIdx + 1) % TRAINING_DATA.length;
      const nextIter = cur.iteration + 1;
      const accLoss = cur.epochLossAccumulator + result.loss;
      const accSteps = cur.epochStepCount + 1;
      let completedEpochs = cur.completedEpochs;
      let epochLossAccumulator = accLoss;
      let epochStepCount = accSteps;

      if (nextIdx === 0) {
        completedEpochs = [...cur.completedEpochs, { epoch: Math.floor(nextIter / TRAINING_DATA.length), meanLoss: accLoss / TRAINING_DATA.length }];
        epochLossAccumulator = 0;
        epochStepCount = 0;
      }

      setLab({ network: result.nextNetwork, iteration: nextIter, currentSampleIdx: nextIdx, displaySampleIdx: cur.currentSampleIdx, currentLoss: result.loss, smoothedLoss: cur.iteration === 0 ? result.loss : cur.smoothedLoss * 0.85 + result.loss * 0.15, activations: result.forward, phase: 'backward', error: result.error, target: sample.y, deltaO: result.deltaO, deltaH: result.deltaH, deltaWHO: result.deltaWHO, deltaBO: result.deltaBO, deltaWIH: result.deltaWIH, deltaBH: result.deltaBH, completedEpochs, epochLossAccumulator, epochStepCount, lossHistory: [...cur.lossHistory.slice(-99), result.loss] });
      busyRef.current = false;
    }, Math.max(220, 650 / speedRef.current));
  };

  useEffect(() => {
    if (!isPlaying) { if (autoTimer.current) { clearInterval(autoTimer.current); autoTimer.current = null; } return; }
    autoTimer.current = window.setInterval(runStep, Math.max(700, 1250 / speed));
    return () => { if (autoTimer.current) { clearInterval(autoTimer.current); autoTimer.current = null; } };
  }, [isPlaying, speed]);

  const handleReset = () => {
    if (fwdTimer.current) clearTimeout(fwdTimer.current);
    busyRef.current = false;
    setIsPlaying(false);
    setHistory([]);
    setLab(createInitialState());
  };

  const handleUndo = () => {
    if (busyRef.current || history.length === 0) return;
    setLab(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
  };

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', backgroundImage: 'radial-gradient(circle at top left, rgba(239,68,68,0.14), rgba(15,23,42,0.96) 28%, rgba(15,23,42,1) 100%)' }}>
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          {/* Header + stat cards na mesma linha */}
          <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" spacing={2} alignItems={{ lg: 'flex-start' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FavoriteRoundedIcon color="error" />
              <Box>
                <Typography variant="h5" fontWeight={800}>{labels.title}</Typography>
                <Typography variant="body2" color="text.secondary">{labels.subtitle}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              <Chip label={`${labels.iteration} ${lab.iteration}`} color="primary" variant="outlined" size="small" />
              <Chip label={`${labels.epoch} ${currentEpoch}`} color="secondary" variant="outlined" size="small" />
              <Chip label={`${labels.sample} ${lab.currentSampleIdx + 1}/${TRAINING_DATA.length}`} variant="outlined" size="small" />
              <Chip label={lab.phase === 'idle' ? labels.ready : lab.phase === 'forward' ? labels.forward : labels.backward} color={lab.phase === 'backward' ? 'warning' : 'default'} size="small" />
            </Stack>
          </Stack>

          {/* Stat cards preenchendo a linha */}
          <Stack direction="row" spacing={1} sx={{ '& > *': { flex: 1 } }}>
            <StatCard label={labels.currentLoss} value={lab.currentLoss.toFixed(5)} tone={lab.currentLoss > 0.2 ? 'danger' : 'success'} />
            <StatCard label={labels.smoothedLoss} value={lab.smoothedLoss.toFixed(5)} tone="warning" />
            <StatCard label={labels.accuracy} value={`${evaluation.correct}/${evaluation.total}`} tone={evaluation.accuracy >= 0.75 ? 'success' : 'warning'} />
            <StatCard label={labels.prediction} value={lab.activations.output.toFixed(3)} tone={lab.activations.output >= 0.5 ? 'danger' : 'success'} />
            <StatCard label={labels.target} value={lab.target.toFixed(0)} />
          </Stack>

          {/* Controls */}
          <TrainingControls
            labels={labels} isPlaying={isPlaying} speed={speed}
            progressInEpoch={progressInEpoch} canUndo={history.length > 0}
            onPlay={() => setIsPlaying((v) => !v)} onStep={runStep}
            onUndo={handleUndo} onReset={handleReset} onSpeedChange={setSpeed}
          />

          {/* Main grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '1fr 1fr' }, gap: 2 }}>
            {/* Coluna esquerda: grafo + inferência */}
            <Stack spacing={2}>
              <NetworkGraph
                labels={labels} nodeLabelMap={nodeLabelMap}
                network={lab.network} activations={lab.activations}
                phase={lab.phase} currentSample={currentSample}
                sampleDescription={sampleDescription(currentSample, locale)}
                deltaWIH={lab.deltaWIH} deltaWHO={lab.deltaWHO} speed={speed}
              />
              <InferencePanel
                labels={labels} network={lab.network} inferInput={inferInput}
                phase={lab.phase} error={lab.error} deltaO={lab.deltaO} deltaH={lab.deltaH}
                onInferChange={(v) => setInferInput((prev) => ({ ...prev, ...v }))}
              />
            </Stack>

            {/* Coluna direita: código + histórico */}
            <Stack spacing={2}>
              <CodeBlock language="python" caption="tiny_heart_nn.py" code={PYTHON_TRAINING_CODE} activeLines={activeLines(lab.phase)} annotations={codeAnnotations(lab)} />
              <TrainingStats labels={labels} lossHistory={lab.lossHistory} completedEpochs={lab.completedEpochs} />
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
