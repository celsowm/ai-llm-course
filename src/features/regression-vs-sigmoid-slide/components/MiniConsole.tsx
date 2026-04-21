import { Box, Typography } from '@mui/material';

export function MiniConsole({
  title,
  text,
  accent,
}: {
  title: string;
  text: string;
  accent: string;
}) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 3,
        border: `1px solid ${accent}33`,
        bgcolor: 'rgba(2,6,23,0.92)',
        color: '#e2e8f0',
        height: { xs: 176, md: 208 },
        minHeight: 176,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Typography variant="subtitle2" fontWeight={900} sx={{ color: accent, mb: 1 }}>
        {title}
      </Typography>
      <Box
        component="pre"
        sx={{
          flex: 1,
          minHeight: 0,
          m: 0,
          color: '#d1fae5',
          fontSize: 12.5,
          lineHeight: 1.55,
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          scrollbarGutter: 'stable',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
        }}
      >
        {text}
      </Box>
    </Box>
  );
}
