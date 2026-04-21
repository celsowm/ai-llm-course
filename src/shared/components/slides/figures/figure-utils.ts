import { VisualTone } from '../../../../core/interfaces/Lesson';

export const toneColor = {
  primary: '#60a5fa',
  secondary: '#a78bfa',
  success: '#34d399',
  warning: '#f59e0b',
} as const satisfies Record<VisualTone, string>;

export const toneFill = {
  primary: 'rgba(96,165,250,0.14)',
  secondary: 'rgba(167,139,250,0.14)',
  success: 'rgba(52,211,153,0.14)',
  warning: 'rgba(245,158,11,0.14)',
} as const satisfies Record<VisualTone, string>;

export function resolveAssetPath(src: string) {
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src;
  }

  return `${import.meta.env.BASE_URL}${src}`;
}

export function wrapWords(text: string, maxChars = 14) {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}
