import { Alert, Stack, Typography } from '@mui/material';
import type { CalloutSection } from '../../../core/interfaces/Lesson';
import type { SectionProps } from './types';
import { MarkdownRenderer } from '../../../shared/components/MarkdownRenderer';

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
          <MarkdownRenderer content={section.body} variant="body1" />
        </Alert>
      </Stack>
    );
  }

  return (
    <Alert severity={severityMap[section.tone]}>
      <Typography variant="body2" sx={{ display: 'inline' }}>
        <strong>{section.title}:</strong> <MarkdownRenderer content={section.body} variant="body2" sx={{ display: 'inline' }} />
      </Typography>
    </Alert>
  );
}
