import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { BiologicalComputationalNeuronSlide } from '../../features/biological-computational-neuron-slide/BiologicalComputationalNeuronSlide';
import { type ReactNode } from 'react';
import { HeartRiskNeuralAnimation } from '../../features/heart-risk-neural-animation/HeartRiskNeuralAnimation';
import { NeuralNetworkStepper } from '../../features/neural-network-stepper/NeuralNetworkStepper';
import { RegressionVsSigmoidSlide } from '../../features/regression-vs-sigmoid-slide/RegressionVsSigmoidSlide';
import { PromptPlayground } from '../../features/playground/PromptPlayground';
import { SummaryPanel } from '../../features/summary-panel/SummaryPanel';
import type { LessonSection } from '../../core/interfaces/Lesson';
import type { Topic } from '../../core/interfaces/Topic';
import type { Locale } from '../../i18n/types';
import { getMessages } from '../../i18n/messages';
import { getFundamentalsModule } from '../../modules/fundamentals/content';
import { getSetupModule } from '../../modules/setup/content';
import { SlideCallout, SlideCheckpoint, SlideCode, SlideHero, SlideList, SlideText, SlideTimeline } from '../components/slides/SlideTypes';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

function renderTopicSection(section: LessonSection): ReactNode {
  switch (section.type) {
    case 'hero':
      return <SlideHero s={section} />;
    case 'text':
      return <SlideText s={section} />;
    case 'list':
      return <SlideList s={section} />;
    case 'code':
      return <SlideCode s={section} />;
    case 'checkpoint':
      return <SlideCheckpoint s={section} />;
    case 'timeline':
      return <SlideTimeline s={section} />;
    case 'callout':
      return <SlideCallout s={section} />;
    default:
      return null;
  }
}

export function getTopics(locale: Locale): Topic[] {
  const m = getMessages(locale);
  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = m;
    for (const k of keys) {
      if (!result) return key;
      result = result[k];
    }
    return result || key;
  };

  const fundamentals = getFundamentalsModule(locale);
  const setup = getSetupModule(locale);

  const topics: Topic[] = [];

  // 1. Fundamentals sections
  const coreSectionIdsBeforeComparison = [
    'timeline',
    'what-is-ai',
    'evolution',
    'ai-vs-traditional',
    'machine-learning',
    'nn-why-exists',
    'nn-neuron-overview',
    'nn-inputs',
    'nn-weights',
    'nn-bias',
    'nn-activation',
  ];

  const coreSectionIdsAfterComparison = [
    'nn-formula',
    'nn-pytorch-neuron',
    'nn-layers',
    'nn-forward-pass',
    'nn-loss',
    'nn-backprop',
    'nn-many-epochs',
    'first-code',
  ];

  coreSectionIdsBeforeComparison.forEach((id) => {
    const section = fundamentals.sections.find((s) => s.id === id);
    if (section) {
      topics.push({
        id: `fund-${section.id}`,
        title: section.title,
        path: `/${section.id}`,
        render: () => renderTopicSection(section),
      });
    }
  });

  topics.push({
    id: 'fund-biological-vs-computational-neuron',
    title: m.pdf.slides.biologicalVsComputationalNeuron,
    path: '/biological-vs-computational-neuron',
    render: () => <BiologicalComputationalNeuronSlide />,
  });

  topics.push({
    id: 'fund-linear-vs-sigmoid',
    title: m.pdf.slides.linearVsSigmoid,
    path: '/linear-vs-sigmoid',
    render: () => <RegressionVsSigmoidSlide />,
  });

  coreSectionIdsAfterComparison.forEach((id) => {
    const section = fundamentals.sections.find((s) => s.id === id);
    if (section) {
      topics.push({
        id: `fund-${section.id}`,
        title: section.title,
        path: `/${section.id}`,
        render: () => renderTopicSection(section),
      });
    }
  });

  // 2. Interactive topics from Fundamentals
  topics.push({
    id: 'fund-interactive-nn-flow',
    title: m.pdf.slides.llmFlow,
    path: '/nn-flow',
    render: () => (
      <Box sx={{ p: 2 }}>
        <NeuralNetworkStepper />
      </Box>
    ),
  });

  topics.push({
    id: 'fund-interactive-backprop',
    title: m.pdf.slides.realBackprop,
    path: '/real-backprop',
    render: () => (
      <Box sx={{ overflow: 'hidden', transform: { xs: 'scale(0.88)', md: 'scale(0.94)' }, transformOrigin: 'top center' }}>
        <HeartRiskNeuralAnimation />
      </Box>
    ),
  });

  topics.push({
    id: 'fund-interactive-playground',
    title: m.playground.title,
    path: '/playground',
    render: () => (
      <Box sx={{ p: 2 }}>
        <PromptPlayground />
      </Box>
    ),
  });

  // 3. Fundamentals checkpoint
  const checkpoint = fundamentals.sections.find((s) => s.id === 'checkpoint');
  if (checkpoint) {
    topics.push({
      id: `fund-${checkpoint.id}`,
      title: checkpoint.title,
      path: `/${checkpoint.id}`,
      render: () => renderTopicSection(checkpoint),
    });
  }

  // 4. Setup topics
  topics.push({
    id: 'setup-technical-goal',
    title: t('setupPage.technicalGoalTitle'),
    path: '/technical-goal',
    render: () => (
      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <BuildRoundedIcon color="primary" />
              <Typography variant="h3">{t('setupPage.technicalGoalTitle')}</Typography>
            </Stack>
            <MarkdownRenderer content={t('setupPage.technicalGoalBody')} variant="body2" color="text.secondary" />
            <Stack direction="row" spacing={1.2} alignItems="center">
              <MemoryRoundedIcon color="secondary" />
              <Typography variant="body2">{t('setupPage.focusLine')}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    ),
  });

  topics.push({
    id: 'setup-platform-tracks',
    title: t('setupPage.platformTracksTitle'),
    path: '/platform-tracks',
    render: () => (
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <SummaryPanel
          title={t('setupPage.platformTracksTitle')}
          subtitle={t('setupPage.platformTracksSubtitle')}
          bullets={['CUDA', 'ROCm', 'Metal', 'CPU', 'Colab']}
        />
      </Box>
    ),
  });

  setup.sections.forEach((section) => {
    topics.push({
      id: `setup-${section.id}`,
      title: section.title,
      path: `/setup-${section.id}`,
      render: () => renderTopicSection(section),
    });
  });

  return topics;
}
