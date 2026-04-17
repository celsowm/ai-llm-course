import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { CodeBlock } from '../code-block/CodeBlock';
import { useI18n } from '../../i18n/I18nProvider';
import {
  clampCanvasPrediction,
  formatLinearEquation,
  formatRadialEquation,
  formatValue,
  generateDataset,
  LogisticCircleClassifier,
  type LinearSnapshot,
  type Point,
  type SigmoidSnapshot,
  LinearRegressionModel,
} from './models';

type PanelTab = 'graph' | 'code';
type Variant = 'linear' | 'sigmoid';

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

const LINEAR_CODE = `import math
import random
from dataclasses import dataclass

Point = tuple[float, float, int]

EPOCHS = 120
LOG_EVERY = 1


def randn() -> float:
    return random.gauss(0.0, 1.0)


def sample_circle(n: int, radius_mean: float, radius_std: float, label: int) -> list[Point]:
    points = []

    for _ in range(n):
        angle = random.random() * math.tau
        radius = radius_mean + randn() * radius_std
        x = radius * math.cos(angle)
        y = radius * math.sin(angle)
        points.append((x, y, label))

    return points


def generate_dataset(n_per_class: int = 80) -> list[Point]:
    return [
        *sample_circle(n_per_class, 0.42, 0.05, 0),
        *sample_circle(n_per_class, 1.00, 0.07, 1),
    ]


@dataclass
class LinearRegressionModel:
    lr: float = 0.1
    w1: float = 0.0
    w2: float = 0.0
    b: float = 0.0
    epoch: int = 0

    def __post_init__(self) -> None:
        self.w1 = randn() * 0.12
        self.w2 = randn() * 0.12

    def predict(self, x: float, y: float) -> float:
        return self.w1 * x + self.w2 * y + self.b

    def analyze(self, data: list[Point], with_gradients: bool = False) -> tuple:
        loss = 0.0
        correct = 0
        dw1 = dw2 = db = 0.0

        for x, y, label in data:
            prediction = self.predict(x, y)
            error = prediction - label

            loss += error**2
            correct += int(prediction >= 0.5) == label

            if with_gradients:
                dw1 += 2 * error * x
                dw2 += 2 * error * y
                db += 2 * error

        n = len(data)
        loss /= n
        acc = correct / n

        if not with_gradients:
            return loss, acc

        return loss, acc, dw1 / n, dw2 / n, db / n

    def step(self, data: list[Point]) -> tuple[float, float]:
        loss, acc, dw1, dw2, db = self.analyze(data, with_gradients=True)

        self.w1 -= self.lr * dw1
        self.w2 -= self.lr * dw2
        self.b -= self.lr * db
        self.epoch += 1

        return loss, acc

    def train(self, data: list[Point], epochs: int, log_every: int = 1) -> None:
        for _ in range(epochs):
            loss, acc = self.step(data)

            if self.epoch == 1 or self.epoch % log_every == 0 or self.epoch == epochs:
                print(f"epoch {self.epoch:03d} | loss={loss:.4f} | acc={acc:.3f}")

    def evaluate(self, data: list[Point]) -> tuple[float, float]:
        return self.analyze(data)


def main() -> None:
    data = generate_dataset()
    model = LinearRegressionModel()

    model.train(data, epochs=EPOCHS, log_every=LOG_EVERY)

    loss, acc = model.evaluate(data)

    print("\\nResumo final")
    print(f"epochs  = {model.epoch}")
    print(f"loss    = {loss:.4f}")
    print(f"acc     = {acc:.3f}")
    print(f"equação = y = {model.w1:.2f}x1 + {model.w2:.2f}x2 + {model.b:.2f}")


if __name__ == "__main__":
    main()`;

