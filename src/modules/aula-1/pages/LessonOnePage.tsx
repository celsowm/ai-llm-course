import { Box, Chip, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { HeartRiskNeuralAnimation } from '../../../features/heart-risk-neural-animation/HeartRiskNeuralAnimation';
import { NeuralNetworkStepper } from '../../../features/neural-network-stepper/NeuralNetworkStepper';
import { PromptPlayground } from '../../../features/playground/PromptPlayground';
import { useI18n } from '../../../i18n/I18nProvider';
import { ExportSlide } from '../../../shared/components/ExportSlide';
import { SlideDeck } from '../../../shared/components/SlideDeck';
import type { HeroSection, ListSection, TextSection, CheckpointSection } from '../../../core/interfaces/Lesson';
import { getLessonOne } from '../content';

function SlideHero({ s }: { s: HeroSection }) {
  return (
    <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
      {s.eyebrow && (
        <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ fontSize: '1rem', letterSpacing: '0.2em' }}>
          {s.eyebrow}
        </Typography>
      )}
      <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.1 }}>
        {s.title}
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, lineHeight: 1.8, maxWidth: 800 }}>
        {s.body}
      </Typography>
      {s.chips && (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {s.chips.map((c) => <Chip key={c} label={c} color="primary" variant="outlined" />)}
        </Stack>
      )}
    </Stack>
  );
}

function SlideList({ s }: { s: ListSection }) {
  return (
    <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1 }}>
        {s.title}
      </Typography>
      <List disablePadding>
        {s.items.map((item) => (
          <ListItem key={item} disableGutters sx={{ py: 1 }}>
            <ListItemText primary={item} primaryTypographyProps={{ sx: { fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.6 } }} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

function SlideText({ s }: { s: TextSection }) {
  return (
    <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1 }}>
        {s.title}
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, lineHeight: 1.9, maxWidth: 900 }}>
        {s.body}
      </Typography>
    </Stack>
  );
}

function SlideCheckpoint({ s }: { s: CheckpointSection }) {
  return (
    <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1 }}>
        {s.title}
      </Typography>
      <List disablePadding>
        {s.items.map((item) => (
          <ListItem key={item} disableGutters sx={{ py: 1 }}>
            <ListItemText primary={`✅ ${item}`} primaryTypographyProps={{ sx: { fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.6 } }} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

export function LessonOnePage() {
  const { locale, t } = useI18n();
  const lesson = getLessonOne(locale);

  const [whatIsAi, aiVsTraditional, machineLearning, neuralNetwork, , checkpoint] = lesson.sections;

  return (
    <SlideDeck>
      <ExportSlide title={whatIsAi.title}>
        <SlideHero s={whatIsAi as HeroSection} />
      </ExportSlide>

      <ExportSlide title={aiVsTraditional.title}>
        <SlideList s={aiVsTraditional as ListSection} />
      </ExportSlide>

      <ExportSlide title={machineLearning.title}>
        <SlideText s={machineLearning as TextSection} />
      </ExportSlide>

      <ExportSlide title={neuralNetwork.title}>
        <SlideList s={neuralNetwork as ListSection} />
      </ExportSlide>

      <ExportSlide title={t('pdf.slides.llmFlow')}>
        <Box sx={{ p: 2 }}>
          <NeuralNetworkStepper />
        </Box>
      </ExportSlide>

      <ExportSlide title={t('pdf.slides.realBackprop')}>
        <Box sx={{ overflow: 'auto' }}>
          <HeartRiskNeuralAnimation />
        </Box>
      </ExportSlide>

      <ExportSlide title={t('playground.title')}>
        <Box sx={{ p: 2 }}>
          <PromptPlayground />
        </Box>
      </ExportSlide>

      <ExportSlide title={checkpoint.title}>
        <SlideCheckpoint s={checkpoint as CheckpointSection} />
      </ExportSlide>
    </SlideDeck>
  );
}
