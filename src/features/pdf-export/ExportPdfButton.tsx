
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import { Button, CircularProgress } from '@mui/material';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';
import { getNavigationItems } from '../../shared/content/navigation';
import { exportSlidesToPdf } from './exportSlidesToPdf';

export function ExportPdfButton() {
  const [isExporting, setIsExporting] = useState(false);
  const location = useLocation();
  const { locale, t } = useI18n();
  const items = useMemo(() => getNavigationItems(locale), [locale]);
  const currentItem = useMemo(
    () => items.find((item) => item.path === location.pathname) ?? items[0],
    [items, location.pathname],
  );

  async function handleExport() {
    try {
      setIsExporting(true);
      await exportSlidesToPdf({
        fileName: `${currentItem.id}-${locale}`,
        documentTitle: `${currentItem.label} · ai-llm-course`,
        locale,
      });
    } finally {
      setIsExporting(false);
    }
  }

  const labelText = isExporting ? t('pdf.exporting') : t('pdf.downloadCurrent');

  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={handleExport}
      disabled={isExporting}
      aria-label={labelText}
      startIcon={
        isExporting ? <CircularProgress size={18} color="inherit" /> : <PictureAsPdfRoundedIcon />
      }
    >
      {labelText}
    </Button>
  );
}
