import ApiOperator from '../Helpers/ApiOperator'

class DashBoard {

    static DashboardStatsRootURL = "DashboardStatsRoot.php?endpoint="

    static async GetDashboardStats(){
        try
            {
              const data = await ApiOperator.get(this.DashboardStatsRootURL + "getDashboardStats");
              return data;
            } catch(error)
            {
              alert("catch in getDashboardStats: " + error);
            }

    }
}

export default DashBoard;