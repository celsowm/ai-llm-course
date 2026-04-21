export const LINEAR_CODE = `import math
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

export const SIGMOID_CODE = `import math
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