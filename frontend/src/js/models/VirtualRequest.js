import ApiOperator from '../Helpers/ApiOperator'

export class VirtualRequests
{
  static VirtualRequestsRootUrl = "VirtualRequestRouter.php?endpoint="

  static async getAll() 
  {
    try 
    {
        const resulte = await ApiOperator.get(this.VirtualRequestsRootUrl + "getAll" );
        if(resulte.success){
            return resulte.data;
        }else{
           alert(resulte.success +"\n"+resulte.message);
        }
       
    } catch (error) {
        alert("catch in getAll : " + error);
    }
  }
  static async getById(id) 
  {
    try 
    {
        const resulte = await ApiOperator.get(this.VirtualRequestsRootUrl + "getById" ,{"id":id});
        if(resulte.success){
            return resulte.data;
        }else{
           alert(resulte.success +"\n"+resulte.message);
        }
       
    } catch (error) {
        alert("catch in getById: " + error);
    }
  }


}