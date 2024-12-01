import ApiOperator from '../Helpers/ApiOperator'

class DocumentRequest 
{
    static DocumentRequestRootUrl = "NotificationRouter.php?endpoint="

    static async getByStudentId(id) 
    {
      try 
      {
          const resulte = await ApiOperator.get(this.DocumentRequestRootUrl + "getByStudentId" ,{"studentId":id});
          if(resulte.success){
              return resulte.data;
          }else{
             alert(resulte.success +"\n"+resulte.message);
          }
         
      } catch (error) {
          alert("catch in getByStudentId: " + error);
      }
    }
}

export default DocumentRequest;