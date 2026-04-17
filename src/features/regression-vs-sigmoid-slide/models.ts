export type DatasetType = 'circles';

export interface Point {
  x: number;
  y: number;
  label: 0 | 1;
}

export interface LinearSnapshot {
  epoch: number;
  loss: number;
  acc: number;
  w1: number;
  w2: number;
  b: number;
}

export interface SigmoidSnapshot {
  epoch: number;
  loss: number;
  acc: number;
  w: number;
  b: number;
}

export interface PredictiveModel {
  predict(x: number, y: number): number;
}

const N_PER_CLASS = 80;
const DEFAULT_SEED = 42;

export function formatValue(value: number, digits = 4) {
  return Number.isFinite(value) ? value.toFixed(digits) : '—';
}

export function formatSignedValue(value: number, digits = 2) {
  const amount = Math.abs(value).toFixed(digits);
  return `${value >= 0 ? '+' : '-'} ${amount}`;
}

function randn() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0;
  let spare: number | null = null;

  const random = () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const gauss = () => {
    if (spare !== null) {
      const value = spare;
      spare = null;
      return value;
    }

    let u = 0;
    let v = 0;
    while (u === 0) u = random();
    while (v === 0) v = random();

    const magnitude = Math.sqrt(-2 * Math.log(u));
    const z0 = magnitude * Math.cos(2 * Math.PI * v);
    const z1 = magnitude * Math.sin(2 * Math.PI * v);
    spare = z1;
    return z0;
  };

  return { random, gauss };
}

function clip01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function clipProb(value: number) {
  return Math.max(1e-8, Math.min(1 - 1e-8, value));
}

export function generateCircles(seed = DEFAULT_SEED) {
  const rng = createSeededRandom(seed);
  const points: Point[] = [];

  for (let i = 0; i < N_PER_CLASS; i++) {
    const angle = rng.random() * Math.PI * 2;
    const radius = 0.42 + rng.gauss() * 0.05;
    points.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle), label: 0 });
  }

  for (let i = 0; i < N_PER_CLASS; i++) {
    const angle = rng.random() * Math.PI * 2;
    const radius = 1 + rng.gauss() * 0.07;
    points.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle), label: 1 });
  }

  return points;
}

export function generateDataset(_type: DatasetType, seed = DEFAULT_SEED) {
  return generateCircles(seed);
}

function formatTerm(value: number, variable?: string, first = false) {
  const amount = Math.abs(value).toFixed(2);
  if (!variable) {
    return `${value >= 0 ? '+' : '-'} ${amount}`;
  }

  if (first) {
    return `${value < 0 ? '-' : ''}${amount}${variable}`;
  }

  return `${value >= 0 ? '+' : '-'} ${amount}${variable}`;
}

export function formatLinearEquation(w1: number, w2: number, b: number) {
  return `ŷ = ${formatTerm(w1, 'x1', true)} ${formatTerm(w2, 'x2')} ${formatTerm(b)}`;
}

export function formatRadialEquation(w: number, b: number) {
  return `ŷ = σ(${formatTerm(w, 'r²', true)} ${formatTerm(b)})`;
}

export class LinearRegressionModel implements PredictiveModel {
  w1 = 0;
  w2 = 0;
  b = 0;
  lr = 0.1;
  epoch = 0;
  loss = Number.NaN;
  acc = Number.NaN;

  constructor() {
    this.reset();
  }

  reset() {
    this.w1 = randn() * 0.12;
    this.w2 = randn() * 0.12;
    this.b = 0;
    this.lr = 0.1;
    this.epoch = 0;
    this.loss = Number.NaN;
    this.acc = Number.NaN;
  }

  predict(x: number, y: number) {
    return this.w1 * x + this.w2 * y + this.b;
  }

  step(data: Point[]) {
    let dw1 = 0;
    let dw2 = 0;
    let db = 0;
    let loss = 0;
    let correct = 0;

    for (const point of data) {
      const prediction = this.predict(point.x, point.y);
      const error = prediction - point.label;

      dw1 += 2 * error * point.x;
      dw2 += 2 * error * point.y;
      db += 2 * error;

      loss += error * error;
      if ((prediction >= 0.5 ? 1 : 0) === point.label) {
        correct++;
      }
    }

    const n = data.length;
    this.w1 -= (this.lr * dw1) / n;
    this.w2 -= (this.lr * dw2) / n;
    this.b -= (this.lr * db) / n;
    this.loss = loss / n;
    this.acc = correct / n;
    this.epoch++;
  }

  snapshot(): LinearSnapshot {
    return {
      epoch: this.epoch,
      loss: this.loss,
      acc: this.acc,
      w1: this.w1,
      w2: this.w2,
      b: this.b,
    };
  }
}

function sigmoid(x: number) {
  if (x >= 0) {
    const z = Math.exp(-x);
    return 1 / (1 + z);
  }

  const z = Math.exp(x);
  return z / (1 + z);
}

function radialFeature(x: number, y: number) {
  return x * x + y * y;
}

export class LogisticCircleClassifier implements PredictiveModel {
  lr = 0.8;
  seed: number;
  w = 0;
  b = 0;
  epoch = 0;
  loss = Number.NaN;
  acc = Number.NaN;

  constructor(seed = DEFAULT_SEED) {
    this.seed = seed;
    this.reset(seed);
  }

  reset(seed = this.seed) {
    this.seed = seed;
    const rng = createSeededRandom(seed);
    this.w = rng.gauss() * 0.1;
    this.b = 0;
    this.lr = 0.8;
    this.epoch = 0;
    this.loss = Number.NaN;
    this.acc = Number.NaN;
  }

  predict(x: number, y: number) {
    return sigmoid(this.w * radialFeature(x, y) + this.b);
  }

  analyze(data: Point[], training = false): [number, number] {
    let loss = 0;
    let correct = 0;
    let dw = 0;
    let db = 0;

    for (const point of data) {
      const r2 = radialFeature(point.x, point.y);
      const yhat = clipProb(this.predict(point.x, point.y));
      const error = yhat - point.label;

      loss += -(point.label * Math.log(yhat) + (1 - point.label) * Math.log(1 - yhat));
      correct += intFromBool((yhat >= 0.5) === Boolean(point.label));

      if (training) {
        dw += error * r2;
        db += error;
      }
    }

    const n = data.length;
    loss /= n;
    const acc = correct / n;

    if (training) {
      this.w -= (this.lr * dw) / n;
      this.b -= (this.lr * db) / n;
      this.epoch++;
      this.loss = loss;
      this.acc = acc;
    }

    return [loss, acc];
  }

  step(data: Point[]) {
    return this.analyze(data, true);
  }

  evaluate(data: Point[]) {
    return this.analyze(data, false);
  }

  snapshot(): SigmoidSnapshot {
    return {
      epoch: this.epoch,
      loss: this.loss,
      acc: this.acc,
      w: this.w,
      b: this.b,
    };
  }
}

function intFromBool(value: boolean) {
  return value ? 1 : 0;
}

export { LogisticCircleClassifier as DeepSigmoidNet };

export function clampCanvasPrediction(value: number) {
  return clip01(value);
}
