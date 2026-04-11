import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { LessonRenderer } from '../../../features/lesson-renderer/LessonRenderer';
import { SummaryPanel } from '../../../features/summary-panel/SummaryPanel';
import { useI18n } from '../../../i18n/I18nProvider';
import { ExportSlide } from '../../../shared/components/ExportSlide';
import { getSetupLesson } from '../content';

export function SetupPage() {
  const { locale, t } = useI18n();
  const setupLesson = getSetupLesson(locale);

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <LessonRenderer lesson={setupLesson} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <ExportSlide title={t('setupPage.technicalGoalTitle')}>
              <Card>
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
            </ExportSlide>

            <ExportSlide title={t('setupPage.platformTracksTitle')}>
              <SummaryPanel
              title={t('setupPage.platformTracksTitle')}
              subtitle={t('setupPage.platformTracksSubtitle')}
              bullets={['CUDA', 'ROCm', 'Metal', 'CPU', 'Colab']}
            />
            </ExportSlide>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
