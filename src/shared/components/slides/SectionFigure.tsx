import { Box, Stack, Typography } from '@mui/material';
import { useI18n } from '../../../i18n/I18nProvider';
import { Connector, FigureNode, MiniBadge } from './slide-primitives';

export function SectionFigure({ sectionId }: { sectionId: string }) {
  const { locale } = useI18n();
  const isPt = locale === 'pt-BR';

  if (sectionId === 'ai-vs-traditional') {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 1.25, alignItems: 'stretch' }}>
        <Box sx={{ p: 1.3, borderRadius: 3, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(255,255,255,0.03)' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            {isPt ? 'Tradicional' : 'Traditional'}
          </Typography>
          <Stack spacing={1} alignItems="stretch">
            <FigureNode tone="primary">{isPt ? 'Programador' : 'Programmer'}</FigureNode>
            <Connector direction="down" />
            <FigureNode sx={{ minHeight: 54, display: 'grid', placeItems: 'center' }}>if / else</FigureNode>
            <Connector direction="down" />
            <FigureNode tone="warning">{isPt ? 'Saída prevista' : 'Expected output'}</FigureNode>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.1 }}>
            {isPt ? 'regras escritas manualmente' : 'hand-written rules'}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mt: 7, color: 'text.secondary', fontWeight: 900 }}>vs</Typography>

        <Box sx={{ p: 1.3, borderRadius: 3, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(255,255,255,0.03)' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>IA / ML</Typography>
          <Stack spacing={1} alignItems="stretch">
            <FigureNode tone="secondary">{isPt ? 'Dados' : 'Data'}</FigureNode>
            <Connector direction="down" />
            <FigureNode sx={{ minHeight: 54, display: 'grid', placeItems: 'center' }}>{isPt ? 'loss + treino' : 'loss + training'}</FigureNode>
            <Connector direction="down" />
            <FigureNode tone="success">{isPt ? 'Parâmetros ajustados' : 'Adjusted parameters'}</FigureNode>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.1 }}>
            {isPt ? 'regras aprendidas com exemplos' : 'rules learned from examples'}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (sectionId === 'machine-learning' || sectionId === 'first-code') {
    return (
      <Stack spacing={1.25} alignItems="center">
        <Stack direction="row" spacing={1.1} alignItems="center" justifyContent="center" flexWrap="wrap" useFlexGap>
          <MiniBadge text={isPt ? 'dados' : 'data'} />
          <Connector />
          <MiniBadge text={isPt ? 'modelo' : 'model'} />
          <Connector />
          <MiniBadge text={isPt ? 'predição' : 'prediction'} />
        </Stack>
        <Stack direction="row" spacing={1.1} alignItems="center" justifyContent="center" flexWrap="wrap" useFlexGap>
          <MiniBadge text="loss" tone="warning" />
          <Connector direction="right" color="#f59e0b" />
          <MiniBadge text={isPt ? 'update' : 'update'} tone="warning" />
          <Connector direction="right" color="#f59e0b" />
          <MiniBadge text={isPt ? 'novo modelo' : 'new model'} tone="success" />
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
          {isPt ? 'treino = repetir esse circuito até a loss cair' : 'training = repeat this loop until loss drops'}
        </Typography>
      </Stack>
    );
  }

  const isNeuronRelated = ['nn-neuron-overview', 'nn-inputs', 'nn-weights', 'nn-bias', 'nn-activation', 'nn-formula'].includes(sectionId);

  if (isNeuronRelated) {
    return (
      <Stack spacing={1.25} alignItems="center">
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', gap: 0.9, alignItems: 'center', width: '100%' }}>
          <Stack spacing={0.65}>
            <FigureNode>x1</FigureNode>
            <FigureNode>x2</FigureNode>
            <FigureNode>x3</FigureNode>
          </Stack>

          <Stack spacing={0.85} alignItems="center">
            <Connector direction="right" />
            <Connector direction="right" />
            <Connector direction="right" />
          </Stack>

          <Stack spacing={0.6} alignItems="center">
            <FigureNode tone="primary">{isPt ? 'pesos' : 'weights'}</FigureNode>
            <MiniBadge text="w1, w2, w3" />
            <MiniBadge text="Σ(wi xi)" tone="warning" />
          </Stack>

          <Stack spacing={0.85} alignItems="center">
            <Connector direction="right" color="#34d399" />
            <Connector direction="right" color="#34d399" />
            <Connector direction="right" color="#34d399" />
          </Stack>

          <Stack spacing={0.6} alignItems="center">
            <FigureNode tone="secondary">{isPt ? '+ viés' : '+ bias'}</FigureNode>
            <MiniBadge text={isPt ? 'desloca a resposta' : 'shifts the response'} tone="secondary" />
            <MiniBadge text={isPt ? 'limiar de ativação' : 'activation threshold'} />
          </Stack>

          <Stack spacing={0.85} alignItems="center">
            <Connector direction="right" color="#22c55e" />
            <Connector direction="right" color="#22c55e" />
            <Connector direction="right" color="#22c55e" />
          </Stack>

          <Stack spacing={0.6} alignItems="center">
            <FigureNode tone="success">f(Σ + b)</FigureNode>
            <FigureNode sx={{ borderColor: 'rgba(52,211,153,0.35)', bgcolor: 'rgba(52,211,153,0.12)' }}>{isPt ? 'saída' : 'output'}</FigureNode>
            <MiniBadge text="y = f(w·x + b)" tone="success" />
          </Stack>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
          {isPt 
            ? 'um neurônio é uma soma ponderada seguida de uma função de ativação' 
            : 'a neuron is a weighted sum followed by an activation function'}
        </Typography>
      </Stack>
    );
  }

  if (sectionId === 'nn-layers' || sectionId === 'nn-why-exists') {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.15, alignItems: 'center' }}>
        {[
          { label: isPt ? 'Entrada' : 'Input', nodes: 4, tone: 'primary' },
          { label: isPt ? 'Oculta 1' : 'Hidden 1', nodes: 3, tone: 'secondary' },
          { label: isPt ? 'Oculta 2' : 'Hidden 2', nodes: 3, tone: 'secondary' },
          { label: isPt ? 'Saída' : 'Output', nodes: 1, tone: 'success' },
        ].map((column, index) => (
          <Stack key={column.label} spacing={0.7} alignItems="center">
            <Typography variant="caption" color="text.secondary">{column.label}</Typography>
            {Array.from({ length: column.nodes }).map((_, nodeIndex) => (
              <Box key={`${column.label}-${nodeIndex}`} sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: column.tone === 'success' ? 'success.main' : column.tone === 'secondary' ? 'secondary.main' : 'primary.main', boxShadow: '0 0 0 6px rgba(255,255,255,0.03)' }} />
            ))}
            {index < 3 ? <Box sx={{ width: '100%', height: 2, bgcolor: 'primary.main', opacity: 0.7 }} /> : null}
          </Stack>
        ))}
      </Box>
    );
  }

  if (sectionId === 'nn-forward-pass' || sectionId === 'nn-backprop') {
    const reverse = sectionId === 'nn-backprop';
    return (
      <Stack spacing={1.35} alignItems="center">
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', gap: 1, alignItems: 'center', width: '100%' }}>
          <MiniBadge text={reverse ? (isPt ? 'erro' : 'error') : (isPt ? 'amostra' : 'sample')} tone={reverse ? 'warning' : 'primary'} />
          <Connector direction="right" color={reverse ? '#f59e0b' : '#60a5fa'} />
          <MiniBadge text={isPt ? 'camada 1' : 'layer 1'} />
          <Connector direction="right" color={reverse ? '#f59e0b' : '#60a5fa'} />
          <MiniBadge text={isPt ? 'camada 2' : 'layer 2'} />
          <Connector direction="right" color={reverse ? '#f59e0b' : '#60a5fa'} />
          <MiniBadge text={reverse ? (isPt ? 'pesos' : 'weights') : (isPt ? 'predição' : 'prediction')} tone={reverse ? 'warning' : 'success'} />
        </Box>
        <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.1 }}>
          <Box sx={{ p: 1.2, borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.08)', bgcolor: reverse ? 'rgba(245,158,11,0.08)' : 'rgba(96,165,250,0.08)' }}>
            <Typography variant="caption" color="text.secondary">{reverse ? 'backward' : 'forward'}</Typography>
            <Typography variant="body2" fontWeight={700}>
              {reverse 
                ? (isPt ? 'gradiente volta e corrige pesos' : 'gradient returns and corrects weights') 
                : (isPt ? 'informação passa e gera saída' : 'information passes and generates output')}
            </Typography>
          </Box>
          <Box sx={{ p: 1.2, borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(255,255,255,0.03)' }}>
            <Typography variant="caption" color="text.secondary">{isPt ? 'efeito' : 'effect'}</Typography>
            <Typography variant="body2" fontWeight={700}>
              {reverse 
                ? (isPt ? 'cada peso recebe responsabilidade' : 'each weight receives responsibility') 
                : (isPt ? 'cada camada refina a representação' : 'each layer refines the representation')}
            </Typography>
          </Box>
        </Box>
      </Stack>
    );
  }

  if (sectionId === 'nn-loss') {
    return (
      <Stack spacing={1.2} alignItems="center">
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 1.25, width: '100%', alignItems: 'end' }}>
          <Stack spacing={0.5} alignItems="center">
            <Typography variant="caption" color="text.secondary">{isPt ? 'Predição' : 'Prediction'}</Typography>
            <Box sx={{ width: 52, height: 90, borderRadius: 3, bgcolor: 'rgba(96,165,250,0.18)', border: '1px solid rgba(96,165,250,0.45)', display: 'grid', placeItems: 'end center', pb: 1, fontWeight: 800 }}>
              0.82
            </Box>
          </Stack>
          <Box sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
            <Typography variant="h5" color="warning.main" fontWeight={900}>loss</Typography>
            <Box sx={{ width: 56, height: 4, bgcolor: 'warning.main', borderRadius: 999, mt: 0.75 }} />
          </Box>
          <Stack spacing={0.5} alignItems="center">
            <Typography variant="caption" color="text.secondary">{isPt ? 'Alvo' : 'Target'}</Typography>
            <Box sx={{ width: 52, height: 112, borderRadius: 3, bgcolor: 'rgba(52,211,153,0.18)', border: '1px solid rgba(52,211,153,0.45)', display: 'grid', placeItems: 'end center', pb: 1, fontWeight: 800 }}>
              1.00
            </Box>
          </Stack>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
          {isPt 
            ? 'loss mede a distância entre o que saiu e o que deveria sair' 
            : 'loss measures the distance between what came out and what should have'}
        </Typography>
      </Stack>
    );
  }

  if (sectionId === 'nn-many-epochs') {
    return (
      <Box sx={{ height: 170, width: '100%', position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: '12px 6px 26px 34px', borderLeft: '1px solid rgba(255,255,255,0.14)', borderBottom: '1px solid rgba(255,255,255,0.14)' }} />
        <svg viewBox="0 0 360 170" width="100%" height="100%" style={{ position: 'relative' }}>
          <polyline points="18,28 72,46 126,68 180,92 234,116 288,132 342,142" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="18,28 72,46 126,68 180,92 234,116 288,132 342,142 342,156 18,156" fill="rgba(34,197,94,0.08)" stroke="none" />
          {[18, 72, 126, 180, 234, 288, 342].map((x, index) => (
            <g key={x}>
              <circle cx={x} cy={[28, 46, 68, 92, 116, 132, 142][index]} r="4.5" fill={index < 2 ? '#f59e0b' : index < 4 ? '#60a5fa' : '#22c55e'} />
            </g>
          ))}
          <text x="18" y="160" fill="rgba(255,255,255,0.55)" style={{ fontSize: 10 }}>{isPt ? 'épocas' : 'epochs'}</text>
          <text x="292" y="18" fill="rgba(255,255,255,0.55)" style={{ fontSize: 10 }}>loss</text>
        </svg>
      </Box>
    );
  }

  if (sectionId === 'what-is-ai' || sectionId === 'checkpoint') {
    return (
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
          {[isPt ? 'Dados' : 'Data', isPt ? 'Modelo' : 'Model', isPt ? 'Erro' : 'Error', isPt ? 'Ajuste' : 'Adjust'].map((item) => <MiniBadge key={item} text={item} />)}
        </Stack>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.2 }}>
          {[isPt ? 'Visão' : 'Vision', isPt ? 'Texto' : 'Text', isPt ? 'Voz' : 'Voice', isPt ? 'Decisão' : 'Decision'].map((item, index) => (
            <Box key={item} sx={{ p: 1.6, borderRadius: 2.5, border: '1px solid rgba(148,163,184,0.2)', bgcolor: 'rgba(255,255,255,0.03)', textAlign: 'center', fontWeight: 700, color: index % 2 === 0 ? 'primary.light' : 'secondary.light' }}>
              {item}
            </Box>
          ))}
        </Box>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center">
      {[isPt ? 'Entrada' : 'Input', isPt ? 'Processo' : 'Process', isPt ? 'Saída' : 'Output'].map((item) => <MiniBadge key={item} text={item} />)}
    </Stack>
  );
}
