import type { Lesson } from '../../core/interfaces/Lesson';
import type { Locale } from '../../i18n/types';

export function getFundamentalsModule(locale: Locale): Lesson {
  const isPt = locale === 'pt-BR';

  return {
    id: 'fundamentals',
    title: isPt ? 'Fundamentos · Do zero à rede neural' : 'Fundamentals · From zero to neural network',
    durationLabel: '2h30',
    summary: isPt
      ? 'Exploramos IA como sistema orientado por dados, contrastamos software tradicional com ML e seguimos até o ciclo completo de treino de uma rede neural.'
      : 'We frame AI as a data-driven system, contrast traditional software with ML, and move into the full training cycle of a neural network.',
    sections: [
      {
        id: 'timeline',
        type: 'timeline',
        title: isPt ? 'O que vamos explorar' : 'What we will explore',
        items: isPt
          ? [
              { label: 'Panorama de IA', minutes: '0–30 min', summary: 'Definição técnica, evolução histórica e contraste com software baseado em regras.' },
              { label: 'Machine Learning', minutes: '30–60 min', summary: 'Pipeline supervisionado, generalização e papel dos dados no treino.' },
              { label: 'Neurônio Artificial', minutes: '60–90 min', summary: 'Entradas, pesos, bias, ativação e a fórmula central da unidade básica.' },
              { label: 'Rede e Treino', minutes: '90–120 min', summary: 'Camadas, forward pass, loss, backpropagation e queda de erro ao longo das épocas.' },
              { label: 'Ponte para prática', minutes: '120–150 min', summary: 'Código, animações e conexão com redes reais usadas em LLMs.' },
            ]
          : [
              { label: 'AI Overview', minutes: '0–30 min', summary: 'Technical definition, history, and contrast with rule-based software.' },
              { label: 'Machine Learning', minutes: '30–60 min', summary: 'Supervised pipeline, generalization, and the role of data during training.' },
              { label: 'Artificial Neuron', minutes: '60–90 min', summary: 'Inputs, weights, bias, activation, and the unit’s core equation.' },
              { label: 'Network and Training', minutes: '90–120 min', summary: 'Layers, forward pass, loss, backpropagation, and error decrease over epochs.' },
              { label: 'Bridge to practice', minutes: '120–150 min', summary: 'Code, animations, and the connection to real networks used in LLMs.' },
            ],
        visual: {
          kicker: isPt ? 'Mapa' : 'Map',
          figureTitle: isPt ? 'Sequência da aula' : 'Lesson sequence',
          figureCaption: isPt ? 'A trilha vai de definição e comparação até o treino real de uma rede.' : 'The path moves from definition and comparison into real network training.',
          callouts: isPt ? ['visão macro', 'do conceito ao treino'] : ['macro view', 'from concept to training'],
          figure: {
            kind: 'vertical-steps',
            steps: [
              { label: isPt ? 'IA' : 'AI', icon: '🧠', active: true },
              { label: isPt ? 'ML' : 'ML', icon: '📊' },
              { label: isPt ? 'Neurônio' : 'Neuron', icon: '⚙️' },
              { label: isPt ? 'Backprop' : 'Backprop', icon: '↩️' },
              { label: isPt ? 'Código' : 'Code', icon: '💻' },
            ],
          },
        },
      },
      {
        id: 'what-is-ai',
        type: 'hero',
        eyebrow: isPt ? 'Fundamentos' : 'Fundamentals',
        title: isPt ? 'IA é inferência a partir de dados' : 'AI is inference from data',
        body: isPt
          ? 'Inteligência Artificial é engenharia de sistemas que **extraem regularidades** dos dados e usam essas regularidades para produzir predições úteis.\n\nNa prática, um sistema de IA precisa de três blocos trabalhando juntos: **dados**, **modelo** e **objetivo de otimização**.\n\nO ponto central desta aula: IA não é consciência nem mágica; é um mecanismo estatístico para transformar entrada em estimativa sob incerteza.'
          : 'Artificial Intelligence is the engineering of systems that **extract regularities** from data and use those regularities to produce useful predictions.\n\nIn practice, an AI system needs three blocks working together: **data**, **model**, and **optimization objective**.\n\nThe key point in this lesson: AI is not consciousness or magic; it is a statistical mechanism that turns input into an estimate under uncertainty.',
        chips: isPt ? ['dados', 'modelo', 'loss', 'inferência'] : ['data', 'model', 'loss', 'inference'],
        visual: {
          kicker: isPt ? 'Panorama' : 'Overview',
          figureTitle: isPt ? 'Sistema orientado por dados' : 'Data-driven system',
          figureCaption: isPt ? 'O valor surge quando dados, modelo e critério de erro se fecham em um sistema coerente.' : 'Value appears when data, model, and error criteria close into one coherent system.',
          callouts: isPt ? ['entrada -> estimativa', 'estatística aplicada'] : ['input -> estimate', 'applied statistics'],
          figure: {
            kind: 'pillars-grid',
            pipeline: [
              { label: isPt ? 'Dados' : 'Data', icon: '📊', tone: 'primary' },
              { label: isPt ? 'Modelo' : 'Model', icon: '🧠', tone: 'secondary' },
              { label: isPt ? 'Inferência' : 'Inference', icon: '✨', tone: 'success' },
            ],
            grid: [
              { label: isPt ? 'visão' : 'vision', icon: '👁️', color: '#60a5fa' },
              { label: isPt ? 'texto' : 'text', icon: '📝', color: '#a78bfa' },
              { label: isPt ? 'voz' : 'voice', icon: '🎙️', color: '#f59e0b' },
              { label: isPt ? 'decisão' : 'decision', icon: '🎯', color: '#34d399' },
            ],
          },
        },
      },
      {
        id: 'evolution',
        type: 'list',
        title: isPt ? 'Breve evolução da IA' : 'A brief evolution of AI',
        items: isPt
          ? [
              '**1950–1980:** IA simbólica e sistemas de regras explícitas.',
              '**1990–2010:** ML estatístico cresce com features, regressões e SVM.',
              '**2012:** deep learning escala com dados, GPUs e redes profundas.',
              { text: '**2017+:** Transformers reorganizam o campo e destravam LLMs.', isEmphasis: true },
            ]
          : [
              '**1950–1980:** symbolic AI and explicit rule systems.',
              '**1990–2010:** statistical ML grows with features, regressions, and SVMs.',
              '**2012:** deep learning scales with data, GPUs, and deep networks.',
              { text: '**2017+:** Transformers reorganize the field and unlock LLMs.', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Histórico' : 'History',
          figureTitle: isPt ? 'Mudança de paradigma' : 'Paradigm shift',
          figureCaption: isPt ? 'A imagem mostra a transição de IA simbólica para a era de modelos fundacionais.' : 'The image shows the transition from symbolic AI to the era of foundation models.',
          callouts: isPt ? ['regras -> representação', 'transformers'] : ['rules -> representation', 'transformers'],
          figure: {
            kind: 'image',
            src: 'ai-evolution.jpg',
            alt: 'AI evolution timeline',
          },
        },
      },
      {
        id: 'ai-vs-traditional',
        type: 'list',
        title: isPt ? 'IA vs sistemas tradicionais' : 'AI vs traditional systems',
        items: isPt
          ? [
              '**Software tradicional:** regras são escritas explicitamente pelo programador.',
              '**IA/ML:** parâmetros são ajustados a partir de exemplos e feedback de erro.',
              '**Tradicional:** responde bem a casos totalmente formalizáveis; **IA:** lida melhor com padrões ambíguos.',
              { text: '**Leitura correta:** um é determinístico por projeto; o outro aprende uma fronteira estatística.', isEmphasis: true },
            ]
          : [
              '**Traditional software:** rules are written explicitly by the programmer.',
              '**AI/ML:** parameters are adjusted from examples and error feedback.',
              '**Traditional:** works well for fully formalizable cases; **AI:** handles ambiguous patterns better.',
              { text: '**Correct reading:** one is deterministic by design; the other learns a statistical boundary.', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Comparação' : 'Comparison',
          figureTitle: isPt ? 'Dois pipelines, duas lógicas' : 'Two pipelines, two logics',
          figureCaption: isPt ? 'Nos dois casos há entrada e saída; o que muda é o mecanismo interno que produz a decisão.' : 'Both have input and output; what changes is the internal mechanism that produces the decision.',
          callouts: isPt ? ['regras explícitas', 'parâmetros aprendidos'] : ['explicit rules', 'learned parameters'],
          figure: {
            kind: 'dual-path',
            left: {
              title: isPt ? 'Tradicional' : 'Traditional',
              caption: isPt ? 'fluxo especificado manualmente' : 'manually specified flow',
              tone: 'primary',
              steps: isPt ? ['entrada', 'if / else', 'saída'] : ['input', 'if / else', 'output'],
            },
            right: {
              title: 'IA / ML',
              caption: isPt ? 'fluxo aprendido com exemplos' : 'flow learned from examples',
              tone: 'secondary',
              steps: isPt ? ['dados', 'loss + treino', 'predição'] : ['data', 'loss + training', 'prediction'],
            },
            centerLabel: 'vs',
          },
        },
      },
      {
        id: 'machine-learning',
        type: 'text',
        title: isPt ? 'Machine Learning: o pipeline' : 'Machine Learning: the pipeline',
        body: isPt
          ? 'Machine Learning é o regime em que um modelo melhora porque ajustamos parâmetros contra um critério de erro.\n\nCiclo mínimo:\n1. **Coletar** exemplos representativos.\n2. **Definir** um modelo com parâmetros treináveis.\n3. **Predizer** e **medir** o erro.\n4. **Atualizar** os parâmetros para reduzir a loss.\n\nO alvo do processo não é memorizar o treino, mas **generalizar** para novos dados.'
          : 'Machine Learning is the regime in which a model improves because we adjust parameters against an error criterion.\n\nMinimal cycle:\n1. **Collect** representative examples.\n2. **Define** a model with trainable parameters.\n3. **Predict** and **measure** the error.\n4. **Update** the parameters to reduce loss.\n\nThe target is not to memorize training data, but to **generalize** to new inputs.',
        visual: {
          kicker: 'Pipeline',
          figureTitle: isPt ? 'Laço supervisionado' : 'Supervised loop',
          figureCaption: isPt ? 'O pipeline vira um circuito repetitivo: prever, medir e corrigir.' : 'The pipeline becomes a repetitive circuit: predict, measure, and correct.',
          callouts: isPt ? ['loss guia update', 'generalização'] : ['loss guides update', 'generalization'],
          figure: {
            kind: 'loop',
            topRow: [
              { label: isPt ? 'dados' : 'data', tone: 'primary' },
              { label: isPt ? 'modelo' : 'model', tone: 'primary' },
              { label: isPt ? 'predição' : 'prediction', tone: 'primary' },
            ],
            bottomRow: [
              { label: 'loss', tone: 'warning' },
              { label: 'update', tone: 'warning' },
              { label: isPt ? 'novo modelo' : 'new model', tone: 'success' },
            ],
            footer: isPt ? 'treino = repetir o laço até o erro cair sem perder generalização' : 'training = repeat the loop until error falls without losing generalization',
          },
        },
      },
      {
        id: 'nn-why-exists',
        type: 'list',
        title: isPt ? 'Por que redes neurais existem' : 'Why neural networks exist',
        items: isPt
          ? [
              'Usamos redes quando a relação entre entrada e saída é **complexa demais** para poucas regras ou uma fórmula simples.',
              'A rede aprende uma sequência de transformações que torna o problema mais separável internamente.',
              'Quanto maior a profundidade, maior a capacidade de construir representações intermediárias úteis.',
              { text: '**Ideia central:** profundidade serve para reexpressar o problema, não para “decorar mágica”.', isEmphasis: true },
            ]
          : [
              'We use networks when the relation between input and output is **too complex** for a few rules or a simple formula.',
              'The network learns a sequence of transformations that makes the problem more separable internally.',
              'The greater the depth, the greater the ability to build useful intermediate representations.',
              { text: '**Core idea:** depth exists to re-express the problem, not to “memorize magic.”', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Motivação' : 'Motivation',
          figureTitle: isPt ? 'Transformar antes de decidir' : 'Transform before deciding',
          figureCaption: isPt ? 'Camadas sucessivas deslocam o problema para um espaço mais favorável à decisão.' : 'Successive layers move the problem into a space that is easier to decide on.',
          callouts: isPt ? ['não linearidade', 'representação interna'] : ['non-linearity', 'internal representation'],
          figure: {
            kind: 'layer-stack',
            columns: [
              { label: isPt ? 'Entradas' : 'Inputs', nodes: 4, tone: 'primary' },
              { label: isPt ? 'Camada 1' : 'Layer 1', nodes: 3, tone: 'secondary', emphasis: true },
              { label: isPt ? 'Camada 2' : 'Layer 2', nodes: 3, tone: 'secondary' },
              { label: isPt ? 'Saída' : 'Output', nodes: 1, tone: 'success' },
            ],
            footer: isPt ? 'cada camada recombina sinais e produz uma representação mais útil' : 'each layer recombines signals and produces a more useful representation',
          },
        },
      },
      {
        id: 'nn-neuron-overview',
        type: 'list',
        title: isPt ? 'Neurônio artificial: a unidade básica' : 'Artificial neuron: the basic unit',
        items: isPt
          ? [
              'O neurônio recebe números, pondera esses sinais e produz uma única saída numérica.',
              'Pesos e bias são os parâmetros ajustados durante o treino.',
              'A ativação decide como a soma interna vira resposta útil.',
              { text: '**Em escala:** milhares ou milhões desses blocos formam a rede completa.', isEmphasis: true },
            ]
          : [
              'The neuron receives numbers, weights those signals, and emits one numeric output.',
              'Weights and bias are the parameters adjusted during training.',
              'Activation decides how the internal sum turns into a useful response.',
              { text: '**At scale:** thousands or millions of these blocks form the full network.', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Unidade básica' : 'Basic unit',
          figureTitle: isPt ? 'Fluxo interno do neurônio' : 'Neuron inner flow',
          figureCaption: isPt ? 'Entrada, soma ponderada, bias e ativação formam o bloco mínimo da rede.' : 'Input, weighted sum, bias, and activation define the network’s smallest block.',
          callouts: isPt ? ['bloco matemático', 'parâmetros treináveis'] : ['mathematical block', 'trainable parameters'],
          figure: {
            kind: 'neuron-focus',
            emphasis: 'overview',
            footer: isPt ? 'o neurônio sozinho é simples; o poder aparece quando eles são empilhados' : 'a neuron alone is simple; power appears when they are stacked',
          },
        },
      },
      {
        id: 'nn-inputs',
        type: 'list',
        title: isPt ? 'Entradas: o que o neurônio vê' : 'Inputs: what the neuron sees',
        items: isPt
          ? [
              'As entradas são as **features** do exemplo: $$x_1, x_2, \\dots, x_n$$.',
              'No pipeline de IA, texto, imagem ou sinais físicos acabam convertidos em vetores numéricos.',
              'A qualidade da representação de entrada limita o que o neurônio consegue aprender.',
              { text: '**Sem entrada informativa, não existe separação útil depois.**', isEmphasis: true },
            ]
          : [
              'Inputs are the example’s **features**: $$x_1, x_2, \\dots, x_n$$.',
              'In AI pipelines, text, images, or physical signals end up converted into numeric vectors.',
              'Input representation quality limits what the neuron can learn.',
              { text: '**Without informative input, there is no useful separation later.**', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Entradas' : 'Inputs',
          figureTitle: isPt ? 'O mundo vira vetor' : 'The world becomes a vector',
          figureCaption: isPt ? 'O neurônio não vê “imagem” ou “texto”; ele vê coordenadas numéricas.' : 'The neuron does not see “image” or “text”; it sees numeric coordinates.',
          callouts: isPt ? ['features', 'vetores'] : ['features', 'vectors'],
          figure: {
            kind: 'neuron-focus',
            emphasis: 'inputs',
            footer: isPt ? 'as features entram como sinais numéricos, não como conceitos simbólicos' : 'features enter as numeric signals, not symbolic concepts',
          },
        },
      },
      {
        id: 'nn-weights',
        type: 'list',
        title: isPt ? 'Pesos: quanto cada entrada importa' : 'Weights: how much each input matters',
        items: isPt
          ? [
              'Cada entrada $$x_i$$ é multiplicada por um peso $$w_i$$.',
              'Peso alto amplifica um sinal; peso baixo ou negativo reduz sua influência.',
              'Aprender, em grande parte, significa encontrar uma boa configuração desses pesos.',
              { text: '**Peso é importância aprendida, não regra escrita à mão.**', isEmphasis: true },
            ]
          : [
              'Each input $$x_i$$ is multiplied by a weight $$w_i$$.',
              'A high weight amplifies a signal; a low or negative weight reduces its influence.',
              'Learning largely means finding a good configuration for those weights.',
              { text: '**A weight is learned importance, not a hand-written rule.**', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Pesos' : 'Weights',
          figureTitle: isPt ? 'Escala de influência' : 'Influence scale',
          figureCaption: isPt ? 'Os pesos dizem quais sinais devem subir, cair ou inverter antes da soma.' : 'Weights say which signals should rise, shrink, or invert before the sum.',
          callouts: isPt ? ['w · x', 'amplificar ou suprimir'] : ['w · x', 'amplify or suppress'],
          figure: {
            kind: 'neuron-focus',
            emphasis: 'weights',
            footer: isPt ? 'pesos definem o quanto cada feature move a resposta final' : 'weights define how much each feature moves the final response',
          },
        },
      },
      {
        id: 'nn-bias',
        type: 'list',
        title: isPt ? 'Bias: deslocando o ponto de decisão' : 'Bias: shifting the decision point',
        items: isPt
          ? [
              'O bias $$b$$ é um termo extra somado após a combinação ponderada.',
              'Ele desloca a fronteira de decisão e evita que a resposta fique presa à origem.',
              'Na prática, bias funciona como um ajuste fino do limiar de ativação.',
              { text: '**Pesos mudam inclinação; bias muda posição.**', isEmphasis: true },
            ]
          : [
              'Bias $$b$$ is an extra term added after the weighted combination.',
              'It shifts the decision boundary and prevents the response from being stuck at the origin.',
              'In practice, bias acts as a fine-grained adjustment to the activation threshold.',
              { text: '**Weights change slope; bias changes position.**', isEmphasis: true },
            ],
        visual: {
          kicker: 'Bias',
          figureTitle: isPt ? 'Ajuste de limiar' : 'Threshold adjustment',
          figureCaption: isPt ? 'Mesmo com as mesmas features e pesos, o bias move o ponto em que o neurônio “liga”.' : 'Even with the same features and weights, bias moves the point where the neuron turns on.',
          callouts: isPt ? ['offset', 'limiar'] : ['offset', 'threshold'],
          figure: {
            kind: 'neuron-focus',
            emphasis: 'bias',
            footer: isPt ? 'bias adiciona flexibilidade geométrica ao bloco linear' : 'bias adds geometric flexibility to the linear block',
          },
        },
      },
      {
        id: 'nn-activation',
        type: 'list',
        title: isPt ? 'Ativação: onde entra a não linearidade' : 'Activation: where non-linearity enters',
        items: isPt
          ? [
              'A ativação recebe a soma interna e define a forma da saída.',
              '**ReLU** corta a parte negativa; **sigmoid** comprime a resposta entre 0 e 1.',
              'Sem ativação, muitas camadas lineares colapsam em uma transformação linear única.',
              { text: '**É a ativação que permite à rede modelar relações realmente complexas.**', isEmphasis: true },
            ]
          : [
              'Activation receives the internal sum and defines the shape of the output.',
              '**ReLU** cuts the negative side; **sigmoid** compresses the response between 0 and 1.',
              'Without activation, many linear layers collapse into one single linear transformation.',
              { text: '**Activation is what lets the network model genuinely complex relations.**', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Ativação' : 'Activation',
          figureTitle: isPt ? 'Resposta não linear' : 'Non-linear response',
          figureCaption: isPt ? 'Depois da soma, a ativação decide como o valor cresce, satura ou zera.' : 'After the sum, activation decides how the value grows, saturates, or gets zeroed.',
          callouts: isPt ? ['ReLU', 'sigmoid'] : ['ReLU', 'sigmoid'],
          figure: {
            kind: 'neuron-focus',
            emphasis: 'activation',
            footer: isPt ? 'não linearidade é o ponto que separa rede neural de regressão encadeada' : 'non-linearity is what separates a neural net from chained regression',
          },
        },
      },
      {
        id: 'nn-formula',
        type: 'text',
        title: isPt ? 'A fórmula completa do neurônio' : 'The neuron’s full formula',
        body: isPt
          ? 'A unidade básica da rede pode ser condensada em uma operação:\n\n$$y = f\\left(\\sum_{i=1}^{n} w_i x_i + b\\right)$$\n\nLeitura técnica:\n- $$x$$ carrega a informação de entrada.\n- $$w$$ define a importância relativa.\n- $$b$$ desloca a decisão.\n- $$f$$ injeta não linearidade e produz a saída.'
          : 'The network’s basic unit can be condensed into one operation:\n\n$$y = f\\left(\\sum_{i=1}^{n} w_i x_i + b\\right)$$\n\nTechnical reading:\n- $$x$$ carries input information.\n- $$w$$ defines relative importance.\n- $$b$$ shifts the decision point.\n- $$f$$ injects non-linearity and produces the output.',
        visual: {
          kicker: isPt ? 'Matemática' : 'Math',
          figureTitle: isPt ? 'Todos os blocos em uma equação' : 'All blocks in one equation',
          figureCaption: isPt ? 'A fórmula resume o fluxo inteiro do neurônio em uma única composição.' : 'The formula summarizes the whole neuron flow in a single composition.',
          callouts: isPt ? ['equação central', 'wx + b'] : ['core equation', 'wx + b'],
          figure: {
            kind: 'neuron-focus',
            emphasis: 'formula',
            footer: isPt ? 'essa operação se repete em massa em toda a rede' : 'this operation repeats at scale across the network',
          },
        },
      },
      {
        id: 'nn-pytorch-neuron',
        type: 'code',
        title: isPt ? 'O neurônio no PyTorch' : 'The neuron in PyTorch',
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
        visual: {
          kicker: isPt ? 'Implementação' : 'Implementation',
          figureTitle: isPt ? 'Camada linear + ativação' : 'Linear layer + activation',
          figureCaption: isPt ? 'No código, a operação do neurônio aparece como uma camada linear seguida de uma função não linear.' : 'In code, the neuron appears as a linear layer followed by a non-linear function.',
          callouts: ['nn.Linear', 'Sigmoid'],
          figure: {
            kind: 'neuron-focus',
            emphasis: 'formula',
            footer: isPt ? 'frameworks encapsulam pesos e bias, mas a lógica matemática é a mesma' : 'frameworks encapsulate weights and bias, but the mathematical logic is the same',
          },
        },
      },
      {
        id: 'nn-layers',
        type: 'list',
        title: isPt ? 'Camadas: entrada, ocultas e saída' : 'Layers: input, hidden, and output',
        items: isPt
          ? [
              'A **camada de entrada** recebe as features do problema.',
              'As **camadas ocultas** recombinam sinais e constroem representações progressivamente mais úteis.',
              'A **camada de saída** traduz a representação final no formato do problema.',
              { text: '**Arquitetura = quantas camadas existem, quantos neurônios há e como eles se conectam.**', isEmphasis: true },
            ]
          : [
              'The **input layer** receives the problem features.',
              'The **hidden layers** recombine signals and build progressively more useful representations.',
              'The **output layer** translates the final representation into the problem’s output format.',
              { text: '**Architecture = how many layers exist, how many neurons they contain, and how they connect.**', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Arquitetura' : 'Architecture',
          figureTitle: isPt ? 'Rede em camadas' : 'Layered network',
          figureCaption: isPt ? 'Cada estágio altera a representação antes da decisão final.' : 'Each stage reshapes the representation before the final decision.',
          callouts: isPt ? ['entrada -> ocultas -> saída', 'abstração'] : ['input -> hidden -> output', 'abstraction'],
          figure: {
            kind: 'layer-stack',
            columns: [
              { label: isPt ? 'Entrada' : 'Input', nodes: 4, tone: 'primary' },
              { label: isPt ? 'Oculta 1' : 'Hidden 1', nodes: 3, tone: 'secondary', emphasis: true },
              { label: isPt ? 'Oculta 2' : 'Hidden 2', nodes: 3, tone: 'secondary' },
              { label: isPt ? 'Saída' : 'Output', nodes: 1, tone: 'success' },
            ],
            footer: isPt ? 'camadas escondidas não são “mágicas”: são estágios intermediários de transformação' : 'hidden layers are not magical: they are intermediate stages of transformation',
          },
        },
      },
      {
        id: 'nn-forward-pass',
        type: 'list',
        title: isPt ? 'Forward pass: como a rede produz uma predição' : 'Forward pass: how the network produces a prediction',
        items: isPt
          ? [
              'No forward pass, a amostra percorre a rede da entrada até a saída.',
              'Cada camada aplica pesos, bias e ativação sobre a representação recebida.',
              'O resultado final é uma predição usando os parâmetros atuais.',
              { text: '**Nesse estágio a rede ainda não corrige nada; ela apenas calcula.**', isEmphasis: true },
            ]
          : [
              'In the forward pass, a sample travels through the network from input to output.',
              'Each layer applies weights, bias, and activation to the incoming representation.',
              'The final result is a prediction using the current parameters.',
              { text: '**At this stage the network does not correct anything yet; it only computes.**', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Inferência' : 'Inference',
          figureTitle: isPt ? 'Fluxo de ida' : 'Forward flow',
          figureCaption: isPt ? 'A amostra entra, atravessa camadas e sai como estimativa.' : 'The sample enters, crosses layers, and leaves as an estimate.',
          callouts: isPt ? ['usa pesos atuais', 'gera predição'] : ['uses current weights', 'produces prediction'],
          figure: {
            kind: 'flow-sequence',
            start: isPt ? 'amostra' : 'sample',
            middle: [isPt ? 'camada 1' : 'layer 1', isPt ? 'camada 2' : 'layer 2'],
            end: isPt ? 'predição' : 'prediction',
            primaryNote: isPt ? 'informação flui para frente até a saída' : 'information flows forward to the output',
            secondaryNote: isPt ? 'cada camada refina a representação' : 'each layer refines the representation',
          },
        },
      },
      {
        id: 'nn-loss',
        type: 'list',
        title: isPt ? 'Loss: quantificando o erro' : 'Loss: quantifying error',
        items: isPt
          ? [
              'Toda predição $$\\hat{y}$$ é comparada com o alvo real $$y$$.',
              'A função de loss resume em um número a distância entre resposta prevista e resposta correta.',
              'Loss alta significa ajuste ruim; loss baixa indica ajuste melhor.',
              { text: '**A loss é o sinal objetivo que informa o que precisa ser corrigido.**', isEmphasis: true },
            ]
          : [
              'Every prediction $$\\hat{y}$$ is compared with the real target $$y$$.',
              'The loss function compresses the distance between predicted and correct answer into one number.',
              'High loss means poor fit; low loss means better fit.',
              { text: '**Loss is the objective signal that tells us what needs correction.**', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Objetivo' : 'Objective',
          figureTitle: isPt ? 'Predição vs alvo' : 'Prediction vs target',
          figureCaption: isPt ? 'A diferença entre as barras é o que a loss tenta reduzir ao longo do treino.' : 'The difference between the bars is what loss tries to reduce during training.',
          callouts: ['prediction', 'target'],
          figure: {
            kind: 'metric-compare',
            leftLabel: isPt ? 'Predição' : 'Prediction',
            leftValue: '0.82',
            leftHeight: 92,
            rightLabel: isPt ? 'Alvo' : 'Target',
            rightValue: '1.00',
            rightHeight: 118,
            centerLabel: 'loss',
            footer: isPt ? 'loss mede o desvio entre o que saiu e o que deveria sair' : 'loss measures the gap between what came out and what should have',
          },
        },
      },
      {
        id: 'nn-backprop',
        type: 'list',
        title: isPt ? 'Backpropagation: distribuindo responsabilidade' : 'Backpropagation: distributing responsibility',
        items: isPt
          ? [
              'Depois da loss, o erro precisa voltar pela rede para alcançar cada peso.',
              'Backpropagation calcula como pequenas mudanças em cada parâmetro alterariam a loss final.',
              'Esse cálculo gera gradientes, usados pelo otimizador para atualizar pesos e bias.',
              { text: '**Treinar é repetir esse ciclo milhares de vezes com passos pequenos.**', isEmphasis: true },
            ]
          : [
              'After loss is computed, the error must travel back through the network to reach each weight.',
              'Backpropagation calculates how small changes in each parameter would affect final loss.',
              'That computation yields gradients, which the optimizer uses to update weights and bias.',
              { text: '**Training means repeating this cycle thousands of times with small steps.**', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Treino' : 'Training',
          figureTitle: isPt ? 'Fluxo de volta' : 'Backward flow',
          figureCaption: isPt ? 'O erro retorna e atribui responsabilidade a cada parte da rede.' : 'Error flows back and assigns responsibility to each part of the network.',
          callouts: isPt ? ['gradientes', 'update pequeno'] : ['gradients', 'small update'],
          figure: {
            kind: 'flow-sequence',
            reverse: true,
            start: isPt ? 'erro' : 'error',
            middle: [isPt ? 'camada 2' : 'layer 2', isPt ? 'camada 1' : 'layer 1'],
            end: isPt ? 'pesos' : 'weights',
            primaryNote: isPt ? 'gradientes voltam pela rede' : 'gradients travel back through the network',
            secondaryNote: isPt ? 'cada parâmetro recebe uma correção' : 'each parameter receives a correction',
          },
        },
      },
      {
        id: 'nn-many-epochs',
        type: 'list',
        title: isPt ? 'Muitas épocas depois: o que muda' : 'After many epochs: what changes',
        items: isPt
          ? [
              'Uma época significa ver o conjunto de treino completo uma vez.',
              'Ao longo das épocas, espera-se que a loss média caia e a predição fique mais estável.',
              'Os pesos deixam de ser quase aleatórios e passam a codificar regularidades do problema.',
              { text: '**Queda de loss não basta: o modelo ainda precisa generalizar fora do treino.**', isEmphasis: true },
            ]
          : [
              'An epoch means seeing the full training set once.',
              'Across epochs, we expect average loss to fall and predictions to become more stable.',
              'Weights stop being almost random and start encoding the problem’s regularities.',
              { text: '**Loss reduction is not enough: the model still needs to generalize beyond training.**', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Convergência' : 'Convergence',
          figureTitle: isPt ? 'Tendência do treino' : 'Training trend',
          figureCaption: isPt ? 'O comportamento esperado é erro menor com o tempo, mas sem virar memorização cega.' : 'The expected pattern is lower error over time, without turning into blind memorization.',
          callouts: isPt ? ['queda de loss', 'generalização'] : ['loss drop', 'generalization'],
          figure: {
            kind: 'line-chart',
            points: [
              { x: 18, y: 32, tone: 'warning' },
              { x: 72, y: 50, tone: 'warning' },
              { x: 126, y: 72, tone: 'primary' },
              { x: 180, y: 95, tone: 'primary' },
              { x: 234, y: 118, tone: 'success' },
              { x: 288, y: 134, tone: 'success' },
              { x: 342, y: 144, tone: 'success' },
            ],
            xLabel: isPt ? 'épocas' : 'epochs',
            yLabel: 'loss',
            footer: isPt ? 'a curva ideal cai; o desafio é manter desempenho em dados novos' : 'the ideal curve falls; the challenge is keeping performance on new data',
          },
        },
      },
      {
        id: 'first-code',
        type: 'code',
        title: isPt ? 'Primeiro código: treino em loop' : 'First code: training loop',
        language: 'python',
        caption: 'tiny_heart_nn.py',
        code: `for epoca in range(1, 31):
    loss_total = 0.0

    for x, y_real in dados_treino:
        loss_total += rede.treinar_exemplo(x, y_real, lr=0.7)

    loss_media = loss_total / len(dados_treino)
    print(f"Época {epoca:02d} | loss = {loss_media:.4f}")`,
        visual: {
          kicker: isPt ? 'Código' : 'Code',
          figureTitle: isPt ? 'Treinar é iterar' : 'Training is iteration',
          figureCaption: isPt ? 'O loop de épocas conecta diretamente loss, update e melhora progressiva do modelo.' : 'The epoch loop directly connects loss, update, and progressive model improvement.',
          callouts: isPt ? ['épocas', 'loss média'] : ['epochs', 'mean loss'],
          figure: {
            kind: 'loop',
            topRow: [
              { label: isPt ? 'amostra' : 'sample', tone: 'primary' },
              { label: isPt ? 'predição' : 'prediction', tone: 'primary' },
              { label: 'loss', tone: 'warning' },
            ],
            bottomRow: [
              { label: 'grad', tone: 'warning' },
              { label: 'update', tone: 'warning' },
              { label: isPt ? 'próxima época' : 'next epoch', tone: 'success' },
            ],
            footer: isPt ? 'o código só automatiza o mesmo ciclo conceitual visto nos slides anteriores' : 'the code simply automates the same conceptual cycle shown in previous slides',
          },
        },
      },
      {
        id: 'checkpoint',
        type: 'checkpoint',
        title: isPt ? 'Resumo de aprendizado' : 'Learning summary',
        items: isPt
          ? [
              'IA como sistema de inferência guiado por dados, modelo e loss.',
              'Diferença estrutural entre software tradicional e Machine Learning.',
              'Neurônio artificial como $$soma\\ ponderada + bias + ativação$$.',
              'Rede em camadas, forward pass, loss e backprop como ciclo único de treino.',
              'Generalização como critério real de sucesso do modelo.',
              'Ponte conceitual entre essa rede pequena e sistemas maiores como LLMs.',
            ]
          : [
              'AI as an inference system driven by data, model, and loss.',
              'The structural difference between traditional software and Machine Learning.',
              'The artificial neuron as $$weighted\\ sum + bias + activation$$.',
              'Layered networks, forward pass, loss, and backprop as one unified training cycle.',
              'Generalization as the real criterion for model success.',
              'The conceptual bridge between this small network and larger systems such as LLMs.',
            ],
        visual: {
          kicker: isPt ? 'Fechamento' : 'Closing',
          figureTitle: isPt ? 'Mapa conceitual final' : 'Final concept map',
          figureCaption: isPt ? 'No fim, todos os blocos se conectam como partes do mesmo mecanismo de treino.' : 'In the end, all blocks connect as parts of the same training mechanism.',
          callouts: isPt ? ['vocabulário base', 'ponte para LLMs'] : ['base vocabulary', 'bridge to LLMs'],
          figure: {
            kind: 'pillars-grid',
            pipeline: [
              { label: isPt ? 'Dados' : 'Data', icon: '📊', tone: 'primary' },
              { label: isPt ? 'Rede' : 'Network', icon: '🧠', tone: 'secondary' },
              { label: isPt ? 'Treino' : 'Training', icon: '↩️', tone: 'success' },
            ],
            grid: [
              { label: isPt ? 'neurônio' : 'neuron', icon: '⚙️', color: '#60a5fa' },
              { label: isPt ? 'camadas' : 'layers', icon: '🏗️', color: '#a78bfa' },
              { label: 'loss', icon: '📉', color: '#f59e0b' },
              { label: isPt ? 'gradientes' : 'gradients', icon: '🧭', color: '#34d399' },
            ],
          },
        },
      },
    ],
  };
}
