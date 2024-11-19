import ApiOperator from '../Helpers/ApiOperator'

class Administration 
{
  static AdminRootUrl = "AdministrationRouter.php?endpoint="

  static async isExistAdmin(Email, Password) 
  {
    try 
    {
        const data = await ApiOperator.post(this.AdminRootUrl + "isExistAdmin", {email: Email,password: Password});
        return data; 
    } catch (error) {
        alert("catch in isExistAdmin: " + error);
    }
  }

  static async GetById(Id)
  {
    try
    {
      const data = await ApiOperator.get(this.AdminRootUrl + "getAdminById",{id:Id});
      return data;
    } catch(error)
    {
      alert("catch in GetById: " + error);
    }
  }
}

export default Administration;