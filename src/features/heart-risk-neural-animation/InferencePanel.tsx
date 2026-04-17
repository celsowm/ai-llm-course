import { Box, Divider, Slider, Stack, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { FormattedText } from '../../shared/components/slides/FormattedText';
import { forwardPass, formatSigned, prepararEntrada } from './engine';
import type { NetworkState } from './engine';
import type { InferInput, LabLabels, Phase } from './types';

interface Props {
  labels: LabLabels;
  network: NetworkState;
  inferInput: InferInput;
  phase: Phase;
  error: number;
  deltaO: number;
  deltaH: number[];
  onInferChange: (v: Partial<InferInput>) => void;
}

export function InferencePanel({ labels, network, inferInput, phase, error, deltaO, deltaH, onInferChange }: Props) {
  const result = useMemo(
    () => forwardPass(network, prepararEntrada(inferInput.idade, inferInput.pressao, inferInput.colesterol, inferInput.fumante)),
    [network, inferInput],
  );

  return (
    <Stack spacing={2}>
      <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(2,6,23,0.45)' }}>
        <Typography variant="subtitle1" fontWeight={700}>{labels.inferenceTitle}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>{labels.inferenceBody}</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">{labels.age}</Typography>
              <Typography variant="body2" color="secondary.main">{inferInput.idade} {labels.years}</Typography>
            </Stack>
            <Slider size="small" value={inferInput.idade} min={20} max={85} onChange={(_, v) => onInferChange({ idade: v as number })} />
          </Box>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">{labels.pressure}</Typography>
              <Typography variant="body2" color="secondary.main">{inferInput.pressao} mmHg</Typography>
            </Stack>
            <Slider size="small" value={inferInput.pressao} min={90} max={200} onChange={(_, v) => onInferChange({ pressao: v as number })} />
          </Box>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">{labels.cholesterol}</Typography>
              <Typography variant="body2" color="secondary.main">{inferInput.colesterol} mg/dL</Typography>
            </Stack>
            <Slider size="small" value={inferInput.colesterol} min={120} max={320} onChange={(_, v) => onInferChange({ colesterol: v as number })} />
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <TextField label={labels.smoker} select SelectProps={{ native: true }}
              value={inferInput.fumante} size="small"
              onChange={(e) => onInferChange({ fumante: Number(e.target.value) as 0 | 1 })}
              sx={{ minWidth: 120 }}
            >
              <option value={0}>{labels.no}</option>
              <option value={1}>{labels.yes}</option>
            </TextField>
            <Box sx={{ flex: 1, p: 1.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', bgcolor: result.output >= 0.5 ? 'rgba(127,29,29,0.25)' : 'rgba(20,83,45,0.25)' }}>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>{labels.estimatedProbability}</Typography>
              <Typography variant="h5" fontWeight={900} color={result.output >= 0.5 ? 'error.main' : 'success.main'}>
                {(result.output * 100).toFixed(1)}%
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(2,6,23,0.45)' }}>
        <Typography variant="subtitle2" fontWeight={700}>{labels.didacticRead}</Typography>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={0.75}>
          {phase === 'idle' && <FormattedText text={labels.idleRead} />}
          {phase === 'forward' && <FormattedText text={labels.forwardRead} />}
          {phase === 'backward' && <FormattedText text={labels.backwardRead} />}
          <Typography variant="body2">{labels.error}: <strong>{error.toFixed(4)}</strong></Typography>
          <Typography variant="body2">{labels.deltaOutput}: <strong>{formatSigned(deltaO)}</strong></Typography>
          <Typography variant="body2">{labels.deltaHidden}: <strong>[{deltaH.map((v) => formatSigned(v)).join(', ')}]</strong></Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
