import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { drawModelField } from '../canvasDrawing';
import {
  LinearRegressionModel,
  LogisticCircleClassifier,
  Point,
} from '../models';
import { Variant } from '../types';

export function ModelCanvas({
  variant,
  model,
  dataset,
  snapshotVersion,
}: {
  variant: Variant;
  model: LinearRegressionModel | LogisticCircleClassifier;
  dataset: Point[];
  snapshotVersion: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawModelField(ctx, dataset, model, variant);
  }, [dataset, model, variant, snapshotVersion]);

  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid rgba(15,23,42,0.12)',
        bgcolor: '#fff',
        color: '#e2e8f0',
      }}
    >
      <canvas
        ref={canvasRef}
        width={620}
        height={420}
        data-testid={`${variant}-canvas`}
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    </Box>
  );
}
