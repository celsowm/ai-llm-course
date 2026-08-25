import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { Box, Button, Chip, IconButton, LinearProgress, Slider, Stack, Tooltip } from '@mui/material';
import type { LabLabels } from './types';

interface Props {
  labels: LabLabels;
  isPlaying: boolean;
  speed: number;
  progressInEpoch: number;
  canUndo: boolean;
  onPlay: () => void;
  onStep: () => void;
  onUndo: () => void;
  onReset: () => void;
  onSpeedChange: (v: number) => void;
}

export function TrainingControls({ labels, isPlaying, speed, progressInEpoch, canUndo, onPlay, onStep, onUndo, onReset, onSpeedChange }: Props) {
  return (
    <Box sx={{ p: 1.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(2,6,23,0.4)' }}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
        <Button size="small" variant={isPlaying ? 'contained' : 'outlined'} color={isPlaying ? 'error' : 'primary'}
          startIcon={isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />} onClick={onPlay}>
          {isPlaying ? labels.pause : labels.autoplay}
        </Button>
        <Tooltip title={labels.step}>
          <span>
            <IconButton size="small" onClick={onStep} disabled={isPlaying} aria-label={labels.step}>
              <ChevronRightRoundedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={labels.undo}>
          <span>
            <IconButton size="small" onClick={onUndo} disabled={!canUndo || isPlaying} aria-label={labels.undo}>
              <ChevronLeftRoundedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={labels.reset}>
          <span>
            <IconButton size="small" onClick={onReset} aria-label={labels.reset}>
              <RestartAltRoundedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: 220, flexShrink: 0 }}>
          <Chip label={`${speed.toFixed(1)}x`} size="small" color="secondary" sx={{ minWidth: 44 }} />
          <Slider size="small" value={speed} min={0.5} max={2.5} step={0.1}
            onChange={(_, v) => onSpeedChange(v as number)} sx={{ flex: 1 }} />
        </Stack>

        <Box sx={{ flex: 1, minWidth: 80 }}>
          <LinearProgress variant="determinate" value={progressInEpoch} sx={{ height: 5, borderRadius: 999 }} />
        </Box>
      </Stack>
    </Box>
  );
}
