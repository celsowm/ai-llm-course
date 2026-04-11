import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface CodeBlockProps {
  language: string;
  caption: string;
  code: string;
  activeLines?: number[];
  annotations?: Record<number, string>;
}

type TokenType =
  | 'keyword'
  | 'string'
  | 'comment'
  | 'number'
  | 'function'
  | 'builtin'
  | 'decorator'
  | 'operator'
  | 'normal';

interface Token {
  text: string;
  type: TokenType;
}

const keywordSet = new Set([
  'from',
  'import',
  'if',
  'elif',
  'else',
  'for',
  'while',
  'return',
  'class',
  'def',
  'const',
  'let',
  'export',
  'default',
  'new',
  'in',
  'as',
  'with',
  'try',
  'except',
  'finally',
  'raise',
  'break',
  'continue',
  'True',
  'False',
  'None',
  'pass',
  'and',
  'or',
  'not',
]);

const builtinSet = new Set([
  'print',
  'range',
  'len',
  'enumerate',
  'sum',
  'float',
  'int',
  'max',
  'min',
  'round',
  'list',
  'map',
  'Math',
]);

const tokenColorMap: Record<TokenType, string> = {
  keyword: '#c4b5fd',
  string: '#86efac',
  comment: '#64748b',
  number: '#fdba74',
  function: '#7dd3fc',
  builtin: '#f9a8d4',
  decorator: '#facc15',
  operator: '#93c5fd',
  normal: '#e2e8f0',
};

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function tokenizeLine(line: string): Token[] {
  const trimmed = line.trimStart();

  if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
    return [{ text: line, type: 'comment' }];
  }

  const parts = line.split(
    /(\s+|#[^\n]*|\/\/[^\n]*|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\b\d+(?:\.\d+)?\b|@[A-Za-z_][A-Za-z0-9_]*|==|!=|<=|>=|=>|\+\=|\-\=|\*\=|\/\=|\*\*|[()[\]{}:.,=+\-*/<>]|\b[A-Za-z_][A-Za-z0-9_]*\b)/g,
  );

  return parts
    .filter((part) => part !== '')
    .map((part, index, arr) => {
      if (/^\s+$/.test(part)) return { text: part, type: 'normal' } satisfies Token;
      if (/^#[^\n]*$|^\/\/[^\n]*$/.test(part)) return { text: part, type: 'comment' } satisfies Token;
      if (/^"(?:\\.|[^"])*"$|^'(?:\\.|[^'])*'$/.test(part)) return { text: part, type: 'string' } satisfies Token;
      if (/^\d+(?:\.\d+)?$/.test(part)) return { text: part, type: 'number' } satisfies Token;
      if (/^@[A-Za-z_][A-Za-z0-9_]*$/.test(part)) return { text: part, type: 'decorator' } satisfies Token;
      if (/^(==|!=|<=|>=|=>|\+\=|\-\=|\*\=|\/\=|\*\*|[()[\]{}:.,=+\-*/<>])$/.test(part)) {
        return { text: part, type: 'operator' } satisfies Token;
      }
      if (keywordSet.has(part)) return { text: part, type: 'keyword' } satisfies Token;
      if (builtinSet.has(part)) return { text: part, type: 'builtin' } satisfies Token;

      const next = arr[index + 1];
      if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(part) && next === '(') {
        return { text: part, type: 'function' } satisfies Token;
      }

      return { text: part, type: 'normal' } satisfies Token;
    });
}

function renderLine(
  line: string,
  index: number,
  activeLines: Set<number>,
  annotations?: Record<number, string>,
): ReactNode {
  const lineNo = index + 1;
  const active = activeLines.has(lineNo);
  const annotation = annotations?.[lineNo];
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
        borderLeft: active ? '2px solid rgba(125,211,252,0.9)' : '2px solid transparent',
        backgroundColor: active ? 'rgba(125,211,252,0.08)' : 'transparent',
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
        {tokens.map((token, tokenIndex) => (
          <Box
            component="span"
            key={`${index}-${tokenIndex}-${token.text}`}
            sx={{
              color: tokenColorMap[token.type],
              fontFamily:
                'ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, Liberation Mono, monospace',
              whiteSpace: 'pre-wrap',
            }}
            dangerouslySetInnerHTML={{ __html: escapeHtml(token.text) }}
          />
        ))}
        {annotation ? (
          <Box
            component="span"
            sx={{
              ml: 1,
              color: active ? 'rgba(250,204,21,0.9)' : 'rgba(250,204,21,0.45)',
              fontFamily:
                'ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, Liberation Mono, monospace',
            }}
          >
            {annotation}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export function CodeBlock({ language, caption, code, activeLines = [], annotations }: CodeBlockProps) {
  const lines = code.split('\n');
  const activeLineSet = new Set(activeLines);

  return (
    <Box
      sx={{
        bgcolor: '#08111f',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 2,
          py: 1.2,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.02)',
        }}
      >
        <Typography variant="subtitle2" fontWeight={800}>
          {caption}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {language}
        </Typography>
      </Stack>

      <Box
        component="pre"
        sx={{
          m: 0,
          p: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          fontSize: 12,
          lineHeight: 1.5,
          maxHeight: 440,
        }}
      >
        {lines.map((line, index) => renderLine(line, index, activeLineSet, annotations))}
      </Box>
    </Box>
  );
}
