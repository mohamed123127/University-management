import ApiOperator from '../Helpers/ApiOperator'

class ReportProblem 
{
  static ReportProblemRootUrl = "StudentsProblemsRouter.php?endpoint="

  static async Add(data)
  {
    try
    {
      const result = await ApiOperator.post(this.ReportProblemRootUrl + "add",data);
      return result;
    } catch(error)
    {
      alert("catch in AddReportProblem: " + error);
      console.log(error);
    }
  }
}

export default ReportProblem;