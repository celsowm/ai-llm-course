import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';

interface SummaryPanelProps {
  title: string;
  subtitle: string;
  bullets: string[];
}

export function SummaryPanel({ title, subtitle, bullets }: SummaryPanelProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <div>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </div>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {bullets.map((bullet) => (
              <Chip key={bullet} label={bullet} variant="outlined" />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}