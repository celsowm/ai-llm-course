export type PatientSample = {
  id: string;
  raw: {
    idade: number;
    pressao: number;
    colesterol: number;
    fumante: 0 | 1;
  };
  x: number[];
  y: number;
};

export type NetworkState = {
  wIH: number[][];
  bH: number[];
  wHO: number[];
  bO: number;
};

export type ForwardResult = {
  hidden: number[];
  output: number;
};

export type TrainingStepResult = {
  nextNetwork: NetworkState;
  forward: ForwardResult;
  error: number;
  loss: number;
  deltaO: number;
  deltaH: number[];
  deltaWHO: number[];
  deltaBO: number;
  deltaWIH: number[][];
  deltaBH: number[];
};

export const FEATURE_LABELS = ['Idade', 'Pressão', 'Colesterol', 'Fumo'];
export const HIDDEN_LABELS = ['H1', 'H2'];
export const LEARNING_RATE = 0.7;

function sigmoid(x: number): number {
  const limited = Math.max(-500, Math.min(500, x));
  return 1 / (1 + Math.exp(-limited));
}

function sigmoidDeriv(output: number): number {
  return output * (1 - output);
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, value));
}

export function normalizarIdade(v: number): number {
  return clamp(v / 100);
}

export function normalizarPressao(v: number): number {
  return clamp((v - 90) / (200 - 90));
}

export function normalizarColesterol(v: number): number {
  return clamp((v - 120) / (320 - 120));
}

export function prepararEntrada(idade: number, pressao: number, colesterol: number, fumante: 0 | 1): number[] {
  return [normalizarIdade(idade), normalizarPressao(pressao), normalizarColesterol(colesterol), fumante];
}

export const TRAINING_DATA: PatientSample[] = [
  { id: 'p1', raw: { idade: 25, pressao: 110, colesterol: 160, fumante: 0 }, x: prepararEntrada(25, 110, 160, 0), y: 0 },
  { id: 'p2', raw: { idade: 32, pressao: 118, colesterol: 170, fumante: 0 }, x: prepararEntrada(32, 118, 170, 0), y: 0 },
  { id: 'p3', raw: { idade: 45, pressao: 130, colesterol: 210, fumante: 1 }, x: prepararEntrada(45, 130, 210, 1), y: 1 },
  { id: 'p4', raw: { idade: 52, pressao: 145, colesterol: 220, fumante: 1 }, x: prepararEntrada(52, 145, 220, 1), y: 1 },
  { id: 'p5', raw: { idade: 60, pressao: 155, colesterol: 250, fumante: 1 }, x: prepararEntrada(60, 155, 250, 1), y: 1 },
  { id: 'p6', raw: { idade: 40, pressao: 125, colesterol: 180, fumante: 0 }, x: prepararEntrada(40, 125, 180, 0), y: 0 },
  { id: 'p7', raw: { idade: 67, pressao: 165, colesterol: 270, fumante: 1 }, x: prepararEntrada(67, 165, 270, 1), y: 1 },
  { id: 'p8', raw: { idade: 50, pressao: 135, colesterol: 190, fumante: 0 }, x: prepararEntrada(50, 135, 190, 0), y: 1 },
];

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function createInitialNetwork(seed = 42): NetworkState {
  const random = seededRandom(seed);
  const randWeight = () => random() * 2 - 1;

  return {
    wIH: Array.from({ length: 4 }, () => [randWeight(), randWeight()]),
    bH: [randWeight(), randWeight()],
    wHO: [randWeight(), randWeight()],
    bO: randWeight(),
  };
}

export function cloneNetwork(network: NetworkState): NetworkState {
  return {
    wIH: network.wIH.map((row) => [...row]),
    bH: [...network.bH],
    wHO: [...network.wHO],
    bO: network.bO,
  };
}

export function forwardPass(network: NetworkState, x: number[]): ForwardResult {
  const hidden = [0, 1].map((j) => {
    const sum = x.reduce((acc, value, i) => acc + value * network.wIH[i][j], 0) + network.bH[j];
    return sigmoid(sum);
  });

  const outputSum = hidden.reduce((acc, value, j) => acc + value * network.wHO[j], 0) + network.bO;
  return {
    hidden,
    output: sigmoid(outputSum),
  };
}

export function trainSingleSample(network: NetworkState, sample: PatientSample, learningRate: number): TrainingStepResult {
  const current = cloneNetwork(network);
  const forward = forwardPass(current, sample.x);
  const error = sample.y - forward.output;
  const loss = error ** 2;

  const deltaO = error * sigmoidDeriv(forward.output);
  const deltaH = [0, 1].map((j) => current.wHO[j] * deltaO * sigmoidDeriv(forward.hidden[j]));

  const deltaWHO = [0, 1].map((j) => learningRate * deltaO * forward.hidden[j]);
  const deltaBO = learningRate * deltaO;
  const deltaWIH = current.wIH.map((row, i) => row.map((_, j) => learningRate * deltaH[j] * sample.x[i]));
  const deltaBH = [0, 1].map((j) => learningRate * deltaH[j]);

  const nextNetwork = cloneNetwork(current);
  nextNetwork.wHO = nextNetwork.wHO.map((value, j) => value + deltaWHO[j]);
  nextNetwork.bO += deltaBO;
  nextNetwork.wIH = nextNetwork.wIH.map((row, i) => row.map((value, j) => value + deltaWIH[i][j]));
  nextNetwork.bH = nextNetwork.bH.map((value, j) => value + deltaBH[j]);

  return {
    nextNetwork,
    forward,
    error,
    loss,
    deltaO,
    deltaH,
    deltaWHO,
    deltaBO,
    deltaWIH,
    deltaBH,
  };
}

export function evaluateDataset(network: NetworkState) {
  const results = TRAINING_DATA.map((sample) => {
    const forward = forwardPass(network, sample.x);
    return {
      sample,
      prediction: forward.output,
      rounded: Math.round(forward.output),
      correct: Math.round(forward.output) === sample.y,
      loss: (sample.y - forward.output) ** 2,
    };
  });

  const correct = results.filter((result) => result.correct).length;
  const meanLoss = results.reduce((acc, result) => acc + result.loss, 0) / results.length;

  return {
    correct,
    total: results.length,
    accuracy: correct / results.length,
    meanLoss,
    results,
  };
}

export function formatSigned(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(3)}`;
}

export function sampleDescription(sample: PatientSample, locale: 'pt-BR' | 'en' = 'pt-BR'): string {
  const smoker = locale === 'pt-BR' ? (sample.raw.fumante ? 'fumante' : 'não fumante') : sample.raw.fumante ? 'smoker' : 'non-smoker';
  const years = locale === 'pt-BR' ? 'anos' : 'years';
  return `${sample.raw.idade} ${years} · ${sample.raw.pressao} mmHg · ${sample.raw.colesterol} mg/dL · ${smoker}`;
}

export const PYTHON_TRAINING_CODE = `import math
import random

random.seed(42)


def sigmoid(x: float) -> float:
    return 1 / (1 + math.exp(-x))


def sigmoid_deriv(output: float) -> float:
    return output * (1 - output)


def clamp(value: float, min_value: float = 0.0, max_value: float = 1.0) -> float:
    return max(min_value, min(max_value, value))


def normalizar_idade(idade: int) -> float:
    return clamp(idade / 100)


def normalizar_pressao(pressao_sistolica: int) -> float:
    return clamp((pressao_sistolica - 90) / (200 - 90))


def normalizar_colesterol(colesterol: int) -> float:
    return clamp((colesterol - 120) / (320 - 120))


def preparar_entrada(idade: int, pressao: int, colesterol: int, fumante: int) -> list[float]:
    return [
        normalizar_idade(idade),
        normalizar_pressao(pressao),
        normalizar_colesterol(colesterol),
        float(fumante),
    ]


class RedeNeuralPequena:
    def __init__(self) -> None:
        self.w_ih = [
            [random.uniform(-1, 1) for _ in range(2)] for _ in range(4)
        ]
        self.b_h = [random.uniform(-1, 1) for _ in range(2)]
        self.w_ho = [random.uniform(-1, 1) for _ in range(2)]
        self.b_o = random.uniform(-1, 1)

    def forward(self, x: list[float]) -> tuple[list[float], float]:
        h = []
        for j in range(2):
            soma = sum(x[i] * self.w_ih[i][j] for i in range(4)) + self.b_h[j]
            h.append(sigmoid(soma))

        soma_saida = sum(h[j] * self.w_ho[j] for j in range(2)) + self.b_o
        y_pred = sigmoid(soma_saida)
        return h, y_pred

    def treinar_exemplo(self, x: list[float], y_real: float, lr: float) -> float:
        h, y_pred = self.forward(x)

        erro = y_real - y_pred
        loss = erro ** 2

        delta_o = erro * sigmoid_deriv(y_pred)
        delta_h = []
        for j in range(2):
            delta = self.w_ho[j] * delta_o * sigmoid_deriv(h[j])
            delta_h.append(delta)

        for j in range(2):
            self.w_ho[j] += lr * delta_o * h[j]
        self.b_o += lr * delta_o

        for i in range(4):
            for j in range(2):
                self.w_ih[i][j] += lr * delta_h[j] * x[i]

        for j in range(2):
            self.b_h[j] += lr * delta_h[j]

        return loss

    def prever(self, x: list[float]) -> float:
        _, y_pred = self.forward(x)
        return y_pred


def main() -> None:
    dados_brutos = [
        (25, 110, 160, 0, 0),
        (32, 118, 170, 0, 0),
        (45, 130, 210, 1, 1),
        (52, 145, 220, 1, 1),
        (60, 155, 250, 1, 1),
        (40, 125, 180, 0, 0),
        (67, 165, 270, 1, 1),
        (50, 135, 190, 0, 1),
    ]

    dados_treino = [
        (preparar_entrada(idade, pressao, colesterol, fumante), float(risco))
        for idade, pressao, colesterol, fumante, risco in dados_brutos
    ]

    rede = RedeNeuralPequena()
    taxa_aprendizado = 0.7
    epocas = 30

    for epoca in range(1, epocas + 1):
        loss_total = 0.0

        for x, y_real in dados_treino:
            loss_total += rede.treinar_exemplo(x, y_real, taxa_aprendizado)

        loss_media = loss_total / len(dados_treino)
        print(f"Época {epoca:02d} | loss média = {loss_media:.6f}")

        for idx, (x, y_real) in enumerate(dados_treino, start=1):
            y_pred = rede.prever(x)
            print(f"  Ex {idx}: esperado={y_real:.0f} previsto={y_pred:.4f}")


if __name__ == "__main__":
    main()
`;
