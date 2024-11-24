import settings from '../../resources/Settings'
class ApiOperator{

    static rootUrl = settings.domain + "University-management/backend/roots/";

    static async request(apiUrl,method,data){
        //alert(this.rootUrl+apiUrl);

        if(apiUrl != null && method != null){
            const options = {
                method,
                headers: {
                  'Content-Type': 'application/json',
                },
              };
              if (data ) {
                options.body = JSON.stringify(data); // إرسال كـ JSON
              } 
            const response = await fetch(this.rootUrl+apiUrl,options);

           // alert(this.rootUrl+apiUrl);


            try{
                if(!response.ok){
                    alert(`success: ${response.success} \n Message: ${response.message}`);
                }
                //console.log(response.text());
                    return await response.json();
            } catch (error){
                alert("cathch error : " + error);
                alert(this.rootUrl+apiUrl);
                console.log(response.text());
            }
        }else{
            alert('you must send url and method');
        }
    }
    
    static async get(apiUrl, data = null) {
        if (data) {
            const params = new URLSearchParams(data).toString();  // تحويل الكائن إلى معلمات استعلام
            apiUrl = `${apiUrl}&${params}`; 
        }
    
        return this.request(apiUrl, 'GET'); // إرسال الطلب
    }
    
    static async post(apiUrl,data) 
    {
        return this.request(apiUrl, 'POST', data);
    }
}

export default ApiOperator;