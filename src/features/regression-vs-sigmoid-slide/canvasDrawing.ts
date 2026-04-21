import {
  LinearRegressionModel,
  LogisticCircleClassifier,
  Point,
  clampCanvasPrediction,
} from './models';
import { Variant } from './types';

export function drawAxes(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(15,23,42,0.12)';
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += 52) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += 52) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(15,23,42,0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();

  ctx.restore();
}

export function drawDataset(
  ctx: CanvasRenderingContext2D,
  dataset: Point[],
  width: number,
  height: number,
) {
  const toX = (x: number) => ((x + 1.7) / 3.4) * width;
  const toY = (y: number) => height - ((y + 1.5) / 3) * height;

  for (const point of dataset) {
    ctx.beginPath();
    ctx.arc(toX(point.x), toY(point.y), 5.6, 0, Math.PI * 2);
    ctx.fillStyle = point.label === 0 ? '#69b34c' : '#5ba3ff';
    ctx.fill();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = point.label === 0 ? '#2e7d32' : '#1d4ed8';
    ctx.stroke();
  }
}

export function drawLinearBoundary(
  ctx: CanvasRenderingContext2D,
  model: LinearRegressionModel,
  width: number,
  height: number,
) {
  const xMin = -1.7;
  const xMax = 1.7;
  const yMin = -1.5;
  const yMax = 1.5;
  const toX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

  ctx.save();
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);

  if (Math.abs(model.w2) > 1e-8) {
    const y1 = (0.5 - model.w1 * xMin - model.b) / model.w2;
    const y2 = (0.5 - model.w1 * xMax - model.b) / model.w2;
    ctx.beginPath();
    ctx.moveTo(toX(xMin), toY(y1));
    ctx.lineTo(toX(xMax), toY(y2));
    ctx.stroke();
  } else if (Math.abs(model.w1) > 1e-8) {
    const x = (0.5 - model.b) / model.w1;
    ctx.beginPath();
    ctx.moveTo(toX(x), toY(yMin));
    ctx.lineTo(toX(x), toY(yMax));
    ctx.stroke();
  }

  ctx.restore();
}

export function drawSigmoidBoundary(
  ctx: CanvasRenderingContext2D,
  model: LogisticCircleClassifier,
  width: number,
  height: number,
) {
  const xMin = -1.7;
  const xMax = 1.7;
  const yMin = -1.5;
  const yMax = 1.5;
  const step = 5;
  const fromX = (px: number) => xMin + (px / width) * (xMax - xMin);
  const fromY = (py: number) => yMin + ((height - py) / height) * (yMax - yMin);

  function sample(px: number, py: number) {
    return model.predict(fromX(px), fromY(py));
  }

  ctx.save();
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 2;
  ctx.setLineDash([]);

  for (let px = 0; px < width - step; px += step) {
    for (let py = 0; py < height - step; py += step) {
      const vTL = sample(px, py);
      const vTR = sample(px + step, py);
      const vBR = sample(px + step, py + step);
      const vBL = sample(px, py + step);

      const crossings: Array<{ x: number; y: number }> = [];

      if ((vTL - 0.5) * (vTR - 0.5) <= 0) {
        crossings.push({
          x: px + ((0.5 - vTL) / (vTR - vTL + 1e-12)) * step,
          y: py,
        });
      }
      if ((vTR - 0.5) * (vBR - 0.5) <= 0) {
        crossings.push({
          x: px + step,
          y: py + ((0.5 - vTR) / (vBR - vTR + 1e-12)) * step,
        });
      }
      if ((vBR - 0.5) * (vBL - 0.5) <= 0) {
        crossings.push({
          x: px + ((0.5 - vBL) / (vBR - vBL + 1e-12)) * step,
          y: py + step,
        });
      }
      if ((vBL - 0.5) * (vTL - 0.5) <= 0) {
        crossings.push({
          x: px,
          y: py + ((0.5 - vTL) / (vBL - vTL + 1e-12)) * step,
        });
      }

      if (crossings.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(crossings[0].x, crossings[0].y);
        ctx.lineTo(crossings[1].x, crossings[1].y);
        ctx.stroke();
        if (crossings.length >= 4) {
          ctx.beginPath();
          ctx.moveTo(crossings[2].x, crossings[2].y);
          ctx.lineTo(crossings[3].x, crossings[3].y);
          ctx.stroke();
        }
      }
    }
  }

  ctx.restore();
}

export function drawModelField(
  ctx: CanvasRenderingContext2D,
  dataset: Point[],
  model: LinearRegressionModel | LogisticCircleClassifier,
  variant: Variant,
) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const xMin = -1.7;
  const xMax = 1.7;
  const yMin = -1.5;
  const yMax = 1.5;
  const cell = 10;
  const fromX = (px: number) => xMin + (px / width) * (xMax - xMin);
  const fromY = (py: number) => yMin + ((height - py) / height) * (yMax - yMin);

  ctx.clearRect(0, 0, width, height);

  for (let px = 0; px < width; px += cell) {
    for (let py = 0; py < height; py += cell) {
      const prediction = clampCanvasPrediction(
        model.predict(fromX(px + cell / 2), fromY(py + cell / 2)),
      );
      const red = Math.round(105 * (1 - prediction) + 91 * prediction);
      const green = Math.round(179 * (1 - prediction) + 163 * prediction);
      const blue = Math.round(76 * (1 - prediction) + 255 * prediction);
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.18)`;
      ctx.fillRect(px, py, cell, cell);
    }
  }

  drawAxes(ctx, width, height);

  if (variant === 'linear') {
    drawLinearBoundary(ctx, model as LinearRegressionModel, width, height);
  } else {
    drawSigmoidBoundary(ctx, model as LogisticCircleClassifier, width, height);
  }

  drawDataset(ctx, dataset, width, height);
}
