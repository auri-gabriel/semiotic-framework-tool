/**
 * Service for generating PDF documents from HTML content
 */
export class PdfService {
  /**
   * Generates PDF using html2pdf library
   * @param {string} htmlContent - HTML content to convert
   * @param {string} filename - Name for the generated PDF file
   */
  static async generatePdf(htmlContent, filename) {
    const html2pdf = (await import('html2pdf.js')).default;

    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '-9999px';
    tempDiv.style.left = '-9999px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.width = '794px'; // A4 layout width

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Extract all styles from the HTML
    let styleContent = '';
    doc.head
      .querySelectorAll('style')
      .forEach((s) => (styleContent += s.innerHTML));

    tempDiv.innerHTML = `
      <style>${styleContent}</style>
      <div class="document-container">
        ${doc.body.innerHTML}
      </div>
    `;

    document.body.appendChild(tempDiv);

    // Wait for content to be ready and styles to be applied
    await new Promise((resolve) => setTimeout(resolve, 500));

    const options = {
      margin: [15, 15, 15, 15],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 1.5,
        useCORS: true,
        letterRendering: true,
        backgroundColor: '#ffffff',
        allowTaint: false,
        height: null,
        width: null,
        scrollX: 0,
        scrollY: 0,
        onrendered: function () {
          // Additional processing if needed
        },
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true,
      },
      pagebreak: {
        mode: ['avoid-all', 'css'],
        before: '.page-break',
        after: '.page-break-after',
        avoid: [
          '.avoid-break',
          '.group',
          '.step',
          '.question',
          '.question-text',
          '.answer-text',
        ],
      },
    };

    try {
      await html2pdf()
        .set(options)
        .from(tempDiv.querySelector('.document-container'))
        .save();
    } finally {
      document.body.removeChild(tempDiv);
    }
  }

  /**
   * Opens HTML content in a new window for native browser printing
   * @param {string} htmlContent - HTML content to print
   */
  static printHTML(htmlContent) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = function () {
      setTimeout(() => {
        printWindow.print();
        // Browser will handle PDF generation when user chooses "Save as PDF"
      }, 100);
    };
  }
}