const SIGMOID_CODE = `import math
import random
from dataclasses import dataclass

Point = tuple[float, float, int]

EPOCHS = 120
LOG_EVERY = 1
SEED = 42


def randn() -> float:
    return random.gauss(0.0, 1.0)


def sigmoid(x: float) -> float:
    if x >= 0:
        z = math.exp(-x)
        return 1.0 / (1.0 + z)

    z = math.exp(x)
    return z / (1.0 + z)


def clip_prob(value: float) -> float:
    return max(1e-8, min(1.0 - 1e-8, value))


def sample_circle(n: int, radius_mean: float, radius_std: float, label: int) -> list[Point]:
    points = []

    for _ in range(n):
        angle = random.random() * math.tau
        radius = radius_mean + randn() * radius_std
        x = radius * math.cos(angle)
        y = radius * math.sin(angle)
        points.append((x, y, label))

    return points


def generate_dataset(n_per_class: int = 80) -> list[Point]:
    return [
        *sample_circle(n_per_class, 0.42, 0.05, 0),
        *sample_circle(n_per_class, 1.00, 0.07, 1),
    ]


def radial_feature(x: float, y: float) -> float:
    return x * x + y * y


@dataclass
class LogisticCircleClassifier:
    lr: float = 0.8
    w: float = 0.0
    b: float = 0.0
    epoch: int = 0
    loss: float = math.nan
    acc: float = math.nan

    def __post_init__(self) -> None:
        self.reset()

    def reset(self) -> None:
        self.w = randn() * 0.1
        self.b = 0.0
        self.epoch = 0
        self.loss = math.nan
        self.acc = math.nan

    def predict(self, x: float, y: float) -> float:
        r2 = radial_feature(x, y)
        return sigmoid(self.w * r2 + self.b)

    def analyze(self, data: list[Point], training: bool = False) -> tuple[float, float]:
        loss = 0.0
        correct = 0
        dw = 0.0
        db = 0.0

        for x, y, label in data:
            r2 = radial_feature(x, y)
            yhat = clip_prob(sigmoid(self.w * r2 + self.b))
            error = yhat - label

            loss += -(label * math.log(yhat) + (1 - label) * math.log(1 - yhat))
            correct += int(yhat >= 0.5) == label

            if training:
                dw += error * r2
                db += error

        n = len(data)
        loss /= n
        acc = correct / n

        if training:
            self.w -= self.lr * dw / n
            self.b -= self.lr * db / n
            self.epoch += 1
            self.loss = loss
            self.acc = acc

        return loss, acc

    def step(self, data: list[Point]) -> tuple[float, float]:
        return self.analyze(data, training=True)

    def evaluate(self, data: list[Point]) -> tuple[float, float]:
        return self.analyze(data, training=False)

    def train(self, data: list[Point], epochs: int, log_every: int = 1) -> None:
        for _ in range(epochs):
            loss, acc = self.step(data)

            if self.epoch == 1 or self.epoch % log_every == 0 or self.epoch == epochs:
                print(f"epoch {self.epoch:03d} | loss={loss:.4f} | acc={acc:.3f}")


def main() -> None:
    random.seed(SEED)

    data = generate_dataset()
    model = LogisticCircleClassifier()

    model.train(data, epochs=EPOCHS, log_every=LOG_EVERY)

    loss, acc = model.evaluate(data)

    print("\\nResumo final")
    print(f"epochs  = {model.epoch}")
    print(f"loss    = {loss:.4f}")
    print(f"acc     = {acc:.3f}")
    print(f"output  = {model.predict(0.5, -0.2):.4f}")
    print(f"equação = sigmoid({model.w:.2f} * r² + {model.b:.2f})")


if __name__ == "__main__":
    main()`;

const COPY = {
  'pt-BR': {
    title: 'Regressão linear vs classificador logístico radial',
    subtitle: 'Mesmo dataset, duas hipóteses e duas fronteiras de decisão.',
    controls: {
      generate: 'Gerar novo conjunto',
      start: 'Iniciar treino',
      pause: 'Pausar',
      reset: 'Resetar modelos',
      speed: 'Velocidade',
    },
    panels: {
      linear: {
        title: 'Regressão linear',
        subtitle: 'Modelo linear puro • sem sigmoide',
      },
      sigmoid: {
        title: 'Classificador logístico radial',
        subtitle: 'Feature radial + saída sigmoide',
      },
    },
    tabs: {
      graph: 'Grafo iterativo',
      code: 'Código completo',
    },
    graph: {
      metrics: 'Métricas',
      math: 'Notação matemática',
      interpretation: 'Interpretação',
      console: 'Mini console',
    },
    linear: {
      badge: 'Sem sigmoide',
      epoch: 'Época',
      loss: 'MSE',
      acc: 'Acurácia (limiar 0,5)',
      equation: 'Equação atual',
      activation: 'Saída contínua',
      mathLines: [
        'prediction = w1x1 + w2x2 + b',
        'error = prediction - label',
        'loss = (1/n) Σ error^2',
        'step() ajusta w1, w2 e b pela média do erro',
      ],
      defs: [
        'x1, x2 = coordenadas da amostra',
        'label = rótulo real (0 ou 1)',
        'prediction = saída da combinação linear',
        'loss = erro quadrático médio',
        'acc = proporção de acertos com limiar 0,5',
      ],
      bullets: [
        'A saída é uma combinação linear das coordenadas.',
        'A loss mede o erro quadrático médio entre saída e rótulo.',
        'Não há sigmoide: o score continua linear.',
        'A fronteira é uma reta, então círculos concêntricos seguem difíceis.',
      ],
    },
    sigmoid: {
      badge: 'Com sigmoide',
      epoch: 'Época',
      loss: 'Loss',
      acc: 'Acurácia',
      equation: 'Equação atual',
      activation: 'σ(z) = 1 / (1 + e^-z)',
      mathLines: [
        'r² = x² + y²',
        'ŷ = σ(w · r² + b)',
        'L = -(1/n) Σ [y log(ŷ) + (1 - y) log(1 - ŷ)]',
        'step() ajusta w e b pela média do erro',
      ],
      defs: [
        'x, y = coordenadas da amostra',
        'r² = feature radial (distância ao quadrado)',
        'w = peso aplicado ao raio ao quadrado',
        'b = viés do classificador',
        'ŷ = probabilidade prevista',
      ],
      bullets: [
        'A feature radial transforma o problema em algo separável por círculo.',
        'A sigmoide converte o score em probabilidade.',
        'A loss é entropia cruzada binária.',
        'A fronteira de decisão vira um anel/círculo, não uma reta.',
      ],
    },
    console: {
      idle: 'aguardando treino',
      running: 'treinando',
      paused: 'pausado',
      completed: 'concluído',
      codeHint: 'troque para a aba de código para inspecionar a implementação',
      graphHint: 'use os controles acima para mudar dados, treino e velocidade',
    },
  },
  en: {
    title: 'Linear regression vs radial logistic classifier',
    subtitle: 'Same dataset, two hypotheses and two decision boundaries.',
    controls: {
      generate: 'Generate new dataset',
      start: 'Start training',
      pause: 'Pause',
      reset: 'Reset models',
      speed: 'Speed',
    },
    panels: {
      linear: {
        title: 'Linear regression',
        subtitle: 'Pure linear model • no sigmoid',
      },
      sigmoid: {
        title: 'Radial logistic classifier',
        subtitle: 'Radial feature + sigmoid output',
      },
    },
    tabs: {
      graph: 'Interactive graph',
      code: 'Full code',
    },
    graph: {
      metrics: 'Metrics',
      math: 'Math notation',
      interpretation: 'Interpretation',
      console: 'Mini console',
    },
    linear: {
      badge: 'No sigmoid',
      epoch: 'Epoch',
      loss: 'MSE',
      acc: 'Accuracy (0.5 threshold)',
      equation: 'Current equation',
      activation: 'Continuous output',
      mathLines: [
        'prediction = w1x1 + w2x2 + b',
        'error = prediction - label',
        'loss = (1/n) Σ error^2',
        'step() updates w1, w2 and b from the mean error',
      ],
      defs: [
        'x1, x2 = sample coordinates',
        'label = ground-truth label (0 or 1)',
        'prediction = linear combination output',
        'loss = mean squared error',
        'acc = fraction correct with a 0.5 threshold',
      ],
      bullets: [
        'The output is a linear combination of the coordinates.',
        'Loss measures the mean squared error between output and label.',
        'There is no sigmoid: the score stays linear.',
        'The boundary is a line, so concentric circles stay hard.',
      ],
    },
    sigmoid: {
      badge: 'With sigmoid',
      epoch: 'Epoch',
      loss: 'Loss',
      acc: 'Accuracy',
      equation: 'Current equation',
      activation: 'σ(z) = 1 / (1 + e^-z)',
      mathLines: [
        'r² = x² + y²',
        'ŷ = σ(w · r² + b)',
        'L = -(1/n) Σ [y log(ŷ) + (1 - y) log(1 - ŷ)]',
        'step() updates w and b from the mean error',
      ],
      defs: [
        'x, y = sample coordinates',
        'r² = radial feature (squared distance)',
        'w = weight applied to squared radius',
        'b = classifier bias',
        'ŷ = predicted probability',
      ],
      bullets: [
        'The radial feature turns the problem into something circle-separable.',
        'The sigmoid converts the score into a probability.',
        'Loss is binary cross-entropy.',
        'The decision boundary becomes a ring/circle, not a line.',
      ],
    },
    console: {
      idle: 'waiting for training',
      running: 'training',
      paused: 'paused',
      completed: 'completed',
      codeHint: 'switch to the code tab to inspect the implementation',
      graphHint: 'use the controls above to change data, training and speed',
    },
  },
} as const;

function drawAxes(ctx: CanvasRenderingContext2D, width: number, height: number) {
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

function drawDataset(ctx: CanvasRenderingContext2D, dataset: Point[], width: number, height: number) {
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

function drawLinearBoundary(
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

function drawSigmoidBoundary(
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

  ctx.save();
  ctx.fillStyle = 'rgba(124,58,237,0.12)';
  ctx.fillRect(0, 0, 0, 0);
  ctx.restore();
}

function drawModelField(
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
      const prediction = clampCanvasPrediction(model.predict(fromX(px + cell / 2), fromY(py + cell / 2)));
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

function PanelTabs({
  accent,
  tab,
  onTabChange,
  labels,
  panelKey,
}: {
  accent: string;
  tab: PanelTab;
  onTabChange: (value: PanelTab) => void;
  labels: { graph: string; code: string };
  panelKey: Variant;
}) {
  return (
    <Tabs
      value={tab}
      onChange={(_, value: PanelTab) => onTabChange(value)}
      variant="fullWidth"
      sx={{
        minHeight: 48,
        bgcolor: 'rgba(15,23,42,0.03)',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
        '& .MuiTabs-indicator': {
          backgroundColor: accent,
          height: 3,
        },
      }}
    >
      <Tab
        label={labels.graph}
        value="graph"
        data-testid={`${panelKey}-tab-graph`}
        sx={{
          minHeight: 48,
          fontWeight: 800,
          color: 'rgba(15,23,42,0.65)',
          '&.Mui-selected': { color: accent },
        }}
      />
      <Tab
        label={labels.code}
        value="code"
        data-testid={`${panelKey}-tab-code`}
        sx={{
          minHeight: 48,
          fontWeight: 800,
          color: 'rgba(15,23,42,0.65)',
          '&.Mui-selected': { color: accent },
        }}
      />
    </Tabs>
  );
}

function MetricRow({
  label,
  value,
  accent,
  testId,
  valueTestId,
}: {
  label: string;
  value: string;
  accent: string;
  testId?: string;
  valueTestId?: string;
}) {
  return (
    <Box
      data-testid={testId}
      sx={{
        p: 1.25,
        borderRadius: 2.5,
        border: `1px solid ${accent}33`,
        bgcolor: `${accent}14`,
        color: '#0f172a',
      }}
    >
      <Typography variant="caption" sx={{ display: 'block', color: 'rgba(15,23,42,0.72)' }}>
        {label}
      </Typography>
      <Typography variant="subtitle1" fontWeight={900} sx={{ lineHeight: 1.15, color: '#0f172a' }} data-testid={valueTestId}>
        {value}
      </Typography>
    </Box>
  );
}

function MiniConsole({
  title,
  text,
  accent,
}: {
  title: string;
  text: string;
  accent: string;
}) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 3,
        border: `1px solid ${accent}33`,
        bgcolor: 'rgba(2,6,23,0.92)',
        color: '#e2e8f0',
      }}
    >
      <Typography variant="subtitle2" fontWeight={900} sx={{ color: accent, mb: 1 }}>
        {title}
      </Typography>
      <Box
        component="pre"
        sx={{
          m: 0,
          color: '#d1fae5',
          fontSize: 12.5,
          lineHeight: 1.55,
          whiteSpace: 'pre-wrap',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
        }}
      >
        {text}
      </Box>
    </Box>
  );
}

