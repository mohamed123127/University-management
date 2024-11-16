import settings from '../../resources/Settings'
class ApiOperator{

    static rootUrl = settings.domain + "University-management/backend/roots/";

    static async request(apiUrl,method,data){
        if(apiUrl != null && method != null){
            const options = {
                method,
                headers: {
                  'Content-Type': 'application/json',
                },
              };

              if (data && !(data instanceof FormData)) {
                options.body = JSON.stringify(data); // إرسال كـ JSON
              } else if (data) {
                options.body = data; // إرسال كـ FormData
              }
            const response = await fetch(this.rootUrl+apiUrl,options);
            try{
                if(!response.ok){
                    alert(`success: ${response.success} \n Message: ${response.message}`);
                }
                    return await response.json();
            } catch (error){
                alert("cathch error : " + error);
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