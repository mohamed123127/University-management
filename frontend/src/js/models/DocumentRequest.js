import ApiOperator from '../Helpers/ApiOperator'
import settings from '../../resources/Settings'

class DocumentRequest 
{
    static DocumentRequestRootUrl = "DocumentRequestRouter.php?endpoint="
    static rootUrl = settings.domain + "University-management/backend/roots/";

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
             const response = await fetch(this.rootUrl + 'SaveDocumentRequest.php', {
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

    static async GetAll(){
        const response = await ApiOperator.get(this.DocumentRequestRootUrl+"getAll")
        return response;
    }
    static async getById(id) 
    {
      try 
      {
          const resulte = await ApiOperator.get(this.DocumentRequestRootUrl + "getById" ,{"id":id});
          if(resulte.success){
              return resulte.data;
          }else{
             alert(resulte.success +"\n"+resulte.message);
          }
         
      } catch (error) {
          alert("catch in getById: " + error);
      }
    }
    static async UpdateStatus(id,status,studentId){
        const response = await ApiOperator.post(this.DocumentRequestRootUrl+"updateStatus",{"id":id,"status":status,"studentId":studentId})
        return response;
    }

    static async AddNote(id,note){
        const response = await ApiOperator.post(this.DocumentRequestRootUrl+"addNote",{"id":id,"note":note})
        try{
        if(response.success){
            return true;
        }else{
            alert(response.success + "\n" + response.message);
        }
        }catch(error){
            alert("error in add note : \n" + error);
        }
        return response;
    }
}

export default DocumentRequest;