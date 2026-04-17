import { Box, Typography } from '@mui/material';
import { BlockMath, InlineMath } from 'react-katex';

export function FormattedText({ text, variant = 'body1', color = 'text.secondary', sx = {} }: { text: string; variant?: any; color?: string; sx?: any }) {
  // Simple parser for **bold** and $$math$$ and $inline$
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$|\*\*.*?\*\*)/g);

  return (
    <Typography variant={variant} color={color} sx={{ ...sx }}>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          return <BlockMath key={i} math={math} />;
        }
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return <InlineMath key={i} math={math} />;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          const bold = part.slice(2, -2);
          return <Box component="span" key={i} sx={{ fontWeight: 800, color: 'text.primary' }}>{bold}</Box>;
        }
        return <span key={i}>{part}</span>;
      })}
    </Typography>
  );
}
