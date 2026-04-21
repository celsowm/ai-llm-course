import { Box, Typography } from '@mui/material';

export function MetricRow({
  label,
  value,
  accent,
  testId,
  valueTestId,
}: {
  label: string;
  value: string;
  accent: string;
  testId?: string;
  valueTestId?: string;
}) {
  return (
    <Box
      data-testid={testId}
      sx={{
        p: 1.25,
        borderRadius: 2.5,
        border: `1px solid ${accent}33`,
        bgcolor: `${accent}14`,
        color: '#0f172a',
      }}
    >
      <Typography variant="caption" sx={{ display: 'block', color: 'rgba(15,23,42,0.72)' }}>
        {label}
      </Typography>
      <Typography variant="subtitle1" fontWeight={900} sx={{ lineHeight: 1.15, color: '#0f172a' }} data-testid={valueTestId}>
        {value}
      </Typography>
    </Box>
  );
}
