import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import { Box, Stack, Typography } from '@mui/material';
import type { EpochSummary, LabLabels } from './types';
import { lossPolyline } from './types';

interface Props {
  labels: LabLabels;
  lossHistory: number[];
  completedEpochs: EpochSummary[];
}

export function TrainingStats({ labels, lossHistory, completedEpochs }: Props) {
  const points = lossPolyline(lossHistory);
  const lastEpochs = completedEpochs.slice(-5).reverse();

  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ flex: 1, p: 1.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(2,6,23,0.4)' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <AutoGraphRoundedIcon color="primary" fontSize="small" />
          <Typography variant="subtitle2" fontWeight={700}>{labels.lossHistory}</Typography>
        </Stack>
        <svg width="100%" viewBox="0 0 320 56" style={{ display: 'block' }}>
          {[0.25, 0.5, 0.75].map((v) => (
            <line key={v} x1={0} y1={56 - v * 56} x2={320} y2={56 - v * 56} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          ))}
          {points ? (
            <>
              <polyline points={points} fill="none" stroke="#f97316" strokeWidth={1.8} strokeOpacity={0.9} />
              <polygon points={`0,56 ${points} 320,56`} fill="#f97316" fillOpacity={0.08} />
            </>
          ) : (
            <text x={160} y={32} textAnchor="middle" fill="#64748b" style={{ fontSize: 11 }}>{labels.waitingTraining}</text>
          )}
        </svg>
      </Box>

      <Box sx={{ flex: 1, p: 1.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(2,6,23,0.4)' }}>
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>{labels.lastEpochs}</Typography>
        <Stack spacing={0.75}>
          {lastEpochs.length > 0 ? lastEpochs.map((e) => (
            <Stack key={e.epoch} direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">{labels.epoch} {e.epoch}</Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{e.meanLoss.toFixed(5)}</Typography>
            </Stack>
          )) : (
            <Typography variant="body2" color="text.secondary">{labels.firstEpochHint}</Typography>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
