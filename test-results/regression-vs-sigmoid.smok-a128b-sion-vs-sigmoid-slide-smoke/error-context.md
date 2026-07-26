# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: regression-vs-sigmoid.smoke.spec.ts >> regression vs sigmoid slide smoke
- Location: regression-vs-sigmoid.smoke.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('linear-canvas')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('linear-canvas')

```

```yaml
- banner:
  - paragraph: ai-llm-course
  - button
  - paragraph: 2 / 35
  - button
  - button "Baixar PDF"
- navigation:
  - heading "Curso IA & LLMs" [level=6]
  - button "Recolher"
  - button "PT":
    - img
    - text: PT
  - button "EN":
    - img
    - text: EN
  - separator
  - list:
    - button "O que vamos explorar":
      - paragraph: O que vamos explorar
    - button "IA é inferência a partir de dados":
      - paragraph: IA é inferência a partir de dados
    - button "Breve evolução da IA":
      - paragraph: Breve evolução da IA
    - button "IA vs sistemas tradicionais":
      - paragraph: IA vs sistemas tradicionais
    - 'button "Machine Learning: o pipeline"':
      - paragraph: "Machine Learning: o pipeline"
    - button "Por que redes neurais existem":
      - paragraph: Por que redes neurais existem
    - 'button "Neurônio artificial: a unidade básica"':
      - paragraph: "Neurônio artificial: a unidade básica"
    - 'button "Entradas: o que o neurônio vê"':
      - paragraph: "Entradas: o que o neurônio vê"
    - 'button "Pesos: quanto cada entrada importa"':
      - paragraph: "Pesos: quanto cada entrada importa"
    - 'button "Bias: deslocando o ponto de decisão"':
      - paragraph: "Bias: deslocando o ponto de decisão"
    - 'button "Ativação: onde entra a não linearidade"':
      - paragraph: "Ativação: onde entra a não linearidade"
    - button "Neurônio biológico vs computacional":
      - paragraph: Neurônio biológico vs computacional
    - button "Regressão linear vs classificador logístico radial":
      - paragraph: Regressão linear vs classificador logístico radial
    - button "A fórmula completa do neurônio":
      - paragraph: A fórmula completa do neurônio
    - button "O neurônio no PyTorch":
      - paragraph: O neurônio no PyTorch
    - 'button "Camadas: entrada, ocultas e saída"':
      - paragraph: "Camadas: entrada, ocultas e saída"
    - 'button "Forward pass: como a rede produz uma predição"':
      - paragraph: "Forward pass: como a rede produz uma predição"
    - 'button "Loss: quantificando o erro"':
      - paragraph: "Loss: quantificando o erro"
    - 'button "Backpropagation: distribuindo responsabilidade"':
      - paragraph: "Backpropagation: distribuindo responsabilidade"
    - 'button "Muitas épocas depois: o que muda"':
      - paragraph: "Muitas épocas depois: o que muda"
    - 'button "Primeiro código: treino em loop"':
      - paragraph: "Primeiro código: treino em loop"
    - button "Fluxo da LLM":
      - paragraph: Fluxo da LLM
    - button "Backprop real":
      - paragraph: Backprop real
    - button "Playground de prompt":
      - paragraph: Playground de prompt
    - button "Resumo de aprendizado":
      - paragraph: Resumo de aprendizado
    - button "Objetivo técnico":
      - paragraph: Objetivo técnico
    - button "Trilhas de plataforma":
      - paragraph: Trilhas de plataforma
    - button "Módulo 2 · Python, PyTorch e backends com caminho claro":
      - paragraph: Módulo 2 · Python, PyTorch e backends com caminho claro
    - 'button "Passo 0: Instalando o Python"':
      - paragraph: "Passo 0: Instalando o Python"
    - button "Ordem sugerida do Módulo 2":
      - paragraph: Ordem sugerida do Módulo 2
    - button "Trilhas do setup":
      - paragraph: Trilhas do setup
    - button "Criando o ambiente virtual":
      - paragraph: Criando o ambiente virtual
    - button "Teste simples do backend":
      - paragraph: Teste simples do backend
    - button "Regra de ouro":
      - paragraph: Regra de ouro
    - button "Pronto para os próximos módulos":
      - paragraph: Pronto para os próximos módulos
- main:
  - progressbar
  - text: Fundamentos
  - heading "IA é inferência a partir de dados" [level=1]
  - paragraph: Inteligência Artificial é engenharia de sistemas que extraem regularidades dos dados e usam essas regularidades para produzir predições úteis.
  - paragraph: "Na prática, um sistema de IA precisa de três blocos trabalhando juntos: dados, modelo e objetivo de otimização."
  - paragraph: "O ponto central desta aula: IA não é consciência nem mágica; é um mecanismo estatístico para transformar entrada em estimativa sob incerteza."
  - text: dados modelo loss inferência Panorama
  - heading "Sistema orientado por dados" [level=4]
  - paragraph: O valor surge quando dados, modelo e critério de erro se fecham em um sistema coerente.
  - img: 📊 Dados 🧠 Modelo ✨ Inferência 👁️ visão 📝 texto 🎙️ voz 🎯 decisão
  - text: entrada -> estimativa estatística aplicada
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  |
  3  | test('regression vs sigmoid slide smoke', async ({ page }) => {
  4  |   await page.addInitScript(() => {
  5  |     window.localStorage.setItem('ai-llm-course.locale', 'pt-BR');
  6  |   });
  7  |
  8  |   await page.goto('/ai-llm-course/linear-vs-sigmoid');
  9  |
  10 |   await expect(page).toHaveURL(/linear-vs-sigmoid/);
> 11 |   await expect(page.getByTestId('linear-canvas')).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
  12 |   await expect(page.getByTestId('sigmoid-canvas')).toBeVisible();
  13 |
  14 |   await page.getByTestId('start-training').evaluate((el) => (el as HTMLElement).click());
  15 |   await expect.poll(async () => {
  16 |     const epochText = await page.getByTestId('linear-epoch-value').textContent();
  17 |     return Number(epochText ?? '0');
  18 |   }).toBeGreaterThan(0);
  19 |
  20 |   await page.getByTestId('pause-training').evaluate((el) => (el as HTMLElement).click());
  21 |
  22 |   await page.getByTestId('generate-data').evaluate((el) => (el as HTMLElement).click());
  23 |
  24 |   await page.getByTestId('linear-tab-code').evaluate((el) => (el as HTMLElement).click());
  25 |   await expect(page.getByText('linear_regression_model.py')).toBeVisible();
  26 |
  27 |   await page.getByTestId('sigmoid-tab-code').evaluate((el) => (el as HTMLElement).click());
  28 |   await expect(page.getByText('logistic_circle_classifier.py')).toBeVisible();
  29 | });
  30 |
```