import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import { ComparisonCopy } from '../types';

export function FormulaLegend({ copy }: { copy: ComparisonCopy['formulaLegend'] }) {
  const symbolColors = ['#dbeafe', '#dcfce7', '#ede9fe', '#ede9fe', '#fef3c7', '#fee2e2'];
  const symbolBorders = ['#93c5fd', '#86efac', '#c4b5fd', '#c4b5fd', '#fcd34d', '#fca5a5'];

  return (
    <Card
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        border: '3px solid #1d3b70',
        bgcolor: '#fff',
        boxShadow: '0 18px 48px rgba(17, 24, 39, 0.12)',
      }}
    >
      <Chip
        label={copy.title}
        sx={{
          mb: 2.25,
          bgcolor: '#1d3b70',
          color: '#fff',
          fontWeight: 900,
          fontSize: '0.92rem',
          px: 0.8,
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          alignItems: 'stretch',
          gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1fr) 250px' },
        }}
      >
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' } }}>
          {copy.items.map((item, index) => (
            <Stack key={item.symbol} direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  minWidth: 58,
                  height: 58,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 2.5,
                  fontFamily: '"Times New Roman", serif',
                  fontSize: item.symbol === 'σ' ? '1.7rem' : '1.45rem',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  bgcolor: symbolColors[index],
                  border: `2px solid ${symbolBorders[index]}`,
                }}
              >
                {item.symbol}
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={900} sx={{ mb: 0.35 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.body}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>

        <Box
          sx={{
            borderRadius: 3,
            bgcolor: '#eaf3fa',
            border: '1px solid #d4e6f7',
            p: 2.25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Chip
            label={copy.domainBadge}
            sx={{
              alignSelf: 'center',
              mb: 1.5,
              bgcolor: '#1d3b70',
              color: '#fff',
              fontWeight: 800,
            }}
          />
          <Typography sx={{ fontFamily: '"Times New Roman", serif', fontSize: '1.35rem', fontStyle: 'italic', fontWeight: 700, mb: 1 }}>
            {copy.domainFormula}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {copy.domainBody}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
