import ApiOperator from '../Helpers/ApiOperator'
import settings from '../../resources/Settings'

class DocumentRequest 
{
    static DocumentRequestRootUrl = "DocumentRequestRouter.php?endpoint="
    static rootUrl = settings.domain + "1/University-management/backend/roots/";

    static async SaveDocumentRequestInDb(data){
        const response = await ApiOperator.post(this.DocumentRequestRootUrl+"SaveDocumentRequestInDb",data)
        return response;
    }    
}

export default DocumentRequest;