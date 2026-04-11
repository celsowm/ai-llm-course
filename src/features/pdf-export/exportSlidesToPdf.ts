
import type { jsPDF as JsPdfInstance } from 'jspdf';

interface ExportSlidesOptions {
  rootSelector?: string;
  fileName: string;
  documentTitle: string;
  locale: string;
}

function safeFileName(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function addFooter(doc: JsPdfInstance, pageWidth: number, pageHeight: number, text: string) {
  doc.setFontSize(10);
  doc.setTextColor(140, 148, 163);
  doc.text(text, pageWidth - 14, pageHeight - 10, { align: 'right' });
}

export async function exportSlidesToPdf({
  rootSelector = '[data-export-root="true"]',
  fileName,
  documentTitle,
  locale,
}: ExportSlidesOptions) {
  const root = document.querySelector<HTMLElement>(rootSelector);
  if (!root) {
    throw new Error('PDF export root not found.');
  }

  const slideElements = Array.from(root.querySelectorAll<HTMLElement>('[data-export-slide="true"]'));
  if (slideElements.length === 0) {
    throw new Error('No export slides found.');
  }

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const imageMaxWidth = pageWidth - margin * 2;
  const imageMaxHeight = pageHeight - 22;

  for (const [index, slide] of slideElements.entries()) {
    const canvas = await html2canvas(slide, {
      backgroundColor: '#0b1220',
      scale: Math.min(2, window.devicePixelRatio || 1.5),
      useCORS: true,
      logging: false,
      windowWidth: document.documentElement.clientWidth,
      onclone(clonedDocument) {
        const clonedBody = clonedDocument.body;
        clonedBody.style.background = '#06070e';
      },
    });

    const imageData = canvas.toDataURL('image/png');
    const widthRatio = imageMaxWidth / canvas.width;
    const heightRatio = imageMaxHeight / canvas.height;
    const ratio = Math.min(widthRatio, heightRatio);
    const renderWidth = canvas.width * ratio;
    const renderHeight = canvas.height * ratio;
    const offsetX = (pageWidth - renderWidth) / 2;
    const offsetY = 10;

    if (index > 0) {
      pdf.addPage('a4', 'landscape');
    }

    pdf.setFillColor(6, 7, 14);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    pdf.setTextColor(226, 232, 240);
    pdf.setFontSize(16);
    pdf.text(documentTitle, margin, 8);

    pdf.addImage(imageData, 'PNG', offsetX, offsetY + 4, renderWidth, renderHeight, undefined, 'FAST');

    const slideTitle = slide.dataset.exportTitle || `slide-${index + 1}`;
    addFooter(pdf, pageWidth, pageHeight, `${slideTitle} · ${locale} · ${index + 1}/${slideElements.length}`);
  }

  pdf.save(`${safeFileName(fileName)}.pdf`);
}
