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
        if(result.success === true){
          return result.IsGeneralAdmin;
        }else{
          alert("the email and password are incorrect");
        }
    } catch (error) {
        alert("catch in isExistAdmin: " + error);
    }
  }

  static async GetById(Id)
  {
    try
    {
      const data = await ApiOperator.get(this.AdministrationRootUrl + "getAdminById",{id:Id});
      return data;
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