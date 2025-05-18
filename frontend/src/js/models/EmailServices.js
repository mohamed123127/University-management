import ApiOperator from '../Helpers/ApiOperator'

class EmailServices 
{
    static EmailServicesRootUrl = "EmailServicesRouter.php?endpoint="

    static async sendEmail(emailReceiver,title,content){
        const response = await ApiOperator.post(this.EmailServicesRootUrl+"sendEmail",{emailReceiver:emailReceiver,title:title,content:content})
        return response;
    }    
}

export default EmailServices;