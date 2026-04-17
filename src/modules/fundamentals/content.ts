import type { Lesson } from '../../core/interfaces/Lesson';
import type { Locale } from '../../i18n/types';

export function getFundamentalsModule(locale: Locale): Lesson {
  const isPt = locale === 'pt-BR';

  return {
    id: 'fundamentals',
    title: isPt ? 'Fundamentos · Do zero à rede neural' : 'Fundamentals · From zero to neural network',
    durationLabel: '2h30',
    summary: isPt
      ? 'Exploramos o conceito de IA, passamos por sistemas tradicionais, chegamos ao Machine Learning e terminamos com uma rede neural treinando de verdade.'
      : 'We explore the concept of AI, pass through traditional systems, reach Machine Learning and finish with a real neural network training.',
    sections: [
      {
        id: 'timeline',
        type: 'timeline',
        title: isPt ? 'O que vamos explorar' : 'What we will explore',
        items: isPt
          ? [
              { label: 'Introdução e Impacto', minutes: '0–30 min', summary: 'O que é IA, IA vs Sistemas Tradicionais e a revolução atual.' },
              { label: 'Machine Learning & Redes', minutes: '30–75 min', summary: 'Como máquinas aprendem: do neurônio ao backpropagation real.' },
              { label: 'Era dos Transformers', minutes: '75–105 min', summary: 'A arquitetura que mudou tudo: atenção e processamento de linguagem.' },
              { label: 'Prática: Seu Primeiro Prompt', minutes: '105–135 min', summary: 'Mão na massa com Transformers v5 e o primeiro código.' },
              { label: 'Checkpoint e Setup', minutes: '135–150 min', summary: 'Revisão e preparação para o ambiente local.' },
            ]
          : [
              { label: 'Introduction and Impact', minutes: '0–30 min', summary: 'What is AI, AI vs Traditional Systems and the current revolution.' },
              { label: 'Machine Learning & Networks', minutes: '30–75 min', summary: 'How machines learn: from the neuron to real backpropagation.' },
              { label: 'The Transformer Era', minutes: '75–105 min', summary: 'The architecture that changed everything: attention and language processing.' },
              { label: 'Practice: Your First Prompt', minutes: '105–135 min', summary: 'Hands-on with Transformers v5 and the first code.' },
              { label: 'Checkpoint and Setup', minutes: '135–150 min', summary: 'Review and preparation for the local environment.' },
            ],
      },
      {
        id: 'what-is-ai',
        type: 'hero',
        eyebrow: isPt ? 'Fundamentos' : 'Fundamentals',
        title: isPt ? 'O que é Inteligência Artificial?' : 'What is Artificial Intelligence?',
        body: isPt
          ? 'Inteligência Artificial é o campo da ciência da computação dedicado a criar sistemas capazes de realizar tarefas que, até então, exigiam cognição humana. Diferente do software tradicional, a IA não segue uma lista estática de instruções; ela opera através da **extração de padrões complexos** e **inferência estatística**.\n\nPara que um sistema de IA funcione, precisamos de três pilares fundamentais:\n\n1.  **Dados de Qualidade:** A matéria-prima que contém as regularidades do mundo.\n2.  **Arquitetura Matemática:** O modelo (como uma Rede Neural) que servirá como função aproximadora.\n3.  **Objetivo de Otimização:** Uma métrica de erro que guia o ajuste do sistema até que ele "aprenda".\n\n**A realidade técnica:** IA não é consciência; é uma ferramenta de **otimização em larga escala** que transforma entradas massivas em predições úteis sob incerteza.'
          : 'Artificial Intelligence is the field of computer science dedicated to creating systems capable of performing tasks that previously required human cognition. Unlike traditional software, AI does not follow a static list of instructions; it operates through **complex pattern extraction** and **statistical inference**.\n\nFor an AI system to work, we need three fundamental pillars:\n\n1.  **Quality Data:** The raw material containing the regularities of the world.\n2.  **Mathematical Architecture:** The model (like a Neural Network) that serves as an approximating function.\n3.  **Optimization Objective:** An error metric that guides the system\'s adjustment until it "learns".\n\n**The technical reality:** AI is not consciousness; it is a **large-scale optimization** tool that transforms massive inputs into useful predictions under uncertainty.',
        chips: isPt ? ['Dados', 'Padrões', 'Inferência', 'Otimização'] : ['Data', 'Patterns', 'Inference', 'Optimization'],
      },
      {
        id: 'evolution',
        type: 'list',
        title: isPt ? 'Breve Evolução da IA' : 'Brief Evolution of AI',
        items: isPt
          ? [
              '📜 **Anos 50-80**: Sistemas baseados em regras (IA Simbólica).',
              '📈 **Anos 90-2010**: Machine Learning Estatístico (Regressões, SVM).',
              '🧠 **2012**: Deep Learning explode com redes neurais profundas.',
              { text: '✨ **2017**: O artigo "Attention is All You Need" apresenta os Transformers.', isEmphasis: true },
              '🚀 **Hoje**: LLMs e IA Generativa transformando todas as indústrias.',
            ]
          : [
              '📜 **50s-80s**: Rule-based systems (Symbolic AI).',
              '📈 **90s-2010s**: Statistical Machine Learning (Regressions, SVM).',
              '🧠 **2012**: Deep Learning explodes with deep neural networks.',
              { text: '✨ **2017**: The paper "Attention is All You Need" introduces Transformers.', isEmphasis: true },
              '🚀 **Today**: LLMs and Generative AI transforming every industry.',
            ],
      },
      {
        id: 'ai-vs-traditional',
        type: 'list',
        title: isPt ? 'IA vs Sistemas Tradicionais' : 'AI vs Traditional Systems',
        items: isPt
          ? [
              '🔧 **Sistema tradicional**: o programador descreve as regras explicitamente. $$Entrada + Regras \\rightarrow Saída$$.',
              '🤖 **IA/ML**: o sistema aprende as regras a partir de exemplos — os dados ensinam o modelo.',
              '📋 **Tradicional**: frágil a casos não previstos. **IA**: generaliza para situações novas.',
              '📊 **Tradicional**: lógica determinística. **IA**: trabalha com probabilidades e confiança.',
              '🚀 **Quando usar**: quando os padrões são numerosos ou difíceis de formalizar (voz, imagem, linguagem).',
            ]
          : [
              '🔧 **Traditional software**: the programmer writes the rules explicitly. $$Input + Rules \\rightarrow Output$$.',
              '🤖 **AI/ML**: the system learns rules from examples — data teaches the model.',
              '📋 **Traditional**: fragile to unseen cases. **AI**: generalizes to new situations.',
              '📊 **Traditional**: deterministic logic. **AI**: works with probabilities and confidence.',
              '🚀 **When to use**: when patterns are numerous or hard to formalize (voice, image, language).',
            ],
      },
      {
        id: 'machine-learning',
        type: 'text',
        title: isPt ? 'Machine Learning: O Pipeline' : 'Machine Learning: The Pipeline',
        body: isPt
          ? 'Machine Learning é o subcampo da IA em que o sistema melhora seu desempenho ajustando parâmetros a partir de exemplos.\n\nO ciclo essencial é:\n1. **Coletar** dados representativos.\n2. **Definir** um modelo com parâmetros treináveis.\n3. **Medir** o erro (Loss).\n4. **Ajustar** os parâmetros para reduzir esse erro.\n\nO objetivo não é decorar o treino, mas **generalizar** para novos casos.'
          : 'Machine Learning is the AI subfield in which a system improves performance by adjusting parameters from examples.\n\nThe essential cycle is:\n1. **Collect** representative data.\n2. **Define** a model with trainable parameters.\n3. **Measure** the error (Loss).\n4. **Adjust** the parameters to reduce that error.\n\nThe goal is not to memorize training, but to **generalize** to new cases.',
      },
      {
        id: 'nn-why-exists',
        type: 'list',
        title: isPt ? 'Rede Neural: por que ela existe' : 'Neural Network: why it exists',
        items: isPt
          ? [
              '🧠 Redes neurais surgem quando queremos aprender relações complexas demais para uma fórmula simples ou um conjunto pequeno de regras.',
              '🔢 Elas recebem números na entrada e aplicam muitas transformações sucessivas até produzir uma estimativa útil na saída.',
              '📈 O poder da rede está em combinar muitos parâmetros ajustáveis para aproximar funções não lineares.',
              '🖼️ Em visão, a rede aprende padrões visuais; em texto, aprende padrões de sequência; em tabular, aprende combinações entre variáveis.',
              '🚀 Quanto maior a profundidade e o volume de dados, maior a capacidade de capturar representações mais abstratas.',
            ]
          : [
              '🧠 Neural networks appear when we want to learn relationships too complex for a simple formula or a small set of rules.',
              '🔢 They receive numbers as input and apply many successive transformations until they produce a useful estimate at the output.',
              '📈 The network’s power comes from combining many adjustable parameters to approximate nonlinear functions.',
              '🖼️ In vision, the network learns visual patterns; in text, sequence patterns; in tabular data, combinations among variables.',
              '🚀 The greater the depth and the amount of data, the greater the capacity to capture more abstract representations.',
            ],
      },
      {
        id: 'nn-neuron-overview',
        type: 'list',
        title: isPt ? 'O Neurônio Artificial: A Unidade Básica' : 'The Artificial Neuron: The Basic Unit',
        items: isPt
          ? [
              '🧠 Inspirado pelo neurônio biológico, mas operando de forma puramente matemática.',
              '🏗️ É o átomo das redes neurais: sozinho é simples, em massa é extremamente poderoso.',
              '⚙️ Ele processa sinais numéricos de entrada e produz um único sinal numérico de saída.',
              '🔄 O seu comportamento é definido por parâmetros que a rede aprende durante o treino.',
              '💡 Entender o neurônio é entender como a IA "pensa" em seu nível mais fundamental.',
            ]
          : [
              '🧠 Inspired by the biological neuron, but operating in a purely mathematical way.',
              '🏗️ It is the atom of neural networks: simple on its own, extremely powerful in mass.',
              '⚙️ It processes numeric input signals and produces a single numeric output signal.',
              '🔄 Its behavior is defined by parameters that the network learns during training.',
              '💡 Understanding the neuron is understanding how AI "thinks" at its most fundamental level.',
            ],
      },
      {
        id: 'nn-inputs',
        type: 'list',
        title: isPt ? 'Entradas: O que o neurônio vê' : 'Inputs: What the neuron sees',
        items: isPt
          ? [
              '📥 Representam as características de um exemplo: $$x_1, x_2, x_3, \dots, x_n$$.',
              '🔢 No mundo da IA, tudo é número: a intensidade de um pixel, o preço de uma ação ou a frequência de uma palavra.',
              '📏 Um neurônio pode ter de uma a milhares de entradas simultâneas.',
              '🧱 Essas entradas vêm ou diretamente do mundo real (camada de entrada) ou de outros neurônios.',
              '🧪 A qualidade das entradas determina a capacidade do neurônio de tomar boas decisões.',
            ]
          : [
              '📥 Represent the characteristics: $$x_1, x_2, x_3, \dots, x_n$$.',
              '🔢 In the AI world, everything is a number: pixel intensity, a stock price, or word frequency.',
              '📏 A neuron can have from one to thousands of simultaneous inputs.',
              '🧱 These inputs come either directly from the real world (input layer) or from other neurons.',
              '🧪 The quality of the inputs determines the neuron’s ability to make good decisions.',
            ],
      },
      {
        id: 'nn-weights',
        type: 'list',
        title: isPt ? 'Pesos: A importância relativa' : 'Weights: Relative importance',
        items: isPt
          ? [
              '⚖️ Cada entrada $$x_i$$ tem um peso $$w_i$$ associado ($$w_1, w_2, w_3, \dots$$).',
              '🔊 Pense no peso como um **controle de volume** individual para cada entrada.',
              '📈 Peso positivo e alto: a entrada é muito importante para confirmar a predição.',
              '📉 Peso negativo: a entrada serve para invalidar ou diminuir a chance daquela predição.',
              '🔄 Aprender em IA significa, na maioria das vezes, encontrar os valores ideais para esses pesos.',
            ]
          : [
              '⚖️ Each input $$x_i$$ has an associated weight $$w_i$$ ($$w_1, w_2, w_3, \dots$$).',
              '🔊 Think of the weight as an individual **volume control** for each input.',
              '📈 High positive weight: the input is very important to confirm the prediction.',
              '📉 Negative weight: the input serves to invalidate or decrease the chance of that prediction.',
              '🔄 Learning in IA means, most of the time, finding the ideal values for these weights.',
            ],
      },
      {
        id: 'nn-bias',
        type: 'list',
        title: isPt ? 'Viés: O ponto de partida' : 'Bias: The starting point',
        items: isPt
          ? [
              '🎯 O viés ($$b$$) é um número extra somado ao final, independente das entradas.',
              '🎢 Ele permite que o neurônio desloque sua curva de ativação para a esquerda ou direita.',
              '🔑 Sem viés, o neurônio estaria "preso" à origem ($$Se\ X=0 \rightarrow Y=0$$).',
              '📏 Ele representa a tendência intrínseca do neurônio de disparar ou não.',
              '⚖️ Junto com os pesos, o viés dá a flexibilidade necessária para modelar qualquer função.',
            ]
          : [
              '🎯 Bias ($$b$$) is an extra number added at the end, independent of the inputs.',
              '🎢 It allows the neuron to shift its activation curve to the left or right.',
              '🔑 Without bias, the neuron would be "stuck" at the origin ($$If\ X=0 \rightarrow Y=0$$).',
              '📏 It represents the neuron’s intrinsic tendency to fire or not.',
              '⚖️ Along with weights, bias provides the flexibility needed to model any function.',
            ],
      },
      {
        id: 'nn-activation',
        type: 'list',
        title: isPt ? 'Função de Ativação: A decisão final' : 'Activation Function: The final decision',
        items: isPt
          ? [
              '🔁 É um filtro matemático $$f(z)$$ aplicado após a soma das entradas e do viés.',
              '🌊 Introduz **não-linearidade**, permitindo que a rede aprenda padrões complexos e curvas.',
              '⚡ **ReLU**: Deixa passar valores positivos e zera os negativos ($$f(z) = \max(0, z)$$).',
              '🧬 **Sigmoid**: Espreme o resultado entre 0 e 1 ($$f(z) = \frac{1}{1 + e^{-z}}$$), útil para probabilidades.',
              '🧠 Sem ela, uma rede neural seria apenas uma calculadora de médias glorificada.',
            ]
          : [
              '🔁 It is a mathematical filter $$f(z)$$ applied after the sum of inputs and bias.',
              '🌊 It introduces **non-linearity**, allowing the network to learn complex patterns and curves.',
              '⚡ **ReLU**: Lets positive values pass and zeros out negative ones ($$f(z) = \max(0, z)$$).',
              '🧬 **Sigmoid**: Squeezes the result between 0 and 1 ($$f(z) = \frac{1}{1 + e^{-z}}$$), useful for probabilities.',
              '🧠 Without it, a neural network would be just a glorified average calculator.',
            ],
      },
      {
        id: 'nn-formula',
        type: 'text',
        title: isPt ? 'A Anatomia do Neurônio' : 'The Neuron Anatomy',
        body: isPt
          ? 'Para resumir tudo em uma visão técnica: o neurônio realiza uma **soma ponderada** de todas as suas entradas multiplicadas por seus respectivos pesos, adiciona um **viés** ao resultado e, finalmente, passa esse valor por uma **função de ativação**. Matematicamente, a essência é:\n\n$$y = f\left(\sum_{i=1}^{n} w_i x_i + b\right)$$\n\nCada componente tem um papel vital: pesos decidem "quanto importa", viés ajusta "quando liga" e ativação decide "como a resposta cresce".'
          : 'To summarize everything in a technical view: the neuron performs a **weighted sum** of all its inputs multiplied by their respective weights, adds a **bias** to the result, and finally passes this value through an **activation function**. Mathematically, the essence is:\n\n$$y = f\left(\sum_{i=1}^{n} w_i x_i + b\right)$$\n\nEach component has a vital role: weights decide "how much it matters", bias adjusts "when it turns on", and activation decides "how the response grows".',
      },
      {
        id: 'nn-pytorch-neuron',
        type: 'code',
        title: isPt ? 'O Neurônio no PyTorch' : 'The Neuron in PyTorch',
        language: 'python',
        caption: 'single_neuron.py',
        code: isPt 
? `import torch
import torch.nn as nn

# 1. Definindo o neurônio (3 entradas -> 1 saída)
# nn.Linear cria os Pesos (w) e o Bias (b) automaticamente
neuron = nn.Linear(in_features=3, out_features=1)

# 2. Escolhendo a função de ativação
activation = nn.Sigmoid()

# 3. Simulando uma entrada (x1, x2, x3)
x = torch.tensor([1.2, -0.5, 2.1])

# 4. O fluxo: Soma Ponderada + Bias -> Ativação
z = neuron(x)
y = activation(z)

print(f"Saída do neurônio: {y.item():.4f}")`
: `import torch
import torch.nn as nn

# 1. Defining the neuron (3 inputs -> 1 output)
# nn.Linear automatically creates Weights (w) and Bias (b)
neuron = nn.Linear(in_features=3, out_features=1)

# 2. Choosing the activation function
activation = nn.Sigmoid()

# 3. Simulating an input (x1, x2, x3)
x = torch.tensor([1.2, -0.5, 2.1])

# 4. The flow: Weighted Sum + Bias -> Activation
z = neuron(x)
y = activation(z)

print(f"Neuron output: {y.item():.4f}")`,
      },
      {
        id: 'nn-layers',
        type: 'list',
        title: isPt ? 'Camadas: entrada, ocultas e saída' : 'Layers: input, hidden and output',
        items: isPt
          ? [
              '📥 **Camada de entrada**: recebe as features do problema ($$x_1, x_2, \dots$$).',
              '🔀 **Camadas ocultas**: recombinam essas features e constroem representações intermediárias mais úteis.',
              '🧱 Cada nova camada pode capturar padrões de nível mais alto do que a anterior.',
              '📤 **Camada de saída**: traduz a representação final no formato do problema: classe, valor contínuo ou probabilidade.',
              '🏗️ A arquitetura define quantas camadas existem, quantos neurônios há em cada uma e como elas se conectam.',
            ]
          : [
              '📥 **Input layer**: receives the problem features ($$x_1, x_2, \dots$$).',
              '🔀 **Hidden layers**: recombine those features and build more useful intermediate representations.',
              '🧱 Each new layer can capture higher-level patterns than the previous one.',
              '📤 **Output layer**: translates the final representation into the problem format: class, continuous value or probability.',
              '🏗️ The architecture defines how many layers exist, how many neurons each contains and how they connect.',
            ],
      },
      {
        id: 'nn-forward-pass',
        type: 'list',
        title: isPt ? 'Como a rede produz uma predição' : 'How the network produces a prediction',
        items: isPt
          ? [
              '▶️ No **forward pass**, a amostra entra pela primeira camada e percorre a rede até a saída.',
              '🧮 Em cada neurônio, acontece o mesmo padrão: multiplicar entradas por pesos, somar viés e aplicar ativação.',
              '🔁 A saída de uma camada vira a entrada da próxima: $$h^{(l)} = f(W^{(l)} \cdot a^{(l-1)} + b^{(l)})$$.',
              '📤 No final, a rede gera uma predição: por exemplo, risco de doença, classe da imagem ou próximo token.',
              '📌 Nesse momento a rede ainda não “aprendeu” nada novo; ela apenas usa os pesos atuais para estimar uma resposta.',
            ]
          : [
              '▶️ In the **forward pass**, the sample enters the first layer and travels through the network to the output.',
              '🧮 In each neuron, the same pattern happens: multiply inputs by weights, add bias and apply activation.',
              '🔁 The output of one layer becomes the input of the next: $$h^{(l)} = f(W^{(l)} \cdot a^{(l-1)} + b^{(l)})$$.',
              '📤 At the end, the network generates a prediction: for example, disease risk, image class or next token.',
              '📌 At this point the network has not “learned” anything new yet; it is only using the current weights to estimate an answer.',
            ],
      },
      {
        id: 'nn-loss',
        type: 'list',
        title: isPt ? 'Erro, loss e objetivo do treino' : 'Error, loss and the goal of training',
        items: isPt
          ? [
              '🎯 Toda predição $$\hat{y}$$ é comparada com o alvo real $$y$$ do exemplo de treino.',
              '📏 A diferença entre predição e alvo é resumida por uma função de **loss** $$L(\hat{y}, y)$$.',
              '📉 **Loss alta** significa que os pesos atuais explicam mal os dados; loss menor indica ajuste melhor.',
              '🧪 O treino não busca perfeição em um exemplo isolado, mas reduzir a loss média ao longo de muitos exemplos.',
              '🧭 A loss é o sinal objetivo do aprendizado: ela diz para a rede em que direção precisa melhorar.',
            ]
          : [
              '🎯 Every prediction $$\hat{y}$$ is compared against the real target $$y$$ for the training example.',
              '📏 The difference between prediction and target is summarized by a **loss function** $$L(\hat{y}, y)$$.',
              '📉 **High loss** means the current weights explain the data poorly; lower loss indicates a better fit.',
              '🧪 Training does not seek perfection on one isolated example, but to reduce average loss across many examples.',
              '🧭 Loss is the objective learning signal: it tells the network in which direction it needs to improve.',
            ],
      },
      {
        id: 'nn-backprop',
        type: 'list',
        title: isPt ? 'Backpropagation em alto nível' : 'Backpropagation at a high level',
        items: isPt
          ? [
              '↩️ Depois do forward pass, o erro precisa voltar pela rede para atribuir responsabilidade a cada peso.',
              '🧠 **Backpropagation** calcula como uma pequena mudança em cada peso alteraria a loss final ($$\frac{\partial L}{\partial w}$$).',
              '📐 Esse cálculo produz **gradientes**: sinais que indicam se cada parâmetro deve subir ou descer.',
              '🛠️ O otimizador atualiza os pesos em pequenos passos ($$w = w - \eta \nabla L$$) para reduzir a loss.',
              '🔁 Forward, loss, backward e update formam o ciclo básico repetido milhares de vezes no treino.',
            ]
          : [
              '↩️ After the forward pass, the error must travel back through the network to assign responsibility to each weight.',
              '🧠 **Backpropagation** computes how a small change in each weight would affect the final loss ($$\frac{\partial L}{\partial w}$$).',
              '📐 This calculation produces **gradients**: signals indicating whether each parameter should go up or down.',
              '🛠️ The optimizer updates the weights in small steps ($$w = w - \eta \nabla L$$) to reduce loss.',
              '🔁 Forward, loss, backward and update form the basic cycle repeated thousands of times during training.',
            ],
      },
      {
        id: 'nn-many-epochs',
        type: 'list',
        title: isPt ? 'O que muda após muitas épocas' : 'What changes after many epochs',
        items: isPt
          ? [
              '📚 Uma **época** completa significa que a rede viu todo o conjunto de treino uma vez.',
              '📉 Ao longo das épocas, a tendência esperada é a loss cair e a predição ficar mais coerente.',
              '🧭 Os pesos deixam de ser quase aleatórios e passam a codificar regularidades úteis do problema.',
              '⚠️ Melhorar no treino não basta: o modelo precisa manter desempenho em dados não vistos para realmente generalizar.',
              '🔍 Se a rede memoriza demais o treino e piora fora dele, entramos no problema de **overfitting**.',
            ]
          : [
              '📚 One full **epoch** means the network has seen the whole training set once.',
              '📉 Across epochs, the expected trend is loss going down and predictions becoming more coherent.',
              '🧭 Weights stop being almost random and start encoding useful regularities of the problem.',
              '⚠️ Improving on training data is not enough: the model must keep performance on unseen data to truly generalize.',
              '🔍 If the network memorizes training too much and gets worse outside it, we run into **overfitting**.',
            ],
      },
      {
        id: 'first-code',
        type: 'code',
        title: isPt ? 'Primeiro código: rede treinando de verdade' : 'First code: network training for real',
        language: 'python',
        caption: 'tiny_heart_nn.py',
        code: `for epoca in range(1, 31):
    loss_total = 0.0

    for x, y_real in dados_treino:
        loss_total += rede.treinar_exemplo(x, y_real, lr=0.7)

    loss_media = loss_total / len(dados_treino)
    print(f"Época {epoca:02d} | loss = {loss_media:.4f}")`,
      },
      {
        id: 'checkpoint',
        type: 'checkpoint',
        title: isPt ? 'Resumo de Aprendizado' : 'Learning Summary',
        items: isPt
          ? [
              'Saber diferenciar IA, software tradicional e Machine Learning.',
              'Entender o neurônio artificial como $$soma\ ponderada + viés + ativação$$.',
              'Reconhecer o papel de pesos, viés e não linearidade no comportamento da rede.',
              'Visualizar o forward pass como o caminho da entrada até a predição.',
              'Entender a loss como medida objetiva do erro durante o treino.',
              'Explicar backpropagation como o mecanismo que distribui o erro e ajusta os pesos.',
              'Relacionar a rede neural pequena da animação com redes profundas usadas em LLMs.',
            ]
          : [
              'Know how to distinguish AI, traditional software and Machine Learning.',
              'Understand an artificial neuron as $$weighted\ sum + bias + activation$$.',
              'Recognize the role of weights, bias and nonlinearity in network behavior.',
              'Visualize the forward pass as the path from input to prediction.',
              'Understand loss as the objective measure of error during training.',
              'Explain backpropagation as the mechanism that distributes error and adjusts weights.',
              'Connect the tiny animated neural network to the deep networks used in LLMs.',
            ],
      },
    ],
  };
}
