import ApiOperator from '../Helpers/ApiOperator'

class Notification 
{
    static NotificationsRootUrl = "NotificationRouter.php?endpoint="

    static async getByStudentId(id) 
    {
      try 
      {
          const resulte = await ApiOperator.get(this.NotificationsRootUrl + "getByStudentId" ,{"studentId":id});
          if(resulte.success){
              return resulte.data;
          }else{
             alert(resulte.success +"\n"+resulte.message);
          }
         
      } catch (error) {
          alert("catch in getByStudentId: " + error);
      }
    
    }

    static async setNotificationAsRead(studentId) 
    {
      try 
      {
          const resulte = await ApiOperator.get(this.NotificationsRootUrl + "setNotificationAsRead" ,{"studentId":studentId});
          if(resulte.success){
              return resulte.data;
          }else{
             alert(resulte.success +"\n"+resulte.message);
          }
         
      } catch (error) {
          alert("catch in getByStudentId: " + error);
      }
    
}
}
export default Notification;