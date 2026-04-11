import { List, ListItem, ListItemText, Stack, Typography, Card, CardContent } from '@mui/material';
import type { ListSection } from '../../../core/interfaces/Lesson';
import type { SectionProps } from './types';

export function ListSectionBlock({ section, variant }: SectionProps<ListSection>) {
  if (variant === 'slide') {
    return (
      <Stack spacing={4} sx={{ p: { xs: 4, md: 8 }, minHeight: 400, justifyContent: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1 }}>
          {section.title}
        </Typography>
        <List disablePadding>
          {section.items.map((item, idx) => {
            const text = typeof item === 'string' ? item : item.text;
            const isEmphasis = typeof item === 'string' ? false : !!item.isEmphasis;

            return (
              <ListItem key={idx} disableGutters sx={{ py: 1 }}>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: { xs: '1.1rem', md: '1.35rem' },
                      lineHeight: 1.6,
                      fontWeight: isEmphasis ? 800 : 400,
                      color: isEmphasis ? 'primary.light' : 'inherit',
                    },
                  }}
                />
              </ListItem>
            );
          })}
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
          {section.items.map((item, idx) => {
            const text = typeof item === 'string' ? item : item.text;
            const isEmphasis = typeof item === 'string' ? false : !!item.isEmphasis;

            return (
              <ListItem key={idx} disableGutters sx={{ py: 0.65 }}>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontWeight: isEmphasis ? 800 : 400,
                    color: isEmphasis ? 'primary.main' : 'inherit',
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
