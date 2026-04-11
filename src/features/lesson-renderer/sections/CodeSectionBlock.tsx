import { Box, Stack, Typography } from '@mui/material';
import type { CodeSection } from '../../../core/interfaces/Lesson';
import { CodeBlock } from '../../code-block/CodeBlock';
import type { SectionProps } from './types';

export function CodeSectionBlock({ section, variant }: SectionProps<CodeSection>) {
  if (variant === 'slide') {
    return (
      <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1 }}>
          {section.title}
        </Typography>
        <Box sx={{ maxWidth: 1000 }}>
          <CodeBlock language={section.language} caption={section.caption} code={section.code} />
        </Box>
      </Stack>
    );
  }

  return (
    <Stack spacing={1.25}>
      <Typography variant="h3">{section.title}</Typography>
      <CodeBlock language={section.language} caption={section.caption} code={section.code} />
    </Stack>
  );
}
