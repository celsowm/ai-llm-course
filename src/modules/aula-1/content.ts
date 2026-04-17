import type { Lesson } from '../../core/interfaces/Lesson';
import type { Locale } from '../../i18n/types';

export function getLessonOne(locale: Locale): Lesson {
  const isPt = locale === 'pt-BR';

  return {
    id: 'lesson-1',
    title: isPt ? 'Aula 1 · Do zero à rede neural' : 'Lesson 1 · From zero to neural network',
    durationLabel: '2h30',
    summary: isPt
      ? 'Partimos do conceito de IA, passamos por sistemas tradicionais, chegamos ao Machine Learning e terminamos com uma rede neural treinando de verdade.'
      : 'We start from the concept of AI, pass through traditional systems, reach Machine Learning and finish with a real neural network training.',
    sections: [
      {
        id: 'timeline',
        type: 'timeline',
        title: isPt ? 'Agenda da Aula (2h 30min)' : 'Lesson Agenda (2h 30min)',
        items: isPt
          ? [
              { label: 'Introdução e Impacto', minutes: '0–30 min', summary: 'O que é IA, IA vs Sistemas Tradicionais e a revolução atual.' },
              { label: 'Machine Learning & Redes', minutes: '30–75 min', summary: 'Como máquinas aprendem: do neurônio ao backpropagation real.' },
              { label: 'Era dos Transformers', minutes: '75–105 min', summary: 'A arquitetura que mudou tudo: atenção e processamento de linguagem.' },
              { label: 'Prática: Seu Primeiro Prompt', minutes: '105–135 min', summary: 'Mão na massa com Transformers v5 e o primeiro código.' },
              { label: 'Checkpoint e Setup', minutes: '135–150 min', summary: 'Revisão e preparação para o ambiente local da Aula 2.' },
            ]
          : [
              { label: 'Introduction and Impact', minutes: '0–30 min', summary: 'What is AI, AI vs Traditional Systems and the current revolution.' },
              { label: 'Machine Learning & Networks', minutes: '30–75 min', summary: 'How machines learn: from the neuron to real backpropagation.' },
              { label: 'The Transformer Era', minutes: '75–105 min', summary: 'The architecture that changed everything: attention and language processing.' },
              { label: 'Practice: Your First Prompt', minutes: '105–135 min', summary: 'Hands-on with Transformers v5 and the first code.' },
              { label: 'Checkpoint and Setup', minutes: '135–150 min', summary: 'Review and preparation for Lesson 2\'s local environment.' },
            ],
      },
      {
        id: 'what-is-ai',
        type: 'hero',
        eyebrow: isPt ? 'Fundamentos' : 'Fundamentals',
        title: isPt ? 'O que é Inteligência Artificial?' : 'What is Artificial Intelligence?',
        body: isPt
          ? 'IA é a capacidade de um sistema computacional realizar tarefas que normalmente exigiriam inteligência humana — como reconhecer imagens, entender linguagem e tomar decisões. Não é mágica: é matemática, dados e otimização.'
          : 'AI is the ability of a computational system to perform tasks that would normally require human intelligence — like recognizing images, understanding language and making decisions. It is not magic: it is math, data and optimization.',
        chips: isPt ? ['Dados', 'Modelos', 'Decisões'] : ['Data', 'Models', 'Decisions'],
      },
      {
        id: 'evolution',
        type: 'list',
        title: isPt ? 'Breve Evolução da IA' : 'Brief Evolution of AI',
        items: isPt
          ? [
              '📜 Anos 50-80: Sistemas baseados em regras (IA Simbólica).',
              '📈 Anos 90-2010: Machine Learning Estatístico (Regressões, SVM).',
              '🧠 2012: Deep Learning explode com redes neurais profundas.',
              { text: '✨ 2017: O artigo "Attention is All You Need" apresenta os Transformers.', isEmphasis: true },
              '🚀 Hoje: LLMs e IA Generativa transformando todas as indústrias.',
            ]
          : [
              '📜 50s-80s: Rule-based systems (Symbolic AI).',
              '📈 90s-2010s: Statistical Machine Learning (Regressions, SVM).',
              '🧠 2012: Deep Learning explodes with deep neural networks.',
              { text: '✨ 2017: The paper "Attention is All You Need" introduces Transformers.', isEmphasis: true },
              '🚀 Today: LLMs and Generative AI transforming every industry.',
            ],
      },
      {
        id: 'ai-vs-traditional',
        type: 'list',
        title: isPt ? 'IA vs Sistemas Tradicionais' : 'AI vs Traditional Systems',
        items: isPt
          ? [
              '🔧 Sistema tradicional: o programador escreve as regras explicitamente (if/else, fórmulas fixas).',
              '🤖 IA: o sistema aprende as regras a partir de exemplos — os dados ensinam o modelo.',
              '📋 Tradicional: frágil a casos não previstos. IA: generaliza para situações novas.',
              '📊 Tradicional: lógica determinística. IA: probabilidades e padrões estatísticos.',
              '🚀 Quando usar IA: quando as regras são complexas demais para escrever à mão.',
            ]
          : [
              '🔧 Traditional system: the programmer writes rules explicitly (if/else, fixed formulas).',
              '🤖 AI: the system learns rules from examples — data teaches the model.',
              '📋 Traditional: fragile to unseen cases. AI: generalizes to new situations.',
              '📊 Traditional: deterministic logic. AI: probabilities and statistical patterns.',
              '🚀 When to use AI: when rules are too complex to write by hand.',
            ],
      },
      {
        id: 'machine-learning',
        type: 'text',
        title: isPt ? 'Machine Learning' : 'Machine Learning',
        imageUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=800',
        body: isPt
          ? 'Machine Learning é o subcampo da IA onde o modelo aprende padrões diretamente dos dados, sem que o programador precise codificar cada regra. O processo é: coletar dados → definir uma função com parâmetros → medir o erro → ajustar os parâmetros para reduzir o erro. Esse ciclo de ajuste é o treino. Quanto mais dados e mais ciclos, melhor o modelo fica em generalizar.'
          : 'Machine Learning is the subfield of AI where the model learns patterns directly from data, without the programmer needing to code each rule. The process is: collect data → define a function with parameters → measure the error → adjust parameters to reduce the error. This adjustment cycle is training. The more data and cycles, the better the model gets at generalizing.',
      },
      {
        id: 'ml-vs-regression',
        type: 'list',
        title: isPt ? 'ML: Regressão Linear vs Redes Neurais' : 'ML: Linear Regression vs Neural Networks',
        items: isPt
          ? [
              '📈 Regressão Linear: Tenta traçar uma linha reta que melhor cruza os dados. Ótima para problemas simples (ex: preço por m²).',
              '🧠 Redes Neurais: São como "várias regressões juntas". Elas conseguem aprender curvas, dobras e padrões complexos.',
              '🔗 Enquanto a regressão é uma única fórmula direta, a rede neural é uma teia de fórmulas interconectadas.',
              { text: '🚀 Se o problema é "impossível" de resolver com uma linha reta, você precisa de uma Rede Neural.', isEmphasis: true },
            ]
          : [
              '📈 Linear Regression: Tries to draw a straight line that best fits the data. Great for simple problems (e.g., price per sqft).',
              '🧠 Neural Networks: Like "many regressions together." They can learn curves, folds, and complex patterns.',
              '🔗 While regression is a single direct formula, a neural network is a web of interconnected formulas.',
              { text: '🚀 If a problem is "impossible" to solve with a straight line, you need a Neural Network.', isEmphasis: true },
            ],
      },
      {
        id: 'nn-architecture',
        type: 'list',
        title: isPt ? 'A Arquitetura: Camadas' : 'Architecture: Layers',
        items: isPt
          ? [
              '📥 Camada de Entrada: Onde os dados começam (ex: pixels de uma foto ou palavras).',
              '🔀 Camadas Ocultas: O "processamento" interno que extrai padrões complexos.',
              '📤 Camada de Saída: O resultado final (ex: "é um gato" ou "a próxima palavra é...")',
              { text: '💡 Cada camada aprende algo mais abstrato que a anterior.', isEmphasis: true },
            ]
          : [
              '📥 Input Layer: Where data starts (e.g., pixels from a photo or words).',
              '🔀 Hidden Layers: Internal "processing" that extracts complex patterns.',
              '📤 Output Layer: The final result (e.g., "it is a cat" or "the next word is...")',
              { text: '💡 Each layer learns something more abstract than the previous one.', isEmphasis: true },
            ],
      },
      {
        id: 'nn-weights',
        type: 'text',
        title: isPt ? 'Pesos: Onde a "Inteligência" reside' : 'Weights: Where "Intelligence" lives',
        body: isPt
          ? 'As conexões entre neurônios têm PESOS. Um peso alto significa que uma informação é importante para a decisão; um peso baixo significa que deve ser ignorada. Aprender em IA significa ajustar esses milhões (ou bilhões) de pequenos botões de volume até que o modelo acerte a resposta.'
          : 'Connections between neurons have WEIGHTS. A high weight means information is important for the decision; a low weight means it should be ignored. Learning in AI means adjusting these millions (or billions) of tiny volume knobs until the model gets the answer right.',
      },
      {
        id: 'nn-forward',
        type: 'list',
        title: isPt ? 'O Fluxo: Forward Pass' : 'The Flow: Forward Pass',
        items: isPt
          ? [
              '1. Os dados entram na camada de entrada.',
              '2. Multiplicamos os dados pelos pesos atuais.',
              '3. A informação flui camada por camada.',
              '4. Chegamos a um palpite na saída.',
              { text: '🔄 No início, os pesos são aleatórios, então o palpite será puro chute.', isEmphasis: true },
            ]
          : [
              '1. Data enters through the input layer.',
              '2. We multiply the data by current weights.',
              '3. Information flows layer by layer.',
              '4. We reach a guess at the output.',
              { text: '🔄 At first, weights are random, so the guess will be pure chance.', isEmphasis: true },
            ],
      },
      {
        id: 'nn-activation',
        type: 'text',
        title: isPt ? 'Ativação: A Função Sigmoid' : 'Activation: The Sigmoid Function',
        body: isPt
          ? 'Para que um neurônio decida se deve "disparar" ou não, usamos uma função de ativação. A Sigmoid "espreme" qualquer número para um intervalo entre 0 e 1. Se o resultado for próximo de 1, o neurônio está ativo; próximo de 0, está inativo.'
          : 'For a neuron to decide whether to "fire" or not, we use an activation function. The Sigmoid "squeezes" any number into a range between 0 and 1. If the result is close to 1, the neuron is active; close to 0, it is inactive.',
      },
      {
        id: 'nn-non-linearity',
        type: 'list',
        title: isPt ? 'Por que o Não-Linear importa?' : 'Why Non-Linearity matters?',
        items: isPt
          ? [
              '📏 Se tudo fosse linear (soma e multiplicação simples), a rede seria apenas uma grande equação de primeiro grau.',
              '🎢 Funções não-lineares permitem que a rede aprenda padrões curvos e complexos.',
              '🤯 Sem isso, uma rede neural de 100 camadas não seria mais poderosa que um único neurônio.',
              { text: '✨ É a não-linearidade que permite à IA entender a complexidade do mundo real.', isEmphasis: true },
            ]
          : [
              '📏 If everything were linear (simple addition and multiplication), the network would just be one big linear equation.',
              '🎢 Non-linear functions allow the network to learn curved and complex patterns.',
              '🤯 Without this, a 100-layer neural network would be no more powerful than a single neuron.',
              { text: '✨ It is non-linearity that allows AI to understand the complexity of the real world.', isEmphasis: true },
            ],
      },
      {
        id: 'nn-loss',
        type: 'text',
        title: isPt ? 'Medindo o Erro: A Função de Perda (Loss)' : 'Measuring Error: The Loss Function',
        body: isPt
          ? 'Como sabemos se o modelo errou? Comparamos o "palpite" com a "verdade". A diferença entre eles é a LOSS. Se a loss é alta, o modelo está muito errado. Se a loss é baixa, ele está aprendendo bem. Nosso objetivo é SEMPRE diminuir a loss.'
          : 'How do we know if the model is wrong? We compare the "guess" with the "truth". The difference between them is the LOSS. If loss is high, the model is very wrong. If loss is low, it is learning well. Our goal is ALWAYS to decrease the loss.',
      },
      {
        id: 'nn-backprop',
        type: 'list',
        title: isPt ? 'Aprendendo: Backpropagation' : 'Learning: Backpropagation',
        items: isPt
          ? [
              '🧠 Se o modelo errou, precisamos avisar as camadas anteriores.',
              '📉 O erro viaja de volta (de trás para frente) pela rede.',
              '⚙️ Ajustamos cada peso levemente para que, na próxima vez, a loss seja menor.',
              { text: '🔁 Repetimos isso milhares de vezes até o modelo ficar "inteligente".', isEmphasis: true },
            ]
          : [
              '🧠 If the model made a mistake, we need to tell the previous layers.',
              '📉 The error travels back (from back to front) through the network.',
              '⚙️ We adjust each weight slightly so that next time, the loss is smaller.',
              { text: '🔁 We repeat this thousands of times until the model becomes "intelligent".', isEmphasis: true },
            ],
      },
      {
        id: 'first-code',
        type: 'code',
        title: isPt ? 'Treino em Python: Backpropagation' : 'Python Training: Backpropagation',
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
        id: 'transformers-intro',
        type: 'hero',
        title: isPt ? 'A Revolução dos Transformers' : 'The Transformer Revolution',
        body: isPt
          ? 'Em 2017, tudo mudou. Os Transformers abandonaram a ideia de processar texto palavra por palavra em sequência. Em vez disso, eles usam ATENÇÃO: o modelo olha para todas as palavras da frase ao mesmo tempo para entender o contexto.'
          : 'In 2017, everything changed. Transformers abandoned the idea of processing text word by word in sequence. Instead, they use ATTENTION: the model looks at all words in the sentence at once to understand context.',
        chips: isPt ? ['Atenção', 'Paralelismo', 'Contexto'] : ['Attention', 'Parallelism', 'Context'],
      },
      {
        id: 'llm-concept',
        type: 'text',
        title: isPt ? 'O que é uma LLM?' : 'What is an LLM?',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        body: isPt
          ? 'Large Language Models (Grandes Modelos de Linguagem) são Transformers treinados em volumes massivos de dados. O objetivo principal é surpreendentemente simples: prever qual é a próxima palavra (token) mais provável. Mas essa simplicidade, em escala, gera comportamentos que parecem raciocínio humano.'
          : 'Large Language Models are Transformers trained on massive volumes of data. The primary goal is surprisingly simple: predict the next most likely word (token). But this simplicity, at scale, generates behaviors that resemble human reasoning.',
      },
      {
        id: 'pytorch-intro',
        type: 'text',
        title: isPt ? 'PyTorch: O Motor da IA' : 'PyTorch: The AI Engine',
        imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aadebc25a?auto=format&fit=crop&q=80&w=800',
        body: isPt
          ? 'Antes de rodar um modelo, precisamos de uma biblioteca que entenda de matemática de tensores e redes neurais. O PyTorch é a ferramenta mais usada por pesquisadores e engenheiros no mundo todo para criar e rodar IAs. Ele é flexível, rápido e será nossa base técnica.'
          : 'Before running a model, we need a library that understands tensor math and neural networks. PyTorch is the most used tool by researchers and engineers worldwide to create and run AI. It is flexible, fast, and will be our technical foundation.',
      },
      {
        id: 'transformers-lib',
        type: 'text',
        title: isPt ? 'Hugging Face Transformers' : 'Hugging Face Transformers',
        imageUrl: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=800',
        body: isPt
          ? 'Se o PyTorch é o motor, a biblioteca "Transformers" da Hugging Face é a garagem cheia de carros prontos para dirigir. Ela nos permite baixar e usar milhares de modelos pré-treinados (como GPT, BERT, Llama) com pouquíssimas linhas de código.'
          : 'If PyTorch is the engine, the Hugging Face "Transformers" library is the garage full of cars ready to drive. It allows us to download and use thousands of pre-trained models (like GPT, BERT, Llama) with very few lines of code.',
      },
      {
        id: 'grand-finale',
        type: 'code',
        title: isPt ? 'O Grand Finale: Transformers v5' : 'The Grand Finale: Transformers v5',
        language: 'python',
        caption: 'hello_world_llm.py',
        code: `from transformers import pipeline

# Em apenas 1 linha você carrega um modelo real
# 'qual capital da frança'
model = pipeline("text-generation", model="gpt2")
res = model("A capital da França é", max_new_tokens=10)

print(res[0]['generated_text'])`,
      },
      {
        id: 'checkpoint',
        type: 'checkpoint',
        title: isPt ? 'O que ninguém deve perder' : 'What nobody should miss',
        items: isPt
          ? [
              'Entender a diferença entre IA e sistema tradicional.',
              'Saber o que é Machine Learning em uma frase.',
              'Visualizar a estrutura de uma rede neural (entrada → oculta → saída).',
              'Ver backpropagation acontecendo na animação ao vivo.',
            ]
          : [
              'Understand the difference between AI and a traditional system.',
              'Know what Machine Learning is in one sentence.',
              'Visualize the structure of a neural network (input → hidden → output).',
              'See backpropagation happening in the live animation.',
            ],
      },
    ],
  };
}
