import { Box, Stack, Typography } from '@mui/material';
import type { SlideVisualConfig } from '../../../core/interfaces/Lesson';
import { useI18n } from '../../../i18n/I18nProvider';
import { MiniBadge } from './slide-primitives';
import { SectionFigure } from './SectionFigure';

function getFallbackVisuals(isPt: boolean): Record<string, SlideVisualConfig> {
  return {
    hero: {
      kicker: isPt ? 'Ambiente' : 'Environment',
      figureTitle: isPt ? 'Infraestrutura de IA' : 'AI infrastructure',
      figureCaption: isPt ? 'Configuração base para rodar modelos locais.' : 'Basic setup to run local models.',
      callouts: isPt ? ['python', 'pytorch'] : ['python', 'pytorch'],
      figure: {
        kind: 'pillars-grid',
        pipeline: [
          { label: 'Python', icon: '🐍', tone: 'primary' },
          { label: 'Env', icon: '📦', tone: 'secondary' },
          { label: 'GPU', icon: '⚙️', tone: 'success' },
        ],
        grid: [
          { label: isPt ? 'linguagem' : 'language', icon: '⌨️', color: '#60a5fa' },
          { label: isPt ? 'pacotes' : 'packages', icon: '📚', color: '#a78bfa' },
          { label: isPt ? 'aceleração' : 'acceleration', icon: '🚀', color: '#34d399' },
          { label: isPt ? 'execução' : 'runtime', icon: '🧪', color: '#f59e0b' },
        ],
      },
    },
    'installing-python': {
      kicker: isPt ? 'Requisito' : 'Requirement',
      figureTitle: isPt ? 'Base do ecossistema' : 'Ecosystem base',
      figureCaption: isPt ? 'Python continua sendo o eixo das bibliotecas de IA.' : 'Python remains the center of the AI tooling ecosystem.',
      callouts: isPt ? ['v3.10+', 'pip'] : ['v3.10+', 'pip'],
      figure: {
        kind: 'vertical-steps',
        steps: [
          { label: 'Python', icon: '🐍', active: true },
          { label: isPt ? 'Pacotes' : 'Packages', icon: '📦' },
          { label: 'PyTorch', icon: '🔥' },
          { label: isPt ? 'Modelo' : 'Model', icon: '🧠' },
        ],
      },
    },
    tracks: {
      kicker: isPt ? 'Hardware' : 'Hardware',
      figureTitle: isPt ? 'Backends de execução' : 'Execution backends',
      figureCaption: isPt ? 'Escolha do backend muda desempenho, não o raciocínio do código.' : 'Backend choice changes performance, not the code’s learning logic.',
      callouts: isPt ? ['cuda', 'metal'] : ['cuda', 'metal'],
      figure: {
        kind: 'dual-path',
        left: {
          title: 'CPU',
          caption: isPt ? 'mais lento, mais universal' : 'slower, more universal',
          tone: 'warning',
          steps: isPt ? ['interpreta', 'executa', 'depura'] : ['interprets', 'executes', 'debugs'],
        },
        right: {
          title: 'GPU',
          caption: isPt ? 'mais rápido, mais paralelo' : 'faster, more parallel',
          tone: 'success',
          steps: isPt ? ['lotes', 'matmul', 'treino'] : ['batches', 'matmul', 'training'],
        },
        centerLabel: 'vs',
      },
    },
    venv: {
      kicker: isPt ? 'Isolamento' : 'Isolation',
      figureTitle: isPt ? 'Separar dependências' : 'Separate dependencies',
      figureCaption: isPt ? 'Cada projeto mantém o próprio conjunto de versões.' : 'Each project keeps its own dependency set.',
      callouts: isPt ? ['venv', 'reprodutibilidade'] : ['venv', 'reproducibility'],
      figure: {
        kind: 'dual-path',
        left: {
          title: isPt ? 'Sistema global' : 'Global system',
          caption: isPt ? 'conflitos de versão' : 'version conflicts',
          tone: 'warning',
          steps: isPt ? ['numpy 1', 'torch 2', 'quebra'] : ['numpy 1', 'torch 2', 'breaks'],
        },
        right: {
          title: isPt ? 'Projeto isolado' : 'Isolated project',
          caption: isPt ? 'dependências previsíveis' : 'predictable dependencies',
          tone: 'success',
          steps: isPt ? ['venv', 'pip install', 'ok'] : ['venv', 'pip install', 'ok'],
        },
        centerLabel: 'vs',
      },
    },
    'backend-check': {
      kicker: isPt ? 'Teste' : 'Test',
      figureTitle: isPt ? 'Diagnóstico do runtime' : 'Runtime diagnostic',
      figureCaption: isPt ? 'Confirme cedo se o backend está visível para o código.' : 'Confirm early whether the backend is visible to the code.',
      callouts: isPt ? ['is_available()', 'device'] : ['is_available()', 'device'],
      figure: {
        kind: 'loop',
        topRow: [
          { label: 'torch', tone: 'primary' },
          { label: isPt ? 'device' : 'device', tone: 'secondary' },
          { label: isPt ? 'teste' : 'test', tone: 'success' },
        ],
        bottomRow: [
          { label: 'cuda?', tone: 'warning' },
          { label: 'mps?', tone: 'warning' },
          { label: 'cpu', tone: 'primary' },
        ],
        footer: isPt ? 'diagnóstico rápido antes do treino real' : 'quick diagnostic before real training',
      },
    },
    warning: {
      kicker: isPt ? 'Contingência' : 'Contingency',
      figureTitle: isPt ? 'Plano B de execução' : 'Execution fallback',
      figureCaption: isPt ? 'Se o ambiente local falhar, troque o runtime sem perder o ritmo.' : 'If local setup fails, switch runtime without losing momentum.',
      callouts: isPt ? ['colab', 'seguir aula'] : ['colab', 'keep moving'],
      figure: {
        kind: 'vertical-steps',
        steps: [
          { label: isPt ? 'Local' : 'Local', icon: '💻', active: true },
          { label: isPt ? 'Diagnóstico' : 'Diagnose', icon: '🔎' },
          { label: 'Colab', icon: '☁️' },
          { label: isPt ? 'Continuar' : 'Continue', icon: '▶️' },
        ],
      },
    },
    goals: {
      kicker: isPt ? 'Pronto' : 'Ready',
      figureTitle: isPt ? 'Base operacional' : 'Operational baseline',
      figureCaption: isPt ? 'Ambiente pronto para os próximos exemplos e experimentos.' : 'Environment ready for the next examples and experiments.',
      callouts: isPt ? ['setup ok', 'seguir curso'] : ['setup ok', 'continue course'],
      figure: {
        kind: 'pillars-grid',
        pipeline: [
          { label: 'Python', icon: '🐍', tone: 'primary' },
          { label: 'Torch', icon: '🔥', tone: 'secondary' },
          { label: isPt ? 'Pronto' : 'Ready', icon: '✅', tone: 'success' },
        ],
        grid: [
          { label: isPt ? 'pacotes' : 'packages', icon: '📦', color: '#60a5fa' },
          { label: isPt ? 'device' : 'device', icon: '🖥️', color: '#a78bfa' },
          { label: isPt ? 'teste' : 'test', icon: '🧪', color: '#f59e0b' },
          { label: isPt ? 'execução' : 'run', icon: '🚀', color: '#34d399' },
        ],
      },
    },
  };
}

export function SectionVisualPanel({
  sectionId,
  title,
  visual,
}: {
  sectionId: string;
  title: string;
  visual?: SlideVisualConfig;
}) {
  const { locale } = useI18n();
  const isPt = locale === 'pt-BR';
  const fallbackVisuals = getFallbackVisuals(isPt);
  const config = visual ?? fallbackVisuals[sectionId];

  if (!config) {
    return null;
  }

  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        minHeight: 0,
        borderRadius: 3.5,
        border: '1px solid rgba(255,255,255,0.09)',
        background: 'linear-gradient(180deg, rgba(13,18,34,0.82), rgba(10,14,26,0.96))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 'auto -70px -70px auto',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.22), rgba(139,92,246,0))',
          pointerEvents: 'none',
        }}
      />

      <Stack spacing={2.1} sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
        <Box>
          <Typography variant="overline" color="primary.main" fontWeight={800} sx={{ letterSpacing: '0.18em', fontSize: '0.78rem' }}>
            {config.kicker}
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.4, fontWeight: 900, lineHeight: 1.06, fontSize: { xs: '1.34rem', md: '1.58rem' } }}>
            {config.figureTitle}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.7, fontSize: '0.88rem', lineHeight: 1.48, maxWidth: 460 }}>
            {config.figureCaption}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'grid',
            placeItems: 'center',
            p: 1.3,
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.07)',
            bgcolor: 'rgba(2,6,23,0.34)',
          }}
        >
          <SectionFigure figure={config.figure} />
        </Box>

        <Stack direction="row" spacing={0.85} flexWrap="wrap" useFlexGap>
          {config.callouts.map((item) => (
            <MiniBadge key={`${title}-${item}`} text={item} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
