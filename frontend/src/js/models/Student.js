import ApiOperator from '../Helpers/ApiOperator'

class Student 
{
  static StudentRootUrl = "StudentRouter.php?endpoint="

  static async addEtudient(data) 
  {
    try 
    {
        const result = await ApiOperator.post(this.StudentRootUrl + "addEtudient", data);
        if(result.success === true){
          alert("You have been successfully added. Please wait for your account to be activated by the university. \nAn email will be sent to you once your account is activated.")
        }else{
          alert(result.message);
        }
    } catch (error) {
        alert("catch in addEtudient: " + error);
    }
  }

  static async isExistEtudient(Email, Password) 
  {
    try 
    {
        const result = await ApiOperator.post(this.StudentRootUrl + "isExistEtudient", {email: Email,password: Password});
        return result; 
    } catch (error) {
        alert("catch in isExistEtudient: " + error);
    }
  }

  static async GetById(Id)
  {
    try
    {
      const data = await ApiOperator.get(this.StudentRootUrl + "getStudentById",{id:Id});
      return data;
    } catch(error)
    {
      alert("catch in GetById: " + error);
    }
  }

  static async GetByEmail(Email)
  {
    try
    {
      const data = await ApiOperator.get(this.StudentRootUrl + "getStudentByEmail",{email:Email});
      return data;
    } catch(error)
    {
      alert("catch in GetByEmail: " + error);
    }
  }

  static async changeStatus(data)
  {
    try
    {
      const result = await ApiOperator.post(this.StudentRootUrl + "changeStatus",data);
      if(result.success == false){
        alert(result.message);
      }
    } catch(error)
    {
      alert("catch in changeActivationStatus: " + error);
    }
  }

  static async getAll()
  {
    try
    {
      const result = await ApiOperator.get(this.StudentRootUrl + "getAll");
      return result;
    } catch(error)
    {
      alert("catch in getAll: " + error);
    }
  }
}

export default Student;