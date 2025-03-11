import React, { useEffect, useState } from "react";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import DataGridViewStyle2 from "components/custom controls/data grid view/dataGridViewStyle2";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from "react-i18next";
import Administration from "js/models/Administration";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";

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
                console.log("Response from getAll:", data);
                if (data.success === true) {
                    setAdministrations(data.Data.Administrations || []);
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error("Fetch error:", error);
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
            const response = await Administration.addAdmin(formData);
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
        <div className="p-2 bg-gray-100 min-h-screen rounded-lg shadow-md">
            {/* Input Form */}
            <div className="mb-6 bg-white p-2 rounded-lg shadow-sm flex items-end space-x-4">
                {/* First Name */}
                <div className="flex flex-col w-[15%]">
                    <LabelStyle1 labelText="First Name :" labelClassName="mb-1 text-sm text-gray-700" />
                    <TextBoxStyle2
                        Name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder={`${'FirstName'}`}
                        textBoxClassName="w-full"
                    />
                </div>

                {/* Last Name */}
                <div className="flex flex-col w-[15%]">
                    <LabelStyle1 labelText="Last Name :" labelClassName="mb-1 text-sm text-gray-700" />
                    <TextBoxStyle2
                        Name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder={`${'LastName'}`}
                        textBoxClassName="w-full"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col w-[20%]">
                    <LabelStyle1 labelText="Email :" labelClassName="mb-1 text-sm text-gray-700" />
                    <TextBoxStyle2
                        Name="email"
                        value={formData.email}
                        onChange={handleChange}
                       placeholder="example@gmail.com"
                        textBoxClassName="w-full"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col w-[18%]">
                    <LabelStyle1 labelText="Password :" labelClassName="mb-1 text-sm text-gray-700" />
                    <TextBoxStyle2
                        Name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={`${'Password'}`}
                        textBoxClassName="w-full"
                        type="password"
                    />
                </div>

              
                
                    <ButtonStyle1 buttonClassName="w-24 h-7" buttonText="Add" onClick={addAdministrator} />
              
            </div>

            {/* Data Grid View */}
            <div className="mt-6">
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
