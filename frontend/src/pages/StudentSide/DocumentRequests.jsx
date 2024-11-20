import React, { useEffect, useState } from "react";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle2";
import DataGridView from "components/custom controls/data grid view/dataGridViewStyle1";
import { useTranslation } from 'react-i18next';
import Student from "js/models/Student";
  
export default function DocumentRequests({ClassName,selectedRequest,StudentData}) {
    const { t, i18n } = useTranslation();
    const [studentData,setStudentData] = useState(null);
    useEffect(()=>{setStudentData(StudentData)},[])
    const columns = [
        { name: "ID", Header: 'ID', width: "50px" },
        { name: "RequestType", Header: 'RequestType', width: "150px" },
        { name: "Status", Header: 'Status', width: "100px" },
        { name: "Notes", Header: 'Notes', width: "200px" },
        { name: "Submission_Date", Header: 'SubmissionDate', width: "100px" },
        { name: "Last_Updated_Date", Header: 'LastUpdatedDate', width: "100px" }
      ];
  
      const data = [
        {
          ID: "D-158365",
          RequestType: t("transcript_request"),
          Status: t("Completed"),
          Notes: "Processed successfully",
          Submission_Date: "01/10/2020",
          Last_Updated_Date: "10/10/2020",
        },
        {
          ID: "D-165824",
          RequestType: t("parking_permit"),
          Status: t("Rejected"),
          Notes: "Incorrect vehicle information",
          Submission_Date: "05/12/2020",
          Last_Updated_Date: "07/12/2020",
        },
        {
          ID: "D-215489",
          RequestType: t("registration_certificate"),
          Status: t("Completed"),
          Notes: "Processed successfully",
          Submission_Date: "15/01/2021",
          Last_Updated_Date: "20/01/2021",
        },
        {
          ID: "D-241525",
          RequestType: t("student_id_card"),
          Status: t("Completed"),
          Notes: "Printed and ready for collection",
          Submission_Date: "10/03/2021",
          Last_Updated_Date: "15/03/2021",
        },
        {
          ID: "D-268412",
          RequestType: t("group_change_request"),
          Status: t("Rejected"),
          Notes: "No available spots in the requested group",
          Submission_Date: "20/04/2021",
          Last_Updated_Date: "25/04/2021",
        },
        {
          ID: "D-318526",
          RequestType: t("internship_permit"),
          Status: t("Completed"),
          Notes: "Approved by the department",
          Submission_Date: "12/06/2021",
          Last_Updated_Date: "15/06/2021",
        },
        {
          ID: "D-332841",
          RequestType: t("library_card"),
          Status: t("Completed"),
          Notes: "Ready for pick-up",
          Submission_Date: "05/09/2021",
          Last_Updated_Date: "10/09/2021",
        },
        {
          ID: "D-349214",
          RequestType: t("club_creation_request"),
          Status: t("Rejected"),
          Notes: "Incomplete proposal document",
          Submission_Date: "12/11/2021",
          Last_Updated_Date: "15/11/2021",
        },
        {
          ID: "D-412367",
          RequestType: t("specialty_change_request"),
          Status: t("Completed"),
          Notes: "Approved by academic committee",
          Submission_Date: "15/01/2022",
          Last_Updated_Date: "20/01/2022",
        },
        {
          ID: "D-458214",
          RequestType: t("block_academic_year"),
          Status: t("Completed"),
          Notes: "Student notified",
          Submission_Date: "05/03/2022",
          Last_Updated_Date: "10/03/2022",
        },
        {
          ID: "D-512369",
          RequestType: t("parking_permit"),
          Status: t("Completed"),
          Notes: "Permit issued successfully",
          Submission_Date: "20/05/2022",
          Last_Updated_Date: "25/05/2022",
        },
        {
          ID: "D-529841",
          RequestType: t("library_card"),
          Status: t("Rejected"),
          Notes: "Expired student registration",
          Submission_Date: "01/09/2022",
          Last_Updated_Date: "03/09/2022",
        },
        {
          ID: "D-614352",
          RequestType: t("group_change_request"),
          Status: t("Completed"),
          Notes: "Student transferred to Group B",
          Submission_Date: "15/11/2022",
          Last_Updated_Date: "20/11/2022",
        },
        {
          ID: "D-678254",
          RequestType: t("registration_certificate"),
          Status: t("Completed"),
          Notes: "Ready for collection",
          Submission_Date: "10/01/2023",
          Last_Updated_Date: "15/01/2023",
        },
        {
          ID: "D-712369",
          RequestType: t("internship_permit"),
          Status: t("Rejected"),
          Notes: "Missing required documents",
          Submission_Date: "25/03/2023",
          Last_Updated_Date: "28/03/2023",
        },
        {
          ID: "D-781452",
          RequestType: t("student_id_card"),
          Status: t("Completed"),
          Notes: "Renewed successfully",
          Submission_Date: "10/05/2023",
          Last_Updated_Date: "15/05/2023",
        },
        {
          ID: "D-845236",
          RequestType: t("transcript_request"),
          Status: t("Rejected"),
          Notes: "Incorrect registration number",
          Submission_Date: "01/09/2023",
          Last_Updated_Date: "03/09/2023",
        },
        {
          ID: "D-916524",
          RequestType: t("specialty_change_request"),
          Status: t("Completed"),
          Notes: "Specialty changed to Computer Science",
          Submission_Date: "20/11/2023",
          Last_Updated_Date: "25/11/2023",
        },
        {
          ID: "D-974126",
          RequestType: t("club_creation_request"),
          Status: t("Completed"),
          Notes: "Approved by university council",
          Submission_Date: "15/01/2024",
          Last_Updated_Date: "20/01/2024",
        },
        {
          ID: "D-105487",
          RequestType: t("block_academic_year"),
          Status: t("Pending"),
          Notes: "Academic year request is under review",
          Submission_Date: "10/03/2024",
          Last_Updated_Date: "15/03/2024",
        },
      ];
      
      useEffect(()=>{
        console.log(StudentData);
        setdocunentType(t(selectedRequest));
      },[selectedRequest])

    const demandeOptions = [
        t('registration_certificate'),
        t('grade_transcript'),
        t('parking_permit'),
        t('library_card'),
        t('internship_permit'),
        t('student_id_card'),
        t('block_academic_year')
    ];
    const [docunentType, setdocunentType] = useState();

    const handleChange = (e) => {
        const { value } = e.target;
        setdocunentType(value);
    };
    const AddButtonClickHandled = () => {
        switch(docunentType){
            case t('registration_certificate'):
                window.open(`/DocumentRequest/RegistrationCertificate/?name=${studentData.LastName} ${studentData.FirstName}&matricule=${studentData.Matricule}&educationYear=${studentData.EducationYear}&faculty=${studentData.Faculty}&Speciality=${studentData.Speciality}`, "_blank");
            break;
            case t('internship_permit'):
              window.open(`/DocumentRequest/InternshipPermit/?name=${studentData.LastName} ${studentData.FirstName}&matricule=${studentData.Matricule}&educationYear=${studentData.EducationYear}&Speciality=${studentData.Speciality}&internshipPlace=${studentData.internshipPlace}&internshipPeriod=${studentData.internshipPeriod }`, "_blank");

            break;
            case t('library_card'):
                window.open(`/DocumentRequest/LibaryCard/?name=${studentData.LastName} ${studentData.FirstName}&matricule=${studentData.Matricule}&Speciality=${studentData.Speciality}&educationYear=${studentData.EducationYear}`, "_blank");
            break;
            case t('parking_permit'):
                window.open(`/DocumentRequest/ParkingPermit/?name=${studentData.LastName} ${studentData.FirstName}&matricule=${studentData.Matricule}&Speciality=${studentData.Speciality}&educationYear=${studentData.EducationYear}&carId=${studentData.carId}&licenseCardId=${studentData.licenseCardId}&cardValidityYear=${studentData.cardValidityYear}`, "_blank");
            break;
            case t('grade_transcript'):
                window.open(`/DocumentRequest/GradeTranscript/?name=${studentData.LastName} ${studentData.FirstName}&matricule=${studentData.Matricule}&Speciality=${studentData.Speciality}&educationYear=${studentData.EducationYear}&section=${studentData.Section}&groupe=${studentData.Grp}`, "_blank");
            break;
            case t('student_id_card'):
                window.open(`/DocumentRequest/StudentIDCard/?name=${studentData.LastName} ${studentData.FirstName}&matricule=${studentData.Matricule}&Speciality=${studentData.Speciality}&educationYear=${studentData.EducationYear}&cardValidityYear=${studentData.cardValidityYear}`, "_blank");
            break;
            case t('block_academic_year'):
                window.open(`/DocumentRequest/BlockAcademicYear/?name=${studentData.LastName} ${studentData.FirstName}&matricule=${studentData.Matricule}&Speciality=${studentData.Speciality}&educationYear=${studentData.EducationYear}&academicYearBlocked=${studentData.academicYearBlocked}`, "_blank");
            break;
            default:
                break;
        }
        
      };

    return (
        <div className={ClassName}>
            <div className="flex justify-start items-center rounded-lg shadow-md border space-x-2 border-gray-300 m-2 w-fit p-2">
            <p className={`text-[#374151] font-bold ml-2`}>Request Type:</p>
                <ComboBoxStyle1
                    Name="Type of demande"
                    options={demandeOptions}
                    value={docunentType}
                    onChange={handleChange}
                    comboBoxClassName="rounded-md shadow-sm h-8"
                />
                <ButtonStyle1
                    buttonText={t('Add')}
                    buttonClassName={`w-20 h-8 font-bold ltr:mr-2 rtl:ml-2`}
                    onClick={AddButtonClickHandled}
                />
            </div>

            <div className="overflow-auto bg-white border border-gray-200 shadow-sm rounded-md">
              <DataGridView Columns={columns} Data={data} ClassName='ltr:ml-2 rtl:mr-2'/>
           </div>
        </div>
    );
}
