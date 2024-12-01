import React, { useEffect ,useState } from "react";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import DataGridViewStyle2 from "components/custom controls/data grid view/dataGridViewStyle2";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from "react-i18next"; 
import Administration from "js/models/Administration";

export default function Administrations() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [Administrations, setAdministrations] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Administration.getAll();
                console.log("Response from getAll:", data); // طباعة البيانات القادمة
                if (data.success === true) {
                    setAdministrations(data.Data.Administrations || []);
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error("Fetch error:", error); // طباعة الخطأ
                alert("An error occurred while getting all admins. Please try again later.");
            }
        };
        fetchData();
    }, []);
    
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

   

    const columns = [
        { name: "FirstName", Header: t("FirstName"), width: "20%", className: "text-center" },
        { name: "LastName", Header: t("LastName"), width: "20%", className: "text-center" },
        { name: "Email", Header: t("Email"), width: "30%", className: "text-center" },
        { name: "Password", Header: t("Password"), width: "20%", className: "text-center" },
    ];

    const addAdministrator = async () => {
        try {
            const response = await Administration.addAdmin(formData); // استخدام دالة addAdmin
            if (response.success) {
                //console.log(response.Data);
                //alert('تم إضافة المسؤول بنجاح');
                
                // إضافة بيانات النموذج إلى القائمة مع الصف الجديد
                const newAdministrator = {
                    FirstName:formData.firstName,LastName:formData.lastName,Email:formData.email,Password:formData.password
                };
                
                // تحديث قائمة المسؤولين
                setAdministrations(prev => [...prev, newAdministrator]); 
                
                // مسح النموذج
                setFormData({ firstName: "", lastName: "", email: "", password: "" });
            } else {
                alert(`خطأ: ${response.message}`);
            }
        } catch (error) {
            console.error("Error adding administrator:", error);
            alert("حدث خطأ أثناء إضافة المسؤول. يرجى المحاولة مرة أخرى.");
        }
    };
    
    
    
    
    
    
    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 min-h-screen rounded-lg shadow-xl">
            {/* Title */}
            <div className="flex justify-center m-4">
                <h1 className="text-blue-800 p-4 text-3xl">Administration</h1>
            </div>

            {/* Input Form */}
            <div className="mb-6 flex flex-wrap items-center space-x-4 shadow-md p-6 bg-white rounded-lg">
                <TextBoxStyle2
                    Name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    textBoxClassName="w-1/5"
                />
                <TextBoxStyle2
                    Name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    textBoxClassName="w-1/5"
                />
                <TextBoxStyle2
                    Name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    textBoxClassName="w-1/5"
                />
                <TextBoxStyle2
                    Name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    textBoxClassName="w-1/5"
                    type="password"
                />
              <ButtonStyle1  buttonClassName="w-[50px]" buttonText="add" onClick={addAdministrator}/>
               
            </div>

            {/* Data Grid View */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">User List:</h2>
                <DataGridViewStyle2
                    Columns={columns}
                    Data={Administrations}
                    setData={setAdministrations}                    
                    className="bg-white shadow-md rounded-lg"
                />
            </div>
        </div>
    );
}
