import ApiOperator from '../Helpers/ApiOperator'

class Administration 
{
  static AdministrationRootUrl = "AdministrationRouter.php?endpoint="

  static async addAdmin(data) 
  {
    try 
    {
        const result = await ApiOperator.post(this.AdministrationRootUrl + "addAdmin", data);
        return result; 
    } catch (error) {
        alert("catch in addAdmin: " + error);
    }
  }

  static async isExistAdmin(Email, Password) 
  {
    try 
    {
        const result = await ApiOperator.post(this.AdministrationRootUrl + "isExistAdmin", {email: Email,password: Password});
        return result;
    } catch (error) {
        alert("catch in isExistAdmin: " + error);
    }
  }

  static async GetById(Id)
  {
    try
    {
      const result = await ApiOperator.get(this.AdministrationRootUrl + "getById",{id:Id});
      if(result.success){
        return result.Data;
      }else{
        alert(result.message);
      }
    } catch(error)
    {
      alert("catch in GetById: " + error);
    }
  }


  static async getAll()
  {
    try
    {
      const data = await ApiOperator.get(this.AdministrationRootUrl + "getAll");
      return data;
    } catch(error)
    {
      alert("catch in getAll: " + error);
    }
  }
}

export default Administration;