import { useI18n } from './I18nProvider';
import { MarkdownRenderer } from '../shared/components/MarkdownRenderer';

interface TransProps {
  i18nKey: string;
  params?: Record<string, string | number>;
  variant?: any;
  color?: string;
  sx?: any;
}

export function Trans({ i18nKey, params, variant, color, sx }: TransProps) {
  const { t } = useI18n();
  const content = t(i18nKey, params);
  
  return (
    <MarkdownRenderer content={content} variant={variant} color={color} sx={sx} />
  );
}
