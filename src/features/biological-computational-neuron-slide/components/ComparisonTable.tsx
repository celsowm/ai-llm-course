import { Box, Typography } from '@mui/material';

const tableHeaderSx = {
  py: 1.2,
  px: 1.25,
  color: '#fff',
  fontWeight: 800,
  fontSize: '0.77rem',
  textAlign: 'center',
  borderRight: '1px solid rgba(255,255,255,0.3)',
  '&:last-of-type': { borderRight: 'none' },
};

const tableCellSx = {
  py: 1.25,
  px: 1.1,
  minHeight: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#23324d',
  fontWeight: 700,
  borderRight: '1px solid rgba(255,255,255,0.88)',
  borderBottom: '1px solid rgba(255,255,255,0.88)',
  '&:nth-of-type(3n)': { borderRight: 'none' },
};

export function ComparisonTable({
  headers,
  rows,
  headerColors,
  cellColors,
}: {
  headers: [string, string, string];
  rows: Array<[string, string, string]>;
  headerColors: [string, string, string];
  cellColors: [string, string, string, string];
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid rgba(18, 26, 47, 0.08)',
      }}
    >
      {headers.map((header, index) => (
        <Box key={header} sx={{ ...tableHeaderSx, bgcolor: headerColors[index] }}>
          {header}
        </Box>
      ))}

      {rows.flatMap((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Box
            key={`${rowIndex}-${cellIndex}`}
            sx={{
              ...tableCellSx,
              bgcolor:
                rowIndex % 2 === 0
                  ? cellIndex === 1
                    ? cellColors[0]
                    : cellColors[1]
                  : cellIndex === 1
                    ? cellColors[2]
                    : cellColors[3],
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              {cell}
            </Typography>
          </Box>
        )),
      )}
    </Box>
  );
}
