import {
  LinearRegressionModel,
  LogisticCircleClassifier,
  formatValue,
} from './models';

export function formatTrainingLog(epoch: number, loss: number, acc: number) {
  return `epoch ${epoch.toString().padStart(3, '0')} | loss=${loss.toFixed(
    4,
  )} | acc=${acc.toFixed(3)}`;
}

export function formatLinearSummary(model: LinearRegressionModel) {
  return [
    '',
    'Resumo final',
    `epochs  = ${model.epoch}`,
    `loss    = ${formatValue(model.loss, 4)}`,
    `acc     = ${model.acc.toFixed(3)}`,
    `equação = y = ${model.w1.toFixed(2)}x1 + ${model.w2.toFixed(
      2,
    )}x2 + ${model.b.toFixed(2)}`,
  ];
}

export function formatSigmoidSummary(model: LogisticCircleClassifier) {
  return [
    '',
    'Resumo final',
    `epochs  = ${model.epoch}`,
    `loss    = ${formatValue(model.loss, 4)}`,
    `acc     = ${model.acc.toFixed(3)}`,
    `output  = ${model.predict(0.5, -0.2).toFixed(4)}`,
    `equação = sigmoid(${model.w.toFixed(2)} * r² + ${model.b.toFixed(2)})`,
  ];
}
