import React, { useEffect, useState, useRef } from "react";
import RadioButton from "components/custom controls/buttons/RadioButton";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import DataGridViewStyle2 from "components/custom controls/data grid view/dataGridViewStyle2";
import { useTranslation } from "react-i18next";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import * as XLSX from "xlsx";
import Student from "js/models/Student";

export default function Students() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);
    const options1 = [t("Matricule"), t("EducationYear"), t("full name"), t("Email")];
    const options2 = ["all", "Active", "desactive

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await Student.getAll();
            const roles = await Student.getStudentsRole();
      
            if (result.success === true) {
              const studentsWithRoles = result.Data.students.map(student => {
                const matchedRole = roles.studentsRole.find(
                  role => role.StudentId === student.Id
                );
                return {
                  ...student,
                  Role: matchedRole ? matchedRole.Role : null 
                };
              });
      
              setStudents(studentsWithRoles);
              console.log(studentsWithRoles);
            } else {
              alert(result.success + '\n ' + result.message);
            }
          } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred while getting all students. Please try again later.");
          }
        };
        fetchData();
      }, []);
      


    const columns = [
        { name: "Matricule", Header: "Matricule", width: "10%", className: "text-center" },
        { name: "FirstName", Header: "FirstName", width: "10%", className: "text-center" },
        { name: "LastName", Header: "LastName", width: "10%", className: "text-center" },
        { name: "EducationYear", Header: "Year", width: "10%", className: "text-center" },
        { name: "Speciality", Header: "Speciality", width: "5%", className: "text-center" },
        { name: "Section", Header: "Section", width: "5%", className: "text-center" },
        { name: "Grp", Header: "Group", width: "10%", className: "text-center" },
        { name: "Email", Header: "Email", width: "10%", className: "text-center" },
        { name: "Role", Header: "Role", width: "35%", className: "text-center" }, 
        { name: "Action", Header: "Active", width: "10%", className: "text-center" },
    ];
    const [selectedOption, setSelectedOption] = useState(t("Matricule"));
    const [selectedOption2, setSelectedOption2] = useState(t("all"));
    const [searchTerm, setSearchTerm] = useState("");
    const expectedHeaders = ["matricule", "firstName", "lastName", "educationYear", "speciality", "section", "group", "email", "password", "phone"];

      const isSameSchema = (headers)=>{
        //console.log("1");
        const incorrectHeaders = headers.filter(header => !expectedHeaders.includes(header));
        //console.log(incorrectHeaders);
        if(incorrectHeaders == null || incorrectHeaders.length === 0){
            return true
        }else if(incorrectHeaders.length !== expectedHeaders.length){
            alert("they are somme incorrect headers in schema : \n,the correct headers : " + expectedHeaders + "\nthe headers in your file : " + incorrectHeaders);
            return false;
        }else{
            alert("the excel file have more or less columns then the correct schema");
            return false;
        }
      }
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

    const AddSelectedFile = (tableData) => {
        console.log(JSON.stringify({ studentsData: tableData }));
        // يمكنك هنا إرسال البيانات إلى API أو تخزينها في حالة (state)
      };
      
      const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        //console.log(file);
        /*Swal.fire({
            title: 'هل أنت متأكد؟',
            text: "سينم حذف جميع الطلاب مع الطلبات المرفقة اليهم و لا يمكنك التراجع بعد الحذف هل انت متأكد من الحذف؟!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذف',
            cancelButtonText: 'لا، الغِ',
          }).then((result) => {
            if (!result.isConfirmed) { 
              return; 
            }
          
            console.log("تم الحذف");
          */
             const reader = new FileReader();
             
             console.log("l");
             reader.onload = async (e) => {
                console.log("2");
             
                const data = new Uint8Array(e.target.result);
              const workbook = XLSX.read(data, { type: "array" });
          
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
              const headers = jsonData[0];
              const tableData = jsonData.slice(1).map((row) =>
                Object.fromEntries(headers.map((header, index) => [header, row[index] || ""]))
              );
              if (isSameSchema(headers)) {
                AddSelectedFile(tableData);
          
                try {
                  let log = await Student.importStudents({ studentsData: tableData });
                  console.log(log);
                  fetchData();
                } catch (err) {
                  console.error("حدث خطأ أثناء الاستيراد:", err);
                }
              }
            
          
            };
            reader.readAsArrayBuffer(file);
          
          
      };

    const fileInputRef = useRef(null);
    
    const importStudentsButtonClick =async () => {
      fileInputRef.current.click();
    };

    const filteredStudents1 = filteredStudents.filter((student) => {
        if (selectedOption2 === t("all")) return true;
        if (selectedOption2 === t("Active"))  return student.Active === 1;
        if (selectedOption2 === t("desactive")) return student.Active === 0;
    });

    return (
        <div className="p-2 bg-gray-100 min-h-screen rounded-lg shadow-md">
          

            <div className="mb-2 flex justify-between items-center bg-white ltr:pl-2 rtl:pr-2 rounded-lg shadow-sm h-20">
                
                <div className="w-full">
                    <div className="flex items-center mb-2">
                    <TextBoxStyle2
                        type="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder={"Search"}
                        textBoxClassName="w-[330px] h-8 border mr-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ComboBoxStyle1
                        options={options2}
                        name="statusFilter"
                        value={selectedOption2}
                        onChange={handleComboBoxChange}
                        comboBoxClassName="p-1 rounded-md h-8 border-gray-300 mb-2"
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
                <div className="flex items-center mr-2">
                    <input type="file" accept=".xls,.xlsx" ref={fileInputRef} onChange={handleFileUpload} style={{ display: "none" }}/>
                    <ButtonStyle1 buttonClassName="h-10 w-36 font-bold mt-2" buttonText="Import Student" onClick={importStudentsButtonClick}/>
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
