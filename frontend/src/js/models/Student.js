import ApiOperator from '../Helpers/ApiOperator'

class Student 
{
  static StudentRootUrl = "StudentRouter.php?endpoint="

  static async addEtudient(data) 
  {
    try 
    {
        const result = await ApiOperator.post(this.StudentRootUrl + "addEtudient", data);
        return result; 
    } catch (error) {
        alert("catch in addEtudient: " + error);
    }
  }

  static async isExistEtudient(Email, Password) 
  {
    try 
    {
        const data = await ApiOperator.post(this.StudentRootUrl + "isExistEtudient", {email: Email,password: Password});
        return data; 
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

  static async changeActivate(data)
  {
    try
    {
      const result = await ApiOperator.post(this.StudentRootUrl + "changeActivationStatus",data);
      return result;
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