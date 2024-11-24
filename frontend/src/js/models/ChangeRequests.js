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

}

export default ChangeRequests;