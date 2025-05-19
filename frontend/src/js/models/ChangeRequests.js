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

    static async accepteRequest(requestId, requestType, Matricule1, Value1, Matricule2, Value2,studentId) {
        try {
            const data = {
                requestId: requestId,
                requestType: requestType,
                studentId: studentId,
                Matricule1: Matricule1,
                Value1: Value1,
                Matricule2: Matricule2,
                Value2: Value2
            };
            const response = await ApiOperator.post(this.ChangeRequestsRootUrl + "accepteRequest",data);
            return response;
        } catch(error){
            alert("catch in updateRequest: " + error);
        }
    }

    static async refusedRequest(requestId){
        try{
            const data = {
                requestId: requestId
            }

            const response = await ApiOperator.post(this.ChangeRequestsRootUrl + "refusedRequest",data);
            return response;
        } catch(error){
            alert("catch in updateRequest: " + error);
        }
    }

}

export default ChangeRequests;