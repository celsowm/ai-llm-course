import { Box, Stack, Typography, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';
import type { CodeAnnotation } from '../../core/interfaces/Lesson';
import { Token, tokenColorMap, escapeHtml, tokenizeLine } from './tokenizer';

interface CodeBlockProps {
  language: string;
  caption: string;
  code: string;
  activeLines?: number[];
  annotations?: CodeAnnotation[] | Record<number, string>;
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#1a103d',
    color: '#fff',
    fontSize: 13,
    border: '1px solid #8b5cf6',
    borderRadius: 8,
    padding: '8px 12px',
    boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
    fontFamily: 'Sora, sans-serif',
    maxWidth: 300,
    lineHeight: 1.5,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#1a103d',
    '&::before': {
      border: '1px solid #8b5cf6',
      backgroundColor: '#1a103d',
    },
  },
}));

const GlowSpan = styled('span')<{ active?: boolean; annotated?: boolean }>(({ active, annotated }) => ({
  transition: 'all 200ms ease',
  borderRadius: 4,
  padding: '0 2px',
  cursor: annotated ? 'help' : 'inherit',
  '&:hover': annotated ? {
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    boxShadow: '0 0 8px rgba(139, 92, 246, 0.5)',
    color: '#fff !important',
  } : {},
  ...(active && {
    backgroundColor: 'rgba(125,211,252,0.12)',
    boxShadow: '0 0 4px rgba(125,211,252,0.2)',
  }),
}));

function renderAnnotatedContent(
  line: string,
  tokens: Token[],
  lineAnnotations: CodeAnnotation[],
  active: boolean,
): ReactNode {
  // If no annotations, just render tokens
  if (lineAnnotations.length === 0) {
    return (
      <GlowSpan active={active}>
        {tokens.map((token, i) => (
          <Box
            component="span"
            key={i}
            sx={{
              color: tokenColorMap[token.type],
              fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, Liberation Mono, monospace',
            }}
            dangerouslySetInnerHTML={{ __html: escapeHtml(token.text) }}
          />
        ))}
      </GlowSpan>
    );
  }

  const fullLineAnno = lineAnnotations.find(a => !a.substring);
  const substringAnnos = lineAnnotations.filter(a => a.substring);

  // If there's a full line annotation, it takes precedence for the glow/tooltip
  if (fullLineAnno) {
    return (
      <StyledTooltip title={fullLineAnno.explanation} arrow placement="top-start">
        <GlowSpan active={active} annotated={true}>
          {tokens.map((token, i) => (
            <Box
              component="span"
              key={i}
              sx={{
                color: tokenColorMap[token.type],
                fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, Liberation Mono, monospace',
              }}
              dangerouslySetInnerHTML={{ __html: escapeHtml(token.text) }}
            />
          ))}
        </GlowSpan>
      </StyledTooltip>
    );
  }

  // Handle substring annotations
  // For each token, we check if it matches or contains a substring from annotations
  let charOffset = 0;
  return (
    <GlowSpan active={active}>
      {tokens.map((token, tokenIdx) => {
        const tokenStart = charOffset;
        const tokenEnd = charOffset + token.text.length;
        charOffset = tokenEnd;

        // Check if any substring annotation overlaps with this token
        const matchingAnno = substringAnnos.find(a => {
          const sub = a.substring!;
          const subIdx = line.indexOf(sub); // Simplification: first match
          if (subIdx === -1) return false;
          const subEnd = subIdx + sub.length;
          return tokenStart < subEnd && tokenEnd > subIdx;
        });

        const tokenContent = (
          <Box
            component="span"
            key={tokenIdx}
            sx={{
              color: tokenColorMap[token.type],
              fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, Liberation Mono, monospace',
            }}
            dangerouslySetInnerHTML={{ __html: escapeHtml(token.text) }}
          />
        );

        if (matchingAnno) {
          return (
            <StyledTooltip key={tokenIdx} title={matchingAnno.explanation} arrow placement="top">
              <GlowSpan annotated={true} sx={{ display: 'inline-block' }}>
                {tokenContent}
              </GlowSpan>
            </StyledTooltip>
          );
        }

        return tokenContent;
      })}
    </GlowSpan>
  );
}

function renderLine(
  line: string,
  index: number,
  activeLines: Set<number>,
  allAnnotations: CodeAnnotation[],
): ReactNode {
  const lineNo = index + 1;
  const active = activeLines.has(lineNo);
  
  const lineAnnotations = allAnnotations.filter(a => {
    if (a.line === lineNo) return true;
    if (a.lines && lineNo >= a.lines[0] && lineNo <= a.lines[1]) return true;
    return false;
  });

  const isEmpty = line.trim() === '';

  if (isEmpty && !active) {
    return <Box key={`${index}-empty`} sx={{ height: '0.6em' }} />;
  }

  const tokens = tokenizeLine(line);

  return (
    <Box
      key={`${index}-${line}`}
      sx={{
        display: 'grid',
        gridTemplateColumns: '36px 1fr',
        gap: 1,
        px: 1,
        py: 0.15,
        borderLeft: active ? '2px solid #7dd3fc' : '2px solid transparent',
        backgroundColor: active ? 'rgba(125,211,252,0.05)' : 'transparent',
        transition: 'all 180ms ease',
      }}
    >
      <Typography
        component="span"
        sx={{
          color: active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.24)',
          userSelect: 'none',
          textAlign: 'right',
          fontFamily:
            'ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, Liberation Mono, monospace',
        }}
      >
        {lineNo}
      </Typography>

      <Box component="span" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {renderAnnotatedContent(line, tokens, lineAnnotations, active)}
      </Box>
    </Box>
  );
}

export function CodeBlock({ language, caption, code, activeLines = [], annotations = [] }: CodeBlockProps) {
  const lines = code.split('\n');
  const activeLineSet = new Set(activeLines);

  // Normalize annotations to CodeAnnotation[]
  const normalizedAnnotations: CodeAnnotation[] = Array.isArray(annotations)
    ? annotations
    : Object.entries(annotations).map(([line, explanation]) => ({
        line: Number(line),
        explanation,
      }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0a051d', // Slightly darker synthwave background
        border: '1px solid rgba(139, 92, 246, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
        maxHeight: { xs: 320, md: 450, lg: 550 },
        color: '#e2e8f0',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 2,
          py: 1,
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          flexShrink: 0,
        }}
      >
        <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#c4b5fd', letterSpacing: '0.02em' }}>
          {caption}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(196, 181, 253, 0.6)', fontWeight: 600, textTransform: 'uppercase' }}>
          {language}
        </Typography>
      </Stack>

      <Box
        component="pre"
        sx={{
          m: 0,
          p: 1.5,
          overflow: 'auto',
          minHeight: 0,
          flex: 1,
          fontSize: 13,
          lineHeight: 1.6,
          scrollbarGutter: 'stable',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(139, 92, 246, 0.3)',
            borderRadius: '4px',
          },
        }}
      >
        {lines.map((line, index) => renderLine(line, index, activeLineSet, normalizedAnnotations))}
      </Box>
    </Box>
  );
}
