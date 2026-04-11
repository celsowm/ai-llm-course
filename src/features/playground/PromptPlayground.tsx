import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';

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

  const response = useMemo(() => pickResponse(submittedPrompt, responses), [submittedPrompt, responses]);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <AutoAwesomeRoundedIcon color="primary" />
            <Box>
              <Typography variant="h3">{t('playground.title')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {t('playground.subtitle')}
              </Typography>
            </Box>
          </Stack>

          <Alert severity="info">{t('playground.alert')}</Alert>

          <TextField
            label={t('playground.inputLabel')}
            multiline
            minRows={3}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={t('playground.inputPlaceholder')}
            fullWidth
          />

          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" endIcon={<SendRoundedIcon />} onClick={() => setSubmittedPrompt(prompt)}>
              {t('playground.submit')}
            </Button>
          </Stack>

          <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'background.default', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {t('playground.responseTitle')}
            </Typography>
            <Typography variant="body1">{response}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
