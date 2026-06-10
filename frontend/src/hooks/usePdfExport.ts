import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportPdf = async (elementId: string, filename: string) => {
    try {
      setIsExporting(true);
      const element = document.getElementById(elementId);
      if (!element) throw new Error(`Element with id ${elementId} not found`);

      // Temporarily modify styles for better PDF rendering
      const originalStyle = element.style.cssText;
      element.style.backgroundColor = '#ffffff';
      element.style.padding = '20px';

      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true, // Allow loading cross-origin images (like Cloudinary)
        logging: false,
      });

      // Restore styles
      element.style.cssText = originalStyle;

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${filename}.pdf`);
      
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return { exportPdf, isExporting };
}
