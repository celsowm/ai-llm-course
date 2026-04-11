import { Alert, Stack, Typography } from '@mui/material';
import type { CalloutSection } from '../../../core/interfaces/Lesson';
import type { SectionProps } from './types';

export function CalloutSectionBlock({ section, variant }: SectionProps<CalloutSection>) {
  const severityMap = {
    info: 'info',
    success: 'success',
    warning: 'warning',
  } as const;

  if (variant === 'slide') {
    return (
      <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
        <Alert severity={severityMap[section.tone]} sx={{ fontSize: '1.2rem', '& .MuiAlert-message': { width: '100%' } }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {section.title}
          </Typography>
          <Typography variant="body1">{section.body}</Typography>
        </Alert>
      </Stack>
    );
  }

  return (
    <Alert severity={severityMap[section.tone]}>
      <strong>{section.title}:</strong> {section.body}
    </Alert>
  );
}
