import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Typography, Box, Link } from '@mui/material';

interface MarkdownRendererProps {
  content: string;
  variant?: any;
  color?: string;
  sx?: any;
}

export function MarkdownRenderer({ content, variant = 'body1', color = 'text.secondary', sx = {} }: MarkdownRendererProps) {
  return (
    <Box sx={{ ...sx }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => (
            <Typography variant={variant} color={color} sx={{ display: 'block', mb: 2, '&:last-child': { mb: 0 } }}>
              {children}
            </Typography>
          ),
          strong: ({ children }) => (
            <Box component="span" sx={{ fontWeight: 800, color: 'text.primary' }}>
              {children}
            </Box>
          ),
          em: ({ children }) => (
            <Box component="span" sx={{ fontStyle: 'italic' }}>
              {children}
            </Box>
          ),
          a: ({ href, children }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </Link>
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 2, my: 1 }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ pl: 2, my: 1 }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Box component="li" sx={{ mb: 0.5 }}>
              <Typography variant={variant} color={color}>
                {children}
              </Typography>
            </Box>
          ),
          code: ({ children }) => (
            <Box
              component="code"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                px: 0.5,
                borderRadius: 1,
                fontFamily: 'monospace',
              }}
            >
              {children}
            </Box>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
