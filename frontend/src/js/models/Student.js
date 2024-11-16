import ApiOperator from '../Helpers/ApiOperator'

class Student 
{
  static studentrooturl = "StudentRouter.php?endpoint="

  static async isExistEtudient(Email, Password) 
  {
    try 
    {
        const data = await ApiOperator.post(this.studentrooturl + "isExistEtudient", {email: Email,password: Password});
        return data; 
    } catch (error) {
        alert("catch in isExistEtudient: " + error);
    }
  }

  static async GetById(Id)
  {
    try
    {
      const data = await ApiOperator.get(this.studentrooturl + "getStudentById",{id:Id});
      return data;
    } catch(error)
    {
      alert("catch in isExistEtudient: " + error);
    }
  }
}

export default Student;