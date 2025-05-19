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

  static async ChangeStatus(problemId,status)
  {
    try
    {
      const result = await ApiOperator.post(this.ReportProblemRootUrl + "changeStatus",{problemId:problemId,status:status});
      return result;
    } catch(error)
    {
      alert("catch in AddReportProblem: " + error);
      console.log(error);
    }
  }

  static async getAll()
  {
    try
    {
      const result = await ApiOperator.get(this.ReportProblemRootUrl + "getAll");
      return result;
    } catch(error)
    {
      alert("catch in get all Report Problem: " + error);
      console.log(error);
    }
  }
  //==========================
  static async sendReply(email, message) {
    try {
      const data = { email, message };
      console.log("📤 Sending request:", data); // ✅ عرض البيانات قبل الإرسال

      const result = await ApiOperator.post(this.ReportProblemRootUrl + "sendReply", data);

      console.log("📥 Response from API:", result); // ✅ عرض الرد من API

      return result;
    } catch (error) {
      console.error("❌ Error in sendReply:", error);
      alert("Error in sendReply: " + error);
    }
}


}

export default ReportProblem;