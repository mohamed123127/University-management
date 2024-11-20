import React, { useState } from "react";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import DataGridViewStyle2 from "components/custom controls/data grid view/dataGridViewStyle2";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from "react-i18next"; 

export default function Administration() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

   

    const columns = [
        { name: "id", Header: "ID", width: "10%", className: "text-center" },
        { name: "firstName", Header: t("FirstName"), width: "20%", className: "text-center" },
        { name: "lastName", Header: t("LastName"), width: "20%", className: "text-center" },
        { name: "email", Header: t("Email"), width: "30%", className: "text-center" },
        { name: "password", Header: t("Password"), width: "20%", className: "text-center" },
    ];
    const data = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "********",
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            password: "********",
        },
        {
            id: 3,
            firstName: "Ahmed",
            lastName: "Ali",
            email: "ahmed.ali@example.com",
            password: "********",
        },
        {
            id: 4,
            firstName: "Emma",
            lastName: "Brown",
            email: "emma.brown@example.com",
            password: "********",
        },
        {
            id: 5,
            firstName: "Lucas",
            lastName: "Johnson",
            email: "lucas.johnson@example.com",
            password: "********",
        },
    ];
    
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
              <ButtonStyle1  buttonClassName="w-[50px]" buttonText="add"/>
               
            </div>

            {/* Data Grid View */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">User List:</h2>
                <DataGridViewStyle2
                    Columns={columns}
                    Data={data}
                    className="bg-white shadow-md rounded-lg"
                />
            </div>
        </div>
    );
}
