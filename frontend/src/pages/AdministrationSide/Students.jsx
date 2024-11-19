import React, { useState } from "react";
import RadioButton from "components/custom controls/buttons/RadioButton";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import DataGridViewStyle2 from "components/custom controls/data grid view/dataGridViewStyle2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next"; 

export default function StudentsTable() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([
        { id: 1, matricule: "2023001", firstName: "Moh", lastName: "Ait Wnach", educationYear: "2", speciality: "ISIL", section: "Section 1", group: "Group A", email: "moh.aitwnach@example.com", active: false },
        { id: 2, matricule: "2023002", firstName: "Nazim", lastName: "Ben", educationYear: "3", speciality: "SI", section: "Section 2", group: "Group B", email: "nazim.ben@example.com", active: false },
    ]);

    const columns = [
        { name: "matricule", Header: "Matricule", width: "15%", className: "text-center" },
        { name: "firstName", Header: "FirstName", width: "15%", className: "text-center" },
        { name: "lastName", Header: "LastName", width: "15%", className: "text-center" },
        { name: "educationYear", Header: "Year", width: "10%", className: "text-center" },
        { name: "speciality", Header: "Specialty", width: "10%", className: "text-center" },
        { name: "section", Header: "Section", width: "10%", className: "text-center" },
        { name: "group", Header: "Group", width: "10%", className: "text-center" },
        { name: "email", Header: "Email", width: "20%", className: "text-center" },
        { name: "Action", Header: "Status", width: "10%", className: "text-center" },
    ];

    const handleAction = (student) => {
        setStudents((prev) =>
            prev.map((item) =>
                item.id === student.id ? { ...item, active: !item.active } : item
            )
        );
    };

    const [selectedOption, setSelectedOption] = useState("matricule");
    const [selectedOption2, setSelectedOption2] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleRadioChange2 = (e) => {
        setSelectedOption2(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const options1 = ["matricule", "last name", "speciality"];
    const options2 = ["all", "active", "desactive"];

    const filteredStudents = students.filter((student) => {
        if (searchTerm ==="") return true;
        return student[selectedOption]?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const filteredStudents1 = filteredStudents.filter((student) => {
        if (selectedOption2 === "all") return true;
        if (selectedOption2 === "active") return student.active === true;
        if (selectedOption2 === "desactive") return student.active === false;
    });

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 min-h-screen rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search By</h2>
            
            {/* Search Field and Radio Buttons */}
            <div className="mb-6 flex items-center space-x-6 shadow-md p-4 w-[55%] rounded-lg bg-white">
                <RadioButton
                    options={options1}
                    name="searchBy"
                    value={selectedOption}
                    onChange={handleRadioChange}
                    className="text-gray-700 hover:text-blue-500 transition duration-300"
                />
                
                {/* TextBoxStyle2 with Search Icon */}
                <div className="relative w-1/3">
                 
                    <TextBoxStyle2
                        type="saerch"
                        value={searchTerm}
                        
                        onChange={handleSearchChange}
                        placeholder="search  "
                        className="pl-10 pr-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full"
                    />
                </div>
            </div>

            {/* Filter by Status */}
            <div className="mb-6 flex items-center w-[55%] shadow-md p-4 rounded-lg bg-white">
                <RadioButton
                    options={options2}
                    name="statusFilter"
                    value={selectedOption2}
                    onChange={handleRadioChange2}
                    className="text-gray-700 hover:text-blue-500 transition duration-300"
                />
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">Students List:</h2>
            <DataGridViewStyle2
                Columns={columns}
                Data={filteredStudents1}
                onAction={handleAction}
            />
        </div>
    );
}
