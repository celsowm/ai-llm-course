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
        id: 'what-is-ai',
        type: 'hero',
        eyebrow: isPt ? 'Slide 1' : 'Slide 1',
        title: isPt ? 'O que é Inteligência Artificial?' : 'What is Artificial Intelligence?',
        body: isPt
          ? 'IA é a capacidade de um sistema computacional realizar tarefas que normalmente exigiriam inteligência humana — como reconhecer imagens, entender linguagem e tomar decisões. Não é mágica: é matemática, dados e otimização.'
          : 'AI is the ability of a computational system to perform tasks that would normally require human intelligence — like recognizing images, understanding language and making decisions. It is not magic: it is math, data and optimization.',
        chips: isPt ? ['Dados', 'Modelos', 'Decisões'] : ['Data', 'Models', 'Decisions'],
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
        body: isPt
          ? 'Machine Learning é o subcampo da IA onde o modelo aprende padrões diretamente dos dados, sem que o programador precise codificar cada regra. O processo é: coletar dados → definir uma função com parâmetros → medir o erro → ajustar os parâmetros para reduzir o erro. Esse ciclo de ajuste é o treino. Quanto mais dados e mais ciclos, melhor o modelo fica em generalizar.'
          : 'Machine Learning is the subfield of AI where the model learns patterns directly from data, without the programmer needing to code each rule. The process is: collect data → define a function with parameters → measure the error → adjust parameters to reduce the error. This adjustment cycle is training. The more data and cycles, the better the model gets at generalizing.',
      },
      {
        id: 'neural-network',
        type: 'list',
        title: isPt ? 'Rede Neural' : 'Neural Network',
        items: isPt
          ? [
              '🧠 Uma rede neural é um modelo de ML inspirado no cérebro: neurônios artificiais conectados em camadas.',
              '📥 Camada de entrada: recebe os dados brutos (pixels, tokens, números).',
              '🔀 Camadas ocultas: transformam os dados em representações cada vez mais abstratas.',
              '📤 Camada de saída: produz a previsão final (classe, número, próximo token).',
              '⚙️ Cada conexão tem um peso. O treino ajusta esses pesos via backpropagation.',
              '🔁 Backprop: calcula o gradiente do erro e atualiza os pesos na direção que reduz a loss.',
            ]
          : [
              '🧠 A neural network is an ML model inspired by the brain: artificial neurons connected in layers.',
              '📥 Input layer: receives raw data (pixels, tokens, numbers).',
              '🔀 Hidden layers: transform data into increasingly abstract representations.',
              '📤 Output layer: produces the final prediction (class, number, next token).',
              '⚙️ Each connection has a weight. Training adjusts these weights via backpropagation.',
              '🔁 Backprop: computes the error gradient and updates weights in the direction that reduces loss.',
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
