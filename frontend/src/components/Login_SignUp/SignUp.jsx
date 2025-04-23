import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import LabelStyle1 from "../custom controls/labels/LabelStyle1";
import TextBoxStyle2 from "../custom controls/textBox/TextBoxStyle2";
import ButtonStyle1 from "../custom controls/buttons/ButtonStyle1";
import ComboBoxStyle1 from "../custom controls/combo box/ComboBoxStyle1";
import Language from "components/Basics/Language";
import i18n from 'i18next';
import Student from "js/models/Student";
import { faL } from "@fortawesome/free-solid-svg-icons";


export default function SignUp({ SingInButtonHandled,ClassName,currentLanguage,setCurrentLanguage}) {
  const { t, i18n } = useTranslation();
    useEffect(()=>{
      i18n.changeLanguage(currentLanguage);
      const html = document.documentElement;
      html.setAttribute('lang', i18n.language);
      html.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  },[currentLanguage])

    useEffect(()=>{
      setCurrentLanguage(i18n.language);
    },[i18n.language])

    useEffect(()=>{
      const params = new URLSearchParams(window.location.search);
      const email = params.get('email');
      if(email) SignUpFormData.email = email;
    },[])

   
    const handleLanguageChange = (lang) => {
        setCurrentLanguage(lang);
    };

    const GroupOptions = ['1', '2', '3' , '4' , '5'];
    const SectionOptions = ['1', '2'];
    const Branchs = ['LMD','ING',"LP"];
    const [academicYearOptions,setAcademicYearOptions] = useState(['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2']);
    const [specialityOptions,setSpecialityOptions] = useState([]);
    const [specialityVisibility,setSpecialityVisibility] = useState(false);

    const [SignUpFormData, setSignUpFormData] = useState({
        matricule: '',
        firstName: '',
        lastName: '',
        section: '',
        group: '',
        Branch: 'LMD',
        educationYear: '',
        specialty: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
        
    });

    {/*
      useEffect(() => {
      if (SignUpFormData.educationYear === 'Licence 3') {
        setSpecialityComboBoxDisabled(false);
      } else {
        setSpecialityComboBoxDisabled(true);
        setSignUpFormData((prevData) => ({
            ...prevData,
            Specialty: '-'
        }));
      }
  }, [SignUpFormData.educationYear]);
      */}


    /*const [specialityComboBoxDisabled, setSpecialityComboBoxDisabled] = useState(true);*/


    
    const handleChange = (e) => {
        const { name, value } = e.target;
      
        setSignUpFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const BranchsHandleChange = (e)=>{
      handleChange(e);
      switch(e.target.value){
        case 'LMD':
          setAcademicYearOptions(['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2']);
          SignUpFormData.educationYear = "Licence 1";
          setSpecialityVisibility(false);
          break;
          case 'ING':
          setAcademicYearOptions(['ingenieur 1','ingenieur 2','ingenieur 3','ingenieur 4','ingenieur 5',]);
          SignUpFormData.educationYear = "ingenieur 1";
          setSpecialityVisibility(false);
          break;
          case 'LP':
            setAcademicYearOptions(['Licence 1', 'Licence 2', 'Licence 3']);
            SignUpFormData.educationYear = "Licence 1";
            setSpecialityVisibility(false);
            break;
          default:
            break;
      }
    };

    const EducationYearHandChange = (e)=>{
      handleChange(e);
      switch(e.target.value){
        case 'Master 1':
          setSpecialityVisibility(true);
          setSpecialityOptions(['ILT','TI']);
          break;
          case 'ingenieur 3':
            setSpecialityVisibility(true);
            setSpecialityOptions(['GL']);
            break;
            case 'Licence 3':
              setSpecialityVisibility(true);
              if(SignUpFormData.Branch === "LMD"){
                setSpecialityOptions(['ISIL','SI']);
              }else{
                setSpecialityOptions(['DWI']);
              }
            break;
          default:
            setSpecialityVisibility(false);
            break;
      }
    };

    const SignUpButtonHandled = async () => {
        if (SignUpFormData.password !== SignUpFormData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
            // التحقق من أن رقم الهاتف ليس فارغًا
    if (!SignUpFormData.phoneNumber.trim()) {
      alert("Phone nuumber cannot be empty!");
      return;
  }

  console.log("Form Data:", SignUpFormData);
        //alert(SignUpFormData.specialty);
        Student.addEtudient({
          matricule: SignUpFormData.matricule,
          firstName: SignUpFormData.firstName,
          lastName: SignUpFormData.lastName,
          educationYear: SignUpFormData.educationYear,
          speciality: SignUpFormData.specialty,
          section: SignUpFormData.section,
          group: SignUpFormData.group,
          email: SignUpFormData.email,
          password: SignUpFormData.password,
          phoneNumber: SignUpFormData.phoneNumber
      });
              
    };

    return (
        <div className={`${ClassName} flex flex-col items-center relative`}>
            <div className="flex justify-end w-full pb-16">
                <LabelStyle1 labelText={'SignUp'} labelClassName="absolute left-1/2 transform -translate-x-1/2 text-3xl text-blue-600 mt-10 text-nowrap" />
                <Language ClassName="mt-2 mr-2 rtl:ml-2" onLanguageChange={handleLanguageChange} DefaultLanguage={i18n.language} />
            </div>

            <div className="flex flex-col w-[90%]">
                <div className="space-y-4">
                    <div className="flex">
                        <div className="flex flex-col ml-1 mr-1 w-full">
                            <LabelStyle1 labelText={`${t('FirstName')} :`} labelClassName="text-sm ml-1 mr-1" />
                            <TextBoxStyle2
                                Name='firstName'
                                placeholder={`${t('FirstName')}`}
                                value={SignUpFormData.firstName}
                                onChange={handleChange}
                                textBoxClassName="w-full border rounded-md shadow-sm pr-1"
                            />
                        </div>
                        <div className="flex flex-col mr-1 w-full">
                            <LabelStyle1 labelText={`${t('LastName')} :`} labelClassName="text-sm ml-1" />
                            <TextBoxStyle2
                                Name='lastName'
                                placeholder={`${t('LastName')}`}
                                value={SignUpFormData.lastName}
                                onChange={handleChange}
                                textBoxClassName="w-full border rounded-md shadow-sm pr-1"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-1 items-center">
                        <LabelStyle1 labelText={`${t('Matricule')} :`} labelClassName="text-sm ml-1 text-nowrap" />
                        <TextBoxStyle2
                            Name='matricule'
                            placeholder="222231354689"
                            value={SignUpFormData.matricule}
                            onChange={handleChange}
                            textBoxClassName="w-full border rounded-md shadow-sm pr-1"
                        />
                    </div>

          <div className="flex space-x-1 items-center">
          <LabelStyle1 labelText={`${t('Branch')} :`} labelClassName="text-sm ml-1 text-nowrap" />
            <ComboBoxStyle1
              Name="Branch"
              options={Branchs}
              value={SignUpFormData.Branch}
              onChange={BranchsHandleChange}
              comboBoxClassName={`${specialityVisibility ? 'w-fit' : 'w-full'}`}
            />
            <LabelStyle1 labelText={`${t('AcademicYear')} :`} labelClassName="text-sm ml-1 text-nowrap" />
            <ComboBoxStyle1
              Name="educationYear"
              options={academicYearOptions}
              value={SignUpFormData.educationYear}
              onChange={EducationYearHandChange}
              comboBoxClassName={`w-full`}
            />
            <LabelStyle1 labelText={`${t('Speciality')} :`} labelClassName={`text-sm ml-1 text-nowrap ${specialityVisibility ? 'block' : 'hidden'}`}/>
            <ComboBoxStyle1
              Name="specialty"
              options={specialityOptions}
              value={SignUpFormData.specialty}
              onChange={handleChange}
              comboBoxClassName={` ${specialityVisibility ? 'block' : 'hidden'} w-fit`}
            />
          </div>

          <div className="flex space-x-1 items-center">
            <LabelStyle1 labelText={`${t('Section')} :`} labelClassName="text-sm ml-1 text-nowrap" />
            <ComboBoxStyle1
              Name="section"
              options={SectionOptions}
              value={SignUpFormData.section}
              onChange={handleChange}
              comboBoxClassName={`w-full`}
            />
            <LabelStyle1 labelText={`${t('Group')} :`} labelClassName="text-sm ml-1 text-nowrap" />
            <ComboBoxStyle1
              Name="group"
              options={GroupOptions}
              value={SignUpFormData.group}
              onChange={handleChange}
              comboBoxClassName={` w-full`}
            />
          </div>

                   

                    <div className="flex space-x-1">
                        <LabelStyle1 labelText={`${t('Email')} :`} labelClassName="text-md w-auto ml-1" />
                        <TextBoxStyle2
                            Name='email'
                            textBoxtype='email'
                            placeholder="example@gmail.com"
                            value={SignUpFormData.email}
                            onChange={handleChange}
                            textBoxClassName="border rounded-md shadow-sm flex-grow pr-1 text-nowrap"
                        />
                    </div>

                    
                    <div className="flex space-x-1">
                    <LabelStyle1  labelClassName="text-md w-auto ml-1" />
                    <TextBoxStyle2
                            Name='phoneNumber'
                   
                            placeholder="Enter your phone number"
                            value={SignUpFormData.phoneNumber}
                            onChange={handleChange}
                            textBoxClassName="border rounded-md shadow-sm flex-grow pr-1 text-nowrap"
                        />
                    </div>
                    <div className="flex space-x-1 w-full">
                        <div className="flex flex-col ml-1 w-full">
                            <LabelStyle1 labelText={`${t('Password')} :`} labelClassName="text-sm mr-1" />
                            <TextBoxStyle2
                                Name='password'
                                type='password'
                                placeholder={`${t('Password')}`}
                                value={SignUpFormData.password}
                                onChange={handleChange}
                                textBoxClassName="w-[90%] border rounded-md shadow-sm pr-1"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <LabelStyle1 labelText={`${t('ConfirmPassword')} :`} labelClassName="text-sm mr-1 text-nowrap" />
                            <TextBoxStyle2
                                Name='confirmPassword'
                                type='password'
                                placeholder={`${t('ConfirmPassword')}`}
                                value={SignUpFormData.confirmPassword}
                                onChange={handleChange}
                                textBoxClassName="w-full border rounded-md shadow-sm pr-1"
                            />
                        </div>
                    </div>
                </div>

           
        <ButtonStyle1
          buttonText={`${t('SignUp')}`}
          buttonClassName="items-center w-full mt-8"
          onClick={SignUpButtonHandled}
        />
      </div>

      <p className="text-gray-400 text-xs mt-2 ltr:mr-auto rtl:ml-auto rtl:mr-6 ltr:ml-6">
      {`${t('AlreadyHaveAnAccount')}`}
        <button onClick={SingInButtonHandled} className="text-blue-400 hover:underline rtl:mr-1 ltr:ml-1"> {`${t('Login')}`}</button>
      </p>
    </div>
  );
}
