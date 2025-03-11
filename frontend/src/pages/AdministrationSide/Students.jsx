import React, { useEffect, useState } from "react";
import RadioButton from "components/custom controls/buttons/RadioButton";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import DataGridViewStyle2 from "components/custom controls/data grid view/dataGridViewStyle2";
import { useTranslation } from "react-i18next";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";
import Student from "js/models/Student";

export default function Students() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);
    const [result,setResult]=useState([]);


    const options1 = [t("Matricule"), t("EducationYear"), t("full name"), t("Email")];

    const options2 = ["all", "Active", "desactive"];

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const result = await Student.getAll();
                if (result.success === true) {
                  setStudents(result.Data.students);
              } else {
                  alert(result.success+'\n ' + result.message);
              }
            } catch (error) {
                  console.error("Fetch error:", error);
                  alert("An error occurred while getting all students. Please try again later.");
              }
        }
        fetchData();
    },[])


    const columns = [
        { name: "Matricule", Header: "Matricule", width: "15%", className: "text-center" },
        { name: "FirstName", Header: "FirstName", width: "15%", className: "text-center" },
        { name: "LastName", Header: "LastName", width: "15%", className: "text-center" },
        { name: "EducationYear", Header: "Year", width: "10%", className: "text-center" },
        { name: "Speciality", Header: "Speciality", width: "10%", className: "text-center" },
        { name: "Section", Header: "Section", width: "10%", className: "text-center" },
        { name: "Grp", Header: "Group", width: "10%", className: "text-center" },
        { name: "Email", Header: "Email", width: "20%", className: "text-center" },
        { name: "Action", Header: "Active", width: "10%", className: "text-center" },
    ];

    const [selectedOption, setSelectedOption] = useState(t("Matricule"));
    const [selectedOption2, setSelectedOption2] = useState(t("all"));
    const [searchTerm, setSearchTerm] = useState("");
   
    const handleAction = async(row) => {
        try {
            const result = await Student.changeActivate({"id":row.Id,"status":row.Active});
           /* if (result.success) {
                alert("the change has been done");
            }else{
                alert(result.success+"\n"+result.message);
            }*/

    } catch (error) {
        console.error("Error in handleRadioChange2:", error);
    }
    };

   

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleComboBoxChange = (e) => {
        setSelectedOption2(e.target.value);
        console.log(students);

    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };



    const filteredStudents = students.filter((student) => {
        if (searchTerm === "") return true;
        else if (selectedOption === t("full name")) {
            const fullName = `${student.FirstName} ${student.LastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        }
        else if (selectedOption ===t("Matricule")){
            return student.Matricule.startsWith(searchTerm.toLowerCase());

        }
        return student[selectedOption]?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const filteredStudents1 = filteredStudents.filter((student) => {
        if (selectedOption2 === t("all")) return true;
        if (selectedOption2 === t("Active"))  return student.Active === 1;
        if (selectedOption2 === t("desactive")) return student.Active === 0;
    });

    return (
        <div className="p-2 bg-gray-100 min-h-screen rounded-lg shadow-md">
           
            <div className="mb-2 flex justify-between items-center bg-white pl-2 rounded-lg shadow-sm h-20">
                
                <div className="w-full">
                    <div className="flex">
                    <LabelStyle1 labelText="Search:" labelClassName="text-lg ltr:mr-2 rtl:mr-2"/>
                    <TextBoxStyle2
                        type="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder={"Search"}
                        textBoxClassName="w-96 h-8 border mb-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    
                    <div>
                        <RadioButton
                            options={options1}
                            name="searchBy"
                            value={selectedOption}
                            onChange={handleRadioChange}
                            radioClassName="text-gray-700 hover:text-blue-500 transition duration-300"
                        />
                    </div>
                </div>

                {/* Filter ComboBox */}
                <div className="">
                    <ComboBoxStyle1
                        options={options2}
                        name="statusFilter"
                        value={selectedOption2}
                        onChange={handleComboBoxChange}
                        comboBoxClassName="p-3 mb-9  rounded-md h-12  border-gray-300"
                    />
                </div>
            </div>

            {/* Data Grid View */}
            <div className="">
                <DataGridViewStyle2
                    Columns={columns}
                    Data={filteredStudents1}
                    setData={setStudents}
                    onAction={handleAction}
                    ClassName="table-auto ltr:ml-2 rtl:mr-2"
                />
            </div>
        </div>
    );
}
