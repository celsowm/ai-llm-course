import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState, useTransition } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { Trans } from '../../i18n/Trans';
import { MarkdownRenderer } from '../../shared/components/MarkdownRenderer';

function pickResponse(prompt: string, responses: Record<string, string>): string {
  const normalized = prompt.trim().toLowerCase();

  if (normalized.includes('transformer')) return responses.transformer;
  if (normalized.includes('python')) return responses.python;
  if (normalized.includes('cuda')) return responses.cuda;
  return responses.fallback;
}

export function PromptPlayground() {
  const { t, tm } = useI18n();
  const responses = tm<Record<string, string>>('playground.responses');
  const initialPrompt = t('playground.initialPrompt');

  const [prompt, setPrompt] = useState(initialPrompt);
  const [submittedPrompt, setSubmittedPrompt] = useState(initialPrompt);
  const [isPending, startTransition] = useTransition();

  const response = useMemo(() => pickResponse(submittedPrompt, responses), [submittedPrompt, responses]);

  const handleSubmit = () => {
    startTransition(async () => {
      // 600ms async delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmittedPrompt(prompt);
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      if (!isPending) {
        handleSubmit();
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <AutoAwesomeRoundedIcon color="primary" />
            <Box>
              <Typography variant="h3">{t('playground.title')}</Typography>
              <Trans i18nKey="playground.subtitle" variant="body2" color="text.secondary" />
            </Box>
          </Stack>

          <Alert severity="info">
            <Trans i18nKey="playground.alert" variant="body2" />
          </Alert>

          <TextField
            label={t('playground.inputLabel')}
            multiline
            minRows={3}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('playground.inputPlaceholder')}
            helperText={isPending ? t('playground.sendingText') : t('playground.helperText')}
            disabled={isPending}
            fullWidth
          />

          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              endIcon={isPending ? <CircularProgress size={16} color="inherit" /> : <SendRoundedIcon />}
              onClick={handleSubmit}
              disabled={isPending}
            >
              {t('playground.submit')}
            </Button>
          </Stack>

          <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'background.default', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {t('playground.responseTitle')}
            </Typography>
            <MarkdownRenderer content={isPending ? t('common.waiting') : response} variant="body1" />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
