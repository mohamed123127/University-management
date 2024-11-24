import ApiOperator from '../Helpers/ApiOperator'

class Announcement 
{
  static AnnouncementRootUrl = "AnnouncementRouter.php?endpoint="

  static async Add(data) 
  {
    try 
    {
        const result = await ApiOperator.post(this.AnnouncementRootUrl + "add", data);
        return result; 
    } catch (error) {
        alert("catch in add announcement: " + error);
    }
  }
}

export default Announcement;