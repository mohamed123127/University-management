import React, { useEffect, useState } from "react";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import DataGridView from "components/custom controls/data grid view/dataGridViewStyle1";
import { useTranslation } from 'react-i18next';
import Student from "js/models/Student";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import DocumentRequest from "js/models/DocumentRequest";

export default function DocumentRequests({ ClassName, selectedRequest,StudentData }) {
    const { t, i18n } = useTranslation();
    const [docunentType, setdocunentType] = useState();
    const [addParkignData, setaddParkignData] = useState(false); 
    const [carId, setCarId] = useState(""); 
    const [licenseCardId, setLicenseCardId] = useState(""); 
    const [addIntershipPermitData, setaddIntershipPermitData] = useState(false);
    const [internshipPlace, setinternshipPlace] = useState(""); 
    const [internshipPeriod, setinternshipPeriod] = useState(""); 

 

    const columns = [
        { name: "ID", Header: 'requestID', width: "50px" },
        { name: "Type", Header: 'RequestType', width: "150px" },
        { name: "Status", Header: 'Status', width: "100px" },
        { name: "Notes", Header: 'Notes', width: "200px" },
        { name: "SubmissionDate", Header: 'SubmissionDate', width: "100px" },
        { name: "LastUpdatedDate", Header: 'LastUpdatedDate', width: "100px" }

    ];

    
    

    
    const [data , setData]=useState([]);
    useEffect(()=>{
      setdocunentType(t(selectedRequest));
    },[selectedRequest])
    
      useEffect(() => {
       
        window.addEventListener("storage", () => {
            window.location.reload(true);
        });
    
    }, []);    
    
    const demandeOptions = [
        t('registration_certificate'),
        t('grade_transcript'),
        t('parking_permit'),
        t('library_card'),
        t('internship_permit'),
        t('studentCard'),
        t('block_academic_year'),
        t('bon_conduit'),
        t('classement'),
        t('convention_de_stage'),
        t('copie_de_bac_rectorat'),
        t('releve_de_note_inh'),
        t('block_d_annee_rectorat'),
        t('attestation_de_langue'),
        t('accise_de_diplome')
    ];
    

    const handleChange = (e) => {
        const { value } = e.target;
        setdocunentType(value);       
    };

    useEffect(()=>{
        const loadData =async()=>{
            setData(await DocumentRequest.getById(StudentData.Id));
        }
       loadData();
  },[])
    const AddButtonClickHandled = () => {
      switch(docunentType){
          case t('registration_certificate'):
              window.open(`/DocumentRequest/RegistrationCertificate/?name=${StudentData.LastName} ${StudentData.FirstName}&matricule=${StudentData.Matricule}&educationYear=${StudentData.EducationYear}&faculty=${StudentData.Faculty}&Speciality=${StudentData.Speciality}`, "_blank");
          break;
          case t('internship_permit'):
            window.open(`/DocumentRequest/InternshipPermit/?name=${StudentData.LastName} ${StudentData.FirstName}&matricule=${StudentData.Matricule}&educationYear=${StudentData.EducationYear}&Speciality=${StudentData.Speciality}&internshipPlace=${internshipPlace}&internshipPeriod=${internshipPeriod }`, "_blank");
           
          break;
          case t('library_card'):
              window.open(`/DocumentRequest/LibaryCard/?name=${StudentData.LastName} ${StudentData.FirstName}&matricule=${StudentData.Matricule}&Speciality=${StudentData.Speciality}&educationYear=${StudentData.EducationYear}`, "_blank");
          break;
          case t('parking_permit'):
              window.open(`/DocumentRequest/ParkingPermit/?name=${StudentData.LastName} ${StudentData.FirstName}&matricule=${StudentData.Matricule}&Speciality=${StudentData.Speciality}&educationYear=${StudentData.EducationYear}&carId=${carId}&licenseCardId=${licenseCardId}`, "_blank");
          break;
          case t('grade_transcript'):
              window.open(`/DocumentRequest/GradeTranscript/?name=${StudentData.LastName} ${StudentData.FirstName}&matricule=${StudentData.Matricule}&Speciality=${StudentData.Speciality}&educationYear=${StudentData.EducationYear}&section=${StudentData.Section}&groupe=${StudentData.Grp}`, "_blank");
          break;
          case t('studentCard'):
              window.open(`/DocumentRequest/StudentIDCard/?name=${StudentData.LastName} ${StudentData.FirstName}&matricule=${StudentData.Matricule}&Speciality=${StudentData.Speciality}&educationYear=${StudentData.EducationYear}`, "_blank");
          break;
          case t('block_academic_year'):
              window.open(`/DocumentRequest/BlockAcademicYear/?name=${StudentData.LastName} ${StudentData.FirstName}&matricule=${StudentData.Matricule}&Speciality=${StudentData.Speciality}&educationYear=${StudentData.EducationYear}`, "_blank");
          break;


          default:
              break;
      }
      
    };

    return (
        <div className={ClassName}>
            <div className="flex items-center justify-between rounded-lg shadow-md border border-gray-300 p-4">
                {/* ComboBox, TextBoxes, and Button Section */}
                <div className="flex items-center space-x-4">
                    <p className="text-[#374151] font-bold">{t('RequestType')}</p>
                    <ComboBoxStyle1
                        Name="Type of demande"
                        options={demandeOptions}
                        value={docunentType}
                        onChange={handleChange}
                        comboBoxClassName="rounded-md shadow-sm h-8"
                    />
                    
                   
                    {docunentType===t('parking_permit') && (
                        <>
                            <TextBoxStyle2
                                type="text"
                                placeholder={'EnterCarID'}
                                value={carId}
                                onChange={(e) => setCarId(e.target.value)}
                                className="h-8"
                            />
                            <TextBoxStyle2
                                type="text"
                                placeholder={'EnterLicenseCardID'}
                                value={licenseCardId}
                                onChange={(e) => setLicenseCardId(e.target.value)}
                                className="h-8"
                            />
                        </>
                    )}
                      {docunentType===t('internship_permit')&& (
                        <>
                            <TextBoxStyle2
                                type="text"
                                placeholder={'EnterInternshipPlace'}
                                value={internshipPlace}
                                onChange={(e) => setinternshipPlace(e.target.value)}
                                className="h-8"
                            />
                            <TextBoxStyle2
                                type="text"
                                placeholder={'EnterInternshipPeriod'}
                                value={internshipPeriod}
                                onChange={(e) => setinternshipPeriod(e.target.value)}
                                className="h-8"
                            />
                        </>
                    )}
                    
                    {/* Add Button */}
                    <ButtonStyle1
                        buttonText={'Add'}
                        buttonClassName="w-20 h-8 font-bold"
                        onClick={AddButtonClickHandled}
                    />
                </div>

                </div>
                <DataGridView Columns={columns} Data={data} ClassName="table-auto" />    
                </div>
        
    

    

);
}