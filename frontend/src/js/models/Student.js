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

  static async GetStudentsById(listId)
  {
    try
    {
      let studentsData = []; // مصفوفة لتخزين البيانات
  for (const id of listId) {
    const studentData = await this.GetById(id);
    studentsData.push(studentData.Data); // أضف البيانات إلى المصفوفة
  }
  //console.log(studentsData);
  return studentsData; // أعد النتيجة
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

  //------------------
  static async setRole(studentId, role) {
    try{
    return await ApiOperator.post(this.StudentRootUrl + "setRole", { studentId , role });
  }catch(error){alert("catch in setRole: " + error);}
}

static async getStudentWithRole(studentId) {
  try {
    const response = await ApiOperator.get(this.StudentRootUrl + "getStudentWithRole", { studentId });
     return response.role; 
  } catch (error) {
      console.error("catch in getStudentWithRole:", error);
  }
}




}

export default Student;