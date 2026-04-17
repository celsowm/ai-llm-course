import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { type ReactNode } from 'react';
import { HeartRiskNeuralAnimation } from '../../features/heart-risk-neural-animation/HeartRiskNeuralAnimation';
import { NeuralNetworkStepper } from '../../features/neural-network-stepper/NeuralNetworkStepper';
import { PromptPlayground } from '../../features/playground/PromptPlayground';
import { SummaryPanel } from '../../features/summary-panel/SummaryPanel';
import type { LessonSection } from '../../core/interfaces/Lesson';
import type { Topic } from '../../core/interfaces/Topic';
import type { Locale } from '../../i18n/types';
import { getMessages } from '../../i18n/messages';
import { getLessonOne } from '../../modules/lesson-1/content';
import { getSetupLesson } from '../../modules/setup/content';
import { SlideCallout, SlideCheckpoint, SlideCode, SlideHero, SlideList, SlideText, SlideTimeline } from '../components/slides/SlideTypes';

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

  const lesson1 = getLessonOne(locale);
  const setup = getSetupLesson(locale);

  const topics: Topic[] = [];

  // 1. Lesson 1 sections (part 1: before interactive slides)
  const coreSectionIds = [
    'what-is-ai',
    'ai-vs-traditional',
    'machine-learning',
    'nn-why-exists',
    'nn-neuron-overview',
    'nn-inputs',
    'nn-weights',
    'nn-bias',
    'nn-activation',
    'nn-formula',
    'nn-pytorch-neuron',
    'nn-layers',
    'nn-forward-pass',
    'nn-loss',
    'nn-backprop',
    'nn-many-epochs',
    'first-code',
  ];

  coreSectionIds.forEach((id) => {
    const section = lesson1.sections.find((s) => s.id === id);
    if (section) {
      topics.push({
        id: `l1-${section.id}`,
        title: section.title,
        path: `/${section.id}`,
        render: () => renderTopicSection(section),
      });
    }
  });

  // 2. Interactive topics from Lesson 1
  topics.push({
    id: 'l1-interactive-nn-flow',
    title: m.pdf.slides.llmFlow,
    path: '/nn-flow',
    render: () => (
      <Box sx={{ p: 2 }}>
        <NeuralNetworkStepper />
      </Box>
    ),
  });

  topics.push({
    id: 'l1-interactive-backprop',
    title: m.pdf.slides.realBackprop,
    path: '/real-backprop',
    render: () => (
      <Box sx={{ overflow: 'hidden', transform: { xs: 'scale(0.88)', md: 'scale(0.94)' }, transformOrigin: 'top center' }}>
        <HeartRiskNeuralAnimation />
      </Box>
    ),
  });

  topics.push({
    id: 'l1-interactive-playground',
    title: m.playground.title,
    path: '/playground',
    render: () => (
      <Box sx={{ p: 2 }}>
        <PromptPlayground />
      </Box>
    ),
  });

  // 3. Lesson 1 checkpoint
  const checkpoint = lesson1.sections.find((s) => s.id === 'checkpoint');
  if (checkpoint) {
    topics.push({
      id: `l1-${checkpoint.id}`,
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
            <Typography variant="body2" color="text.secondary">
              {t('setupPage.technicalGoalBody')}
            </Typography>
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
