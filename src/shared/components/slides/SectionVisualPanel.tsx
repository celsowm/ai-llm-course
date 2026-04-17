import { Box, Stack, Typography } from '@mui/material';
import { useI18n } from '../../../i18n/I18nProvider';
import { MiniBadge } from './slide-primitives';
import { SectionFigure } from './SectionFigure';

export interface SlideVisualConfig {
  kicker: string;
  figureTitle: string;
  figureCaption: string;
  callouts: string[];
}

export function getSlideVisuals(isPt: boolean): Record<string, SlideVisualConfig> {
  return {
    // Fundamentals
    timeline: {
      kicker: isPt ? 'Mapa' : 'Map',
      figureTitle: isPt ? 'Jornada de aprendizado' : 'Learning journey',
      figureCaption: isPt
        ? 'Uma visão geral dos tópicos que vamos explorar nesta sessão.'
        : 'An overview of the topics we will explore in this session.',
      callouts: isPt ? ['teoria e prática', 'do zero ao código'] : ['theory and practice', 'from zero to code'],
    },
    evolution: {
      kicker: isPt ? 'Histórico' : 'History',
      figureTitle: isPt ? 'Eras da inteligência' : 'Eras of intelligence',
      figureCaption: isPt
        ? 'De regras fixas ao poder massivo dos Transformers e LLMs.'
        : 'From fixed rules to the massive power of Transformers and LLMs.',
      callouts: isPt ? ['IA simbólica', 'transformers'] : ['symbolic AI', 'transformers'],
    },
    'what-is-ai': {
      kicker: isPt ? 'Panorama' : 'Overview',
      figureTitle: isPt ? 'Sistema orientado por dados' : 'Data-driven system',
      figureCaption: isPt
        ? 'A IA só produz algo útil quando dados, modelo e critério de erro trabalham juntos.'
        : 'AI only produces something useful when data, model and error criteria work together.',
      callouts: isPt ? ['voz, visão e texto', 'otimização em cima de dados'] : ['voice, vision and text', 'optimization over data'],
    },
    'ai-vs-traditional': {
      kicker: isPt ? 'Comparação' : 'Comparison',
      figureTitle: isPt ? 'Dois fluxos, duas lógicas' : 'Two flows, two logics',
      figureCaption: isPt
        ? 'Na esquerda, regras fixas; na direita, parâmetros aprendidos com exemplos.'
        : 'On the left, fixed rules; on the right, parameters learned from examples.',
      callouts: isPt ? ['determinístico', 'aprendizado estatístico'] : ['deterministic', 'statistical learning'],
    },
    'machine-learning': {
      kicker: isPt ? 'Pipeline' : 'Pipeline',
      figureTitle: isPt ? 'Ciclo do treino supervisionado' : 'Supervised training cycle',
      figureCaption: isPt
        ? 'O pipeline vira um laço: predizer, medir erro e corrigir.'
        : 'The pipeline becomes a loop: predict, measure error and correct.',
      callouts: isPt ? ['objetivo: generalizar', 'não decorar treino'] : ['goal: generalize', 'don’t memorize training'],
    },
    'nn-why-exists': {
      kicker: isPt ? 'Motivação' : 'Motivation',
      figureTitle: isPt ? 'Transformações sucessivas' : 'Successive transformations',
      figureCaption: isPt
        ? 'Entradas simples passam por várias transformações até virar uma predição útil.'
        : 'Simple inputs pass through several transformations until they become a useful prediction.',
      callouts: isPt ? ['relações não lineares', 'profundidade aumenta capacidade'] : ['non-linear relations', 'depth increases capacity'],
    },
    'nn-neuron-overview': {
      kicker: isPt ? 'Unidade básica' : 'Basic unit',
      figureTitle: isPt ? 'Anatomia do neurônio' : 'Neuron anatomy',
      figureCaption: isPt
        ? 'Entradas, pesos, bias e ativação formam o bloco básico da rede.'
        : 'Inputs, weights, bias and activation form the basic block of the network.',
      callouts: isPt ? ['soma ponderada', 'átomo da rede'] : ['weighted sum', 'network atom'],
    },
    'nn-inputs': {
      kicker: isPt ? 'Entradas' : 'Inputs',
      figureTitle: isPt ? 'O mundo como números' : 'The world as numbers',
      figureCaption: isPt
        ? 'Toda informação (pixel, som, texto) é convertida em vetores numéricos.'
        : 'Every piece of information (pixel, sound, text) is converted into numeric vectors.',
      callouts: isPt ? ['sensores e dados', 'vetores de entrada'] : ['sensors and data', 'input vectors'],
    },
    'nn-weights': {
      kicker: isPt ? 'Pesos' : 'Weights',
      figureTitle: isPt ? 'Ajuste de influência' : 'Influence adjustment',
      figureCaption: isPt
        ? 'Pesos amplificam ou silenciam sinais baseados na importância aprendida.'
        : 'Weights amplify or silence signals based on learned importance.',
      callouts: isPt ? ['multiplicação', 'aprendizado de parâmetros'] : ['multiplication', 'parameter learning'],
    },
    'nn-bias': {
      kicker: isPt ? 'Bias' : 'Bias',
      figureTitle: isPt ? 'O limiar de ativação' : 'The activation threshold',
      figureCaption: isPt
        ? 'O bias permite que o neurônio decida quando disparar de forma flexível.'
        : 'Bias allows the neuron to decide when to fire flexibly.',
      callouts: isPt ? ['deslocamento', 'flexibilidade matemática'] : ['offset', 'mathematical flexibility'],
    },
    'nn-activation': {
      kicker: isPt ? 'Ativação' : 'Activation',
      figureTitle: isPt ? 'Decisão não-linear' : 'Non-linear decision',
      figureCaption: isPt
        ? 'A função de ativação decide como a soma ponderada vira o sinal de saída.'
        : 'The activation function decides how the weighted sum becomes the output signal.',
      callouts: isPt ? ['ReLU / Sigmoid', 'curvatura e complexidade'] : ['ReLU / Sigmoid', 'curvature and complexity'],
    },
    'nn-formula': {
      kicker: isPt ? 'Matemática' : 'Math',
      figureTitle: isPt ? 'A fórmula completa' : 'The full formula',
      figureCaption: isPt
        ? 'A união de todos os componentes em uma única operação elegante.'
        : 'The union of all components into a single elegant operation.',
      callouts: isPt ? ['y = f(wx + b)', 'essência do deep learning'] : ['y = f(wx + b)', 'essence of deep learning'],
    },
    'nn-pytorch-neuron': {
      kicker: isPt ? 'Implementação' : 'Implementation',
      figureTitle: isPt ? 'Neurônio no PyTorch' : 'Neuron in PyTorch',
      figureCaption: isPt
        ? 'No PyTorch, a camada Linear abstrai a soma ponderada e o bias em um único objeto.'
        : 'In PyTorch, the Linear layer abstracts the weighted sum and bias into a single object.',
      callouts: isPt ? ['torch.nn.Linear', 'parâmetros treináveis'] : ['torch.nn.Linear', 'trainable parameters'],
    },
    'nn-layers': {
      kicker: isPt ? 'Arquitetura' : 'Architecture',
      figureTitle: isPt ? 'Rede em camadas' : 'Layered network',
      figureCaption: isPt
        ? 'Cada camada reexpressa a entrada em uma representação mais útil.'
        : 'Each layer re-expresses the input into a more useful representation.',
      callouts: isPt ? ['entrada -> ocultas -> saída', 'abstrações progressivas'] : ['input -> hidden -> output', 'progressive abstractions'],
    },
    'nn-forward-pass': {
      kicker: isPt ? 'Inferência' : 'Inference',
      figureTitle: isPt ? 'Fluxo de ida' : 'Forward flow',
      figureCaption: isPt
        ? 'A informação percorre a rede até sair como predição.'
        : 'Information travels through the network until it leaves as a prediction.',
      callouts: isPt ? ['usa os pesos atuais', 'ainda não corrige nada'] : ['uses current weights', 'nothing corrected yet'],
    },
    'nn-loss': {
      kicker: isPt ? 'Objetivo' : 'Goal',
      figureTitle: isPt ? 'Predição vs alvo' : 'Prediction vs target',
      figureCaption: isPt
        ? 'A loss resume em um número o quão distante a resposta ficou do esperado.'
        : 'Loss summarizes in a number how far the response was from the expected one.',
      callouts: isPt ? ['erro mensurável', 'guia a correção'] : ['measurable error', 'guides correction'],
    },
    'nn-backprop': {
      kicker: isPt ? 'Treino' : 'Training',
      figureTitle: isPt ? 'Fluxo de volta' : 'Backward flow',
      figureCaption: isPt
        ? 'O erro retorna pela rede distribuindo gradientes para cada peso.'
        : 'The error returns through the network distributing gradients to each weight.',
      callouts: isPt ? ['gradientes', 'update pequeno e repetido'] : ['gradients', 'small and repeated update'],
    },
    'nn-many-epochs': {
      kicker: isPt ? 'Convergência' : 'Convergence',
      figureTitle: isPt ? 'Treino ao longo do tempo' : 'Training over time',
      figureCaption: isPt
        ? 'A loss tende a cair, mas generalização ruim ainda pode aparecer.'
        : 'Loss tends to fall, but poor generalization can still appear.',
      callouts: isPt ? ['queda de loss', 'risco de overfitting'] : ['loss drop', 'overfitting risk'],
    },
    'first-code': {
      kicker: isPt ? 'Código' : 'Code',
      figureTitle: isPt ? 'Loop de treino' : 'Training loop',
      figureCaption: isPt
        ? 'Épocas e loss média conectam a teoria com a execução real do algoritmo.'
        : 'Epochs and mean loss connect theory with the real execution of the algorithm.',
      callouts: isPt ? ['repetição estruturada', 'ponte com a animação'] : ['structured repetition', 'bridge to animation'],
    },
    checkpoint: {
      kicker: isPt ? 'Fechamento' : 'Closing',
      figureTitle: isPt ? 'Resumo de conceitos' : 'Concept summary',
      figureCaption: isPt
        ? 'No fim, os conceitos se conectam como partes do mesmo ciclo.'
        : 'In the end, concepts connect as parts of the same cycle.',
      callouts: isPt ? ['vocabulário técnico', 'ponte até LLMs'] : ['technical vocabulary', 'bridge to LLMs'],
    },
    // Setup Module
    hero: {
      kicker: isPt ? 'Ambiente' : 'Environment',
      figureTitle: isPt ? 'Infraestrutura de IA' : 'AI Infrastructure',
      figureCaption: isPt ? 'Configuração básica para rodar modelos locais.' : 'Basic configuration to run local models.',
      callouts: isPt ? ['Python', 'PyTorch'] : ['Python', 'PyTorch'],
    },
    'installing-python': {
      kicker: isPt ? 'Requisito' : 'Requirement',
      figureTitle: isPt ? 'Linguagem base' : 'Base language',
      figureCaption: isPt ? 'Python como o ecossistema padrão da indústria.' : 'Python as the industry standard ecosystem.',
      callouts: isPt ? ['v3.10+', 'ecossistema'] : ['v3.10+', 'ecosystem'],
    },
    tracks: {
      kicker: isPt ? 'Hardware' : 'Hardware',
      figureTitle: isPt ? 'Backends de execução' : 'Execution backends',
      figureCaption: isPt ? 'Diferentes formas de acelerar o treino.' : 'Different ways to accelerate training.',
      callouts: isPt ? ['GPU NVIDIA', 'Apple Silicon'] : ['NVIDIA GPU', 'Apple Silicon'],
    },
    venv: {
      kicker: isPt ? 'Isolamento' : 'Isolation',
      figureTitle: isPt ? 'Ambiente virtual' : 'Virtual environment',
      figureCaption: isPt ? 'Evitando conflitos entre pacotes e projetos.' : 'Avoiding conflicts between packages and projects.',
      callouts: isPt ? ['venv', 'pip install'] : ['venv', 'pip install'],
    },
    'backend-check': {
      kicker: isPt ? 'Teste' : 'Test',
      figureTitle: isPt ? 'Verificação de GPU' : 'GPU Verification',
      figureCaption: isPt ? 'Confirmando se o hardware é visto pelo código.' : 'Confirming if the hardware is seen by the code.',
      callouts: isPt ? ['is_available()', 'diagnóstico'] : ['is_available()', 'diagnosis'],
    },
    warning: {
      kicker: isPt ? 'Dica' : 'Tip',
      figureTitle: isPt ? 'Fluxo de contingência' : 'Contingency flow',
      figureCaption: isPt ? 'Não deixe o setup travar seu progresso.' : 'Don’t let setup stall your progress.',
      callouts: isPt ? ['Colab', 'Plano B'] : ['Colab', 'Plan B'],
    },
    goals: {
      kicker: isPt ? 'Pronto' : 'Ready',
      figureTitle: isPt ? 'Setup completo' : 'Setup complete',
      figureCaption: isPt ? 'Base sólida para rodar os próximos exemplos.' : 'Solid base to run the next examples.',
      callouts: isPt ? ['pronto para uso', 'infra ok'] : ['ready to use', 'infra ok'],
    },
  };
}

export function SectionVisualPanel({ sectionId, title }: { sectionId: string; title: string }) {
  const { locale } = useI18n();
  const isPt = locale === 'pt-BR';
  const visuals = getSlideVisuals(isPt);
  const config = visuals[sectionId];

  if (!config) {
    return null;
  }

  return (
    <Box
      sx={{
        p: 2.25,
        height: '100%',
        minHeight: 0,
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.72), rgba(15,23,42,0.92))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 'auto -60px -60px auto',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.28), rgba(139,92,246,0))',
          pointerEvents: 'none',
        }}
      />

      <Stack spacing={2.4} sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
        <Box>
          <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ letterSpacing: '0.18em' }}>
            {config.kicker}
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800, lineHeight: 1.08, fontSize: { xs: '1.45rem', md: '1.7rem' } }}>
            {config.figureTitle}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75, fontSize: '0.92rem', lineHeight: 1.55 }}>
            {config.figureCaption}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'grid',
            placeItems: 'center',
            p: 1.5,
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.08)',
            bgcolor: 'rgba(2,6,23,0.35)',
          }}
        >
          <SectionFigure sectionId={sectionId} />
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {config.callouts.map((item) => (
            <MiniBadge key={`${title}-${item}`} text={item} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