function ModelCanvas({
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

function ComparisonPanel({
  variant,
  title,
  subtitle,
  accent,
  badgeColor,
  model,
  snapshot,
  dataset,
  datasetLabel,
  consoleTitle,
  code,
  labels,
  localeCopy,
  codeHint,
  graphHint,
  running,
  renderTick,
}: {
  variant: Variant;
  title: string;
  subtitle: string;
  accent: string;
  badgeColor: string;
  model: LinearRegressionModel | LogisticCircleClassifier;
  snapshot: LinearSnapshot | SigmoidSnapshot;
  dataset: Point[];
  datasetLabel: string;
  consoleTitle: string;
  code: string;
  labels: { graph: string; code: string };
  localeCopy: (typeof COPY)['pt-BR'] | (typeof COPY)['en'];
  codeHint: string;
  graphHint: string;
  running: boolean;
  renderTick: number;
}) {
  const [tab, setTab] = useState<PanelTab>('graph');
  const isLinear = variant === 'linear';
  const epochLimit = isLinear ? LINEAR_TRAINING_EPOCHS : SIGMOID_TRAINING_EPOCHS;
  const sigmoidSnapshot = isLinear ? null : (snapshot as SigmoidSnapshot);
  const equationText = isLinear
    ? formatLinearEquation((snapshot as LinearSnapshot).w1, (snapshot as LinearSnapshot).w2, (snapshot as LinearSnapshot).b)
    : formatRadialEquation(sigmoidSnapshot!.w, sigmoidSnapshot!.b);
  const previewOutput = isLinear ? null : formatValue(model.predict(0.5, -0.2), 4);
  const isComplete = snapshot.epoch >= epochLimit;
  const status = running
    ? localeCopy.console.running
    : isComplete
      ? localeCopy.console.completed
      : localeCopy.console.paused;

  const consoleText = [
    `> dataset: ${datasetLabel}`,
    `> status: ${status}`,
    `> epoch: ${snapshot.epoch} / ${epochLimit}`,
    `> ${isLinear ? 'MSE' : 'loss'}: ${formatValue(snapshot.loss, 4)}`,
    `> acc: ${Number.isFinite(snapshot.acc) ? `${(snapshot.acc * 100).toFixed(1)}%` : '—'}`,
    `> ${isLinear ? localeCopy.linear.equation : localeCopy.sigmoid.equation}: ${equationText}`,
    ...(isLinear ? [] : [`> output: ${previewOutput}`]),
    `> ${tab === 'graph' ? graphHint : codeHint}`,
  ].join('\n');

  return (
    <Box
      sx={{
        height: '100%',
        minWidth: 0,
        borderRadius: 4,
        border: `1px solid ${badgeColor}33`,
        background:
          variant === 'linear'
            ? 'linear-gradient(180deg, rgba(219,234,254,0.5), rgba(255,255,255,0.88))'
            : 'linear-gradient(180deg, rgba(233,213,255,0.45), rgba(255,255,255,0.88))',
        overflow: 'hidden',
        color: '#0f172a',
      }}
    >
      <Box
        sx={{
          p: 1.8,
          borderBottom: '1px solid rgba(15,23,42,0.08)',
          background: 'rgba(255,255,255,0.6)',
          color: '#0f172a',
        }}
      >
        <Stack spacing={0.5}>
          <Typography
            variant="overline"
            sx={{ color: accent, letterSpacing: '0.18em', fontWeight: 900, lineHeight: 1.1, display: 'block' }}
          >
            {variant === 'linear' ? localeCopy.linear.badge : localeCopy.sigmoid.badge}
          </Typography>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 950, lineHeight: 1.05, color: '#0f172a' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(15,23,42,0.72)' }}>
            {subtitle}
          </Typography>
        </Stack>
      </Box>

      <PanelTabs accent={accent} tab={tab} onTabChange={setTab} labels={labels} panelKey={variant} />

      {tab === 'graph' ? (
        <Box sx={{ p: 1.8 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 1.6,
              alignItems: 'start',
            }}
          >
            <ModelCanvas variant={variant} model={model} dataset={dataset} snapshotVersion={renderTick} />

            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                border: `1px solid ${badgeColor}33`,
                bgcolor: 'rgba(248,250,252,0.95)',
                color: '#0f172a',
              }}
            >
              <Typography variant="subtitle2" fontWeight={900} sx={{ mb: 1, color: '#0f172a' }}>
                {localeCopy.graph.metrics}
              </Typography>
              <Stack spacing={1}>
                <MetricRow
                  label={localeCopy.linear.epoch}
                  value={String(snapshot.epoch)}
                  accent={accent}
                  testId={`${variant}-epoch`}
                  valueTestId={`${variant}-epoch-value`}
                />
                <MetricRow
                  label={localeCopy.linear.loss}
                  value={formatValue(snapshot.loss, 4)}
                  accent={accent}
                  testId={`${variant}-loss`}
                />
                <MetricRow
                  label={localeCopy.linear.acc}
                  value={Number.isFinite(snapshot.acc) ? `${(snapshot.acc * 100).toFixed(1)}%` : '—'}
                  accent={accent}
                  testId={`${variant}-acc`}
                  valueTestId={`${variant}-acc-value`}
                />
                <MetricRow
                  label={localeCopy.linear.equation}
                  value={isLinear
                    ? formatLinearEquation((snapshot as LinearSnapshot).w1, (snapshot as LinearSnapshot).w2, (snapshot as LinearSnapshot).b)
                    : formatRadialEquation((snapshot as SigmoidSnapshot).w, (snapshot as SigmoidSnapshot).b)}
                  accent={accent}
                  testId={`${variant}-equation`}
                  valueTestId={`${variant}-equation-value`}
                />
              </Stack>

              <Box
                sx={{
                  mt: 1.5,
                  p: 1.35,
                  borderRadius: 2.5,
                  border: '1px dashed rgba(15,23,42,0.18)',
                  bgcolor: 'rgba(255,255,255,0.72)',
                  color: '#0f172a',
                }}
              >
                <Typography variant="caption" sx={{ display: 'block', mb: 0.8, color: 'rgba(15,23,42,0.72)' }}>
                  {variant === 'linear' ? localeCopy.linear.activation : localeCopy.sigmoid.activation}
                </Typography>
                <Typography variant="body2" fontWeight={800} sx={{ color: '#0f172a' }}>
                  {variant === 'linear'
                    ? 'ŷ = w1x1 + w2x2 + b'
                    : 'ŷ = σ(w · r² + b)'}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                gridColumn: '1 / -1',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                gap: 1.6,
              }}
            >
              <Box
                sx={{
                  p: 1.6,
                  borderRadius: 3,
                  border: `1px solid ${accent}33`,
                  bgcolor: 'rgba(255,255,255,0.74)',
                  color: '#0f172a',
                }}
              >
                <Typography variant="subtitle2" fontWeight={900} sx={{ mb: 1, color: '#0f172a' }}>
                  {localeCopy.graph.math}
                </Typography>
                <Stack spacing={0.75}>
                  {(variant === 'linear' ? localeCopy.linear.mathLines : localeCopy.sigmoid.mathLines).map((line) => (
                    <Typography key={line} variant="body2" sx={{ fontFamily: 'Cambria Math, Georgia, serif', fontSize: '1.02rem', color: '#0f172a' }}>
                      {line}
                    </Typography>
                  ))}
                </Stack>
                <Stack spacing={0.5} sx={{ mt: 1.5 }}>
                  {(variant === 'linear' ? localeCopy.linear.defs : localeCopy.sigmoid.defs).map((line) => (
                    <Typography key={line} variant="caption" sx={{ color: 'rgba(15,23,42,0.72)' }}>
                      {line}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              <Box
                sx={{
                  p: 1.6,
                  borderRadius: 3,
                  border: `1px solid ${accent}33`,
                  bgcolor: 'rgba(255,255,255,0.74)',
                  color: '#0f172a',
                }}
              >
                <Typography variant="subtitle2" fontWeight={900} sx={{ mb: 1, color: '#0f172a' }}>
                  {localeCopy.graph.interpretation}
                </Typography>
                <Stack spacing={1}>
                  {(variant === 'linear' ? localeCopy.linear.bullets : localeCopy.sigmoid.bullets).map((line) => (
                    <Typography key={line} variant="body2" sx={{ lineHeight: 1.55, color: 'rgba(15,23,42,0.72)' }}>
                      • {line}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <MiniConsole title={consoleTitle} text={consoleText} accent={accent} />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 1.8 }}>
          <Stack spacing={1.6}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                border: `1px solid ${accent}33`,
              }}
            >
              <CodeBlock
                language="python"
                caption={variant === 'linear' ? 'linear_regression_model.py' : 'logistic_circle_classifier.py'}
                code={code}
              />
            </Box>
            <MiniConsole title={consoleTitle} text={consoleText} accent={accent} />
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export function RegressionVsSigmoidSlide() {
  const { locale } = useI18n();
  const copy = COPY[locale];

  const [datasetSeed, setDatasetSeed] = useState(42);
  const [dataset, setDataset] = useState<Point[]>(() => generateDataset('circles', 42));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(4);
  const [renderTick, setRenderTick] = useState(0);
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
    setRenderTick((value) => value + 1);
  };

  const resetModels = () => {
    linearRef.current.reset();
    sigmoidRef.current.reset();
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

      if (linearRef.current.epoch < LINEAR_TRAINING_EPOCHS) {
        linearRef.current.step(dataset);
      }
      if (sigmoidRef.current.epoch < SIGMOID_TRAINING_EPOCHS) {
        sigmoidRef.current.step(dataset);
      }

      setSnapshots({
        linear: linearRef.current.snapshot(),
        sigmoid: sigmoidRef.current.snapshot(),
      });
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
            <Stack spacing={1.2}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{ letterSpacing: '0.22em', fontWeight: 900, color: '#8b5cf6', lineHeight: 1.1, display: 'block' }}
                >
                  {copy.title}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    mt: 0.4,
                    fontSize: { xs: '1.9rem', md: '2.45rem' },
                    lineHeight: 1.02,
                    fontWeight: 950,
                    color: '#f8fafc',
                  }}
                >
                  <Box component="span" sx={{ color: '#2563eb' }}>
                    {copy.panels.linear.title}
                  </Box>{' '}
                  vs{' '}
                  <Box component="span" sx={{ color: '#7c3aed' }}>
                    {copy.panels.sigmoid.title}
                  </Box>
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.75, maxWidth: 880, color: 'rgba(226,232,240,0.72)' }}>
                  {copy.subtitle}
                </Typography>
              </Box>

              <Stack
                direction={{ xs: 'column', lg: 'row' }}
                spacing={1}
                sx={{
                  p: 1,
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.08)',
                  bgcolor: 'rgba(255,255,255,0.04)',
                }}
                alignItems={{ xs: 'stretch', lg: 'center' }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  onClick={regenerateDataset}
                  data-testid="generate-data"
                  sx={{ minHeight: 36, px: 1.4, fontSize: 12.5, whiteSpace: 'nowrap', flex: '0 0 auto' }}
                >
                  {copy.controls.generate}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setRunning(true)}
                  data-testid="start-training"
                  sx={{ minHeight: 36, px: 1.4, fontSize: 12.5, whiteSpace: 'nowrap', flex: '0 0 auto' }}
                >
                  {copy.controls.start}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setRunning(false)}
                  data-testid="pause-training"
                  sx={{ minHeight: 36, px: 1.4, fontSize: 12.5, whiteSpace: 'nowrap', flex: '0 0 auto' }}
                >
                  {copy.controls.pause}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={resetModels}
                  data-testid="reset-models"
                  sx={{ minHeight: 36, px: 1.4, fontSize: 12.5, whiteSpace: 'nowrap', flex: '0 0 auto' }}
                >
                  {copy.controls.reset}
                </Button>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    ml: { xs: 0, lg: 'auto' },
                    p: 0.8,
                    borderRadius: 2.5,
                    border: '1px solid rgba(255,255,255,0.08)',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    width: { xs: '100%', lg: 'auto' },
                  }}
                >
                  <Typography variant="body2" fontWeight={800} sx={{ color: '#e2e8f0' }}>
                    {copy.controls.speed}
                  </Typography>
                  <Box sx={{ minWidth: { xs: 'auto', lg: 240 }, px: 0.5 }}>
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
                  <Typography variant="body2" fontWeight={900} sx={{ minWidth: 42, textAlign: 'right', color: '#e2e8f0' }}>
                    {speed}×
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
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
              datasetLabel={locale === 'pt-BR' ? 'Círculos concêntricos' : 'Concentric circles'}
              consoleTitle={linearConsoleTitle}
              code={LINEAR_CODE}
              labels={copy.tabs}
              localeCopy={copy}
              codeHint={copy.console.codeHint}
              graphHint={copy.console.graphHint}
              running={running}
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
              datasetLabel={locale === 'pt-BR' ? 'Círculos concêntricos' : 'Concentric circles'}
              consoleTitle={sigmoidConsoleTitle}
              code={SIGMOID_CODE}
              labels={copy.tabs}
              localeCopy={copy}
              codeHint={copy.console.codeHint}
              graphHint={copy.console.graphHint}
              running={running}
              renderTick={renderTick}
            />
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
