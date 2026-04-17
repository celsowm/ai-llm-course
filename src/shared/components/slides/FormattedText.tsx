import { MarkdownRenderer } from '../MarkdownRenderer';

export function FormattedText({ text, variant = 'body1', color = 'text.secondary', sx = {} }: { text: string; variant?: any; color?: string; sx?: any }) {
  return (
    <MarkdownRenderer content={text} variant={variant} color={color} sx={sx} />
  );
}
