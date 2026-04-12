import { Box } from '@mui/material';
import { HeartRiskNeuralAnimation } from '../../../features/heart-risk-neural-animation/HeartRiskNeuralAnimation';
import { NeuralNetworkStepper } from '../../../features/neural-network-stepper/NeuralNetworkStepper';
import { PromptPlayground } from '../../../features/playground/PromptPlayground';
import { useI18n } from '../../../i18n/I18nProvider';
import { ExportSlide } from '../../../shared/components/ExportSlide';
import { SlideDeck } from '../../../shared/components/SlideDeck';
import type { LessonSection } from '../../../core/interfaces/Lesson';
import { getLessonOne } from '../content';

// Import shared section components
import { HeroSectionBlock } from '../../../features/lesson-renderer/sections/HeroSectionBlock';
import { TextSectionBlock } from '../../../features/lesson-renderer/sections/TextSectionBlock';
import { ListSectionBlock } from '../../../features/lesson-renderer/sections/ListSectionBlock';
import { CodeSectionBlock } from '../../../features/lesson-renderer/sections/CodeSectionBlock';
import { CheckpointSectionBlock } from '../../../features/lesson-renderer/sections/CheckpointSectionBlock';
import { CalloutSectionBlock } from '../../../features/lesson-renderer/sections/CalloutSectionBlock';
import { TimelineSectionBlock } from '../../../features/lesson-renderer/sections/TimelineSectionBlock';

export function LessonOnePage() {
  const { locale, t } = useI18n();
  const lesson = getLessonOne(locale);

  function renderGenericSection(s: LessonSection) {
    switch (s.type) {
      case 'hero': return <HeroSectionBlock section={s} variant="slide" />;
      case 'list': return <ListSectionBlock section={s} variant="slide" />;
      case 'text': return <TextSectionBlock section={s} variant="slide" />;
      case 'code': return <CodeSectionBlock section={s} variant="slide" />;
      case 'timeline': return <TimelineSectionBlock section={s} variant="slide" />;
      case 'callout': return <CalloutSectionBlock section={s} variant="slide" />;
      case 'checkpoint': return <CheckpointSectionBlock section={s} variant="slide" />;
      default: return null;
    }
  }

  return (
    <SlideDeck>
      {lesson.sections.map((section) => {
        // Intercalate interactive components at specific IDs
        const slides = [
          <ExportSlide key={section.id} title={section.title}>
            {renderGenericSection(section)}
          </ExportSlide>,
        ];

        if (section.id === 'nn-backprop') {
          slides.push(
            <ExportSlide key="stepper" title={t('pdf.slides.llmFlow')}>
              <Box sx={{ p: 2 }}>
                <NeuralNetworkStepper />
              </Box>
            </ExportSlide>
          );
        }

        if (section.id === 'first-code') {
          slides.push(
            <ExportSlide key="backprop-animation" title={t('pdf.slides.realBackprop')}>
              <Box sx={{ overflow: 'auto' }}>
                <HeartRiskNeuralAnimation />
              </Box>
            </ExportSlide>
          );
        }

        if (section.id === 'grand-finale') {
          slides.push(
            <ExportSlide key="playground" title={t('playground.title')}>
              <Box sx={{ p: 2 }}>
                <PromptPlayground />
              </Box>
            </ExportSlide>
          );
        }

        return slides;
      })}
    </SlideDeck>
  );
}
