import ApiOperator from '../Helpers/ApiOperator'

class JwtVerify {

    static JwtRouterURL = "JwtRouter.php?endpoint="

    static async JwtVerify(){
        try
            {
              const data = await ApiOperator.post(this.JwtRouterURL + "verifyJwtToken",{token:localStorage.getItem("jwt")});
              return data;
            } catch(error)
            {
              alert("catch in JwtRouter: " + error);
            }

    }
}

export default JwtVerify;