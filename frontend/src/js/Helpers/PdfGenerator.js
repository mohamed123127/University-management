import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


class PdfGenerator{
    static async generate(certRef){
        const element = certRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        return pdf;
    };
}

export default PdfGenerator;