export type TokenType =
  | 'keyword'
  | 'string'
  | 'comment'
  | 'number'
  | 'function'
  | 'builtin'
  | 'decorator'
  | 'operator'
  | 'normal';

export interface Token {
  text: string;
  type: TokenType;
}

const keywordSet = new Set([
  'from', 'import', 'if', 'elif', 'else', 'for', 'while', 'return',
  'class', 'def', 'const', 'let', 'export', 'default', 'new', 'in',
  'as', 'with', 'try', 'except', 'finally', 'raise', 'break',
  'continue', 'True', 'False', 'None', 'pass', 'and', 'or', 'not',
]);

const builtinSet = new Set([
  'print', 'range', 'len', 'enumerate', 'sum', 'float', 'int',
  'max', 'min', 'round', 'list', 'map', 'Math',
]);

export const tokenColorMap: Record<TokenType, string> = {
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

export function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function tokenizeLine(line: string): Token[] {
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
