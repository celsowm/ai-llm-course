import { List, ListItem, Stack, Typography, Card, CardContent } from '@mui/material';
import type { CheckpointSection } from '../../../core/interfaces/Lesson';
import type { SectionProps } from './types';
import { MarkdownRenderer } from '../../../shared/components/MarkdownRenderer';

export function CheckpointSectionBlock({ section, variant }: SectionProps<CheckpointSection>) {
  if (variant === 'slide') {
    return (
      <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1 }}>
          {section.title}
        </Typography>
        <List disablePadding>
          {section.items.map((item, idx) => (
            <ListItem key={idx} disableGutters sx={{ py: 1, display: 'block' }}>
              <MarkdownRenderer 
                content={`✅ ${item}`} 
                variant="body1"
                sx={{ '& p': { fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.6 } }}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          {section.title}
        </Typography>

        <List disablePadding>
          {section.items.map((item, idx) => (
            <ListItem key={idx} disableGutters sx={{ py: 0.65, display: 'block' }}>
              <MarkdownRenderer content={item} variant="body1" />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
