import ApiOperator from '../Helpers/ApiOperator'

class ChangeRequests 
{
    static ChangeRequestsRootUrl = "ChangeRequestsRouter.php?endpoint="

    static async add(data)
    {
        try{
            const response = await ApiOperator.post(this.ChangeRequestsRootUrl+"add",data)
              return response;
        }catch(error)
        {
            alert("catch in add change request: " + error)
        } 
    }

    static async getAll(){
        try{
            const data = await ApiOperator.get(this.ChangeRequestsRootUrl + "getAll");
            return data;
          } catch(error)
          {
            alert("catch in getAll: " + error);
          }
    }

}

export default ChangeRequests;