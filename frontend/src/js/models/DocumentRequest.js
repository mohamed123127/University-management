import ApiOperator from '../Helpers/ApiOperator'

class DocumentRequest 
{
    static DocumentRequestRootUrl = "DocumentRequestRouter.php?endpoint="

    static async SaveDocumentRequestAsPdf(pdf,data)
    {
        try{
             // تحويل ملف PDF إلى Blob
             const pdfArrayBuffer = pdf.output('arraybuffer');
             const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
     
             const pdfData = new FormData();
             const fileName = `${data.matricule}_${data.name}.pdf`;
             pdfData.append('type', data.type);
             pdfData.append('file', pdfBlob, fileName);
     
             // حفظ PDF في السرفر
             const response = await fetch('http://localhost/University-management/backend/roots/SaveDocumentRequest.php', {
                 method: 'POST',
                 body: pdfData,
             });
              return await response.json();
        }catch(error)
        {
            alert("catch in save document requset as pdf: " + error)
        } 
    }

    static async SaveDocumentRequestInDb(data){
        const response = await ApiOperator.post(this.DocumentRequestRootUrl+"SaveDocumentRequestInDb",data)
        return response;
    }
}

export default DocumentRequest;