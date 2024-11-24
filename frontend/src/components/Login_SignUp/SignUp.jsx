import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import LabelStyle1 from "../custom controls/labels/LabelStyle1";
import TextBoxStyle2 from "../custom controls/textBox/TextBoxStyle2";
import ButtonStyle1 from "../custom controls/buttons/ButtonStyle1";
import ComboBoxStyle1 from "../custom controls/combo box/ComboBoxStyle1";
import Language from "components/Basics/Language";
import i18n from 'i18next';


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

    const facultyOptions = ['Informatique', 'Math', 'Physique'];
    const specialityOptions = ['Isil', 'Si'];
    const academicYearOptions = ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2'];

    const [SignUpFormData, setSignUpFormData] = useState({
        firstName: '',
        lastName: '',
        matricule: '',
        faculty: '',
        EducationYear: '',
        Specialty: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [specialityComboBoxDisabled, setSpecialityComboBoxDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        if (SignUpFormData.EducationYear === 'Licence 1' || SignUpFormData.EducationYear === 'Licence 2') {
            setSpecialityComboBoxDisabled(true);
            setSignUpFormData((prevData) => ({
                ...prevData,
                Specialty: '-'
            }));
        } else {
            setSpecialityComboBoxDisabled(false);
            setSignUpFormData((prevData) => ({
                ...prevData,
                Specialty: ''
            }));
        }
    }, [SignUpFormData.EducationYear]);

    const SignUpButtonHandled = async () => {
        if (SignUpFormData.password !== SignUpFormData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
          const response = await fetch("http://localhost/university-management/backend/your-backend-file.php?endpoint=addEtudient", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(SignUpFormData),
          });
  
          if (!response.ok) {
              const errorText = await response.text(); // Get response as plain text for debugging
              console.error("Error response:", errorText);
              alert(`Server error: ${response.status} - ${response.statusText}`);
              return;
          }
  
          const result = await response.json();
          console.log("API response:", result);
  
          if (result.success) {
              alert("Sign-up successful!");
          } else {
              alert(`Error: ${result.message}`);
          }
      } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred while signing up. Please try again later.");
        }
    };

    return (
        <div className={`${ClassName} flex flex-col items-center relative`}>
            <div className="flex justify-end w-full pb-16">
                <LabelStyle1 labelText={t('SignUp')} labelClassName="absolute left-1/2 transform -translate-x-1/2 text-3xl text-blue-600 mt-10 text-nowrap" />
                <Language ClassName="mt-2 mr-2 rtl:ml-2" onLanguageChange={handleLanguageChange} DefaultLanguage={i18n.language} />
            </div>

            <form className="flex flex-col w-[90%]">
                <div className="space-y-4">
                    <div className="flex">
                        <div className="flex flex-col ml-1 mr-1 w-full">
                            <LabelStyle1 labelText={`${t('FirstName')}:`} labelClassName="text-sm ml-1 mr-1" />
                            <TextBoxStyle2
                                Name='firstName'
                                placeholder={`${t('FirstName')}`}
                                value={SignUpFormData.firstName}
                                onChange={handleChange}
                                textBoxClassName="w-full border rounded-md shadow-sm pr-1"
                            />
                        </div>
                        <div className="flex flex-col mr-1 w-full">
                            <LabelStyle1 labelText={`${t('LastName')}:`} labelClassName="text-sm ml-1" />
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
                        <LabelStyle1 labelText={`${t('Matricule')}:`} labelClassName="text-sm ml-1 text-nowrap" />
                        <TextBoxStyle2
                            Name='matricule'
                            placeholder="222231354689"
                            value={SignUpFormData.matricule}
                            onChange={handleChange}
                            textBoxClassName="w-full border rounded-md shadow-sm pr-1"
                        />
                    </div>

          <div className="flex space-x-1 items-center w-[90%]">
            <LabelStyle1 labelText={`${t('AcademicYear')}:`} labelClassName="text-sm ml-1 text-nowrap" />
            <ComboBoxStyle1
              Name="EducationYear"
              options={academicYearOptions}
              value={SignUpFormData.EducationYear}
              onChange={handleChange}
              comboBoxClassName={`w-full`}
            />
            <LabelStyle1 labelText={`${t('Speciality')}:`} labelClassName="text-sm ml-1" />
            <ComboBoxStyle1
              Name="Specialty"
              options={specialityOptions}
              value={SignUpFormData.Specialty}
              onChange={handleChange}
              disabled={specialityComboBoxDisabled}
              comboBoxClassName={`${specialityComboBoxDisabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'} w-full`}
            />
          </div>
                    <div className="flex space-x-1 items-center">
                        <LabelStyle1 labelText={`${t('Faculty')}:`} labelClassName="text-sm ml-1" />
                        <ComboBoxStyle1
                            Name="faculty"
                            options={facultyOptions}
                            value={SignUpFormData.faculty}
                            onChange={handleChange}
                            comboBoxClassName="w-full border rounded-md shadow-sm"
                        />
                    </div>

                   

                    <div className="flex space-x-1">
                        <LabelStyle1 labelText={`${t('Email')}:`} labelClassName="text-md w-auto ml-1" />
                        <TextBoxStyle2
                            Name='email'
                            textBoxtype='email'
                            placeholder="example@gmail.com"
                            value={SignUpFormData.email}
                            onChange={handleChange}
                            textBoxClassName="border rounded-md shadow-sm flex-grow pr-1 text-nowrap"
                        />
                    </div>

                    <div className="flex space-x-1 w-full">
                        <div className="flex flex-col ml-1 w-full">
                            <LabelStyle1 labelText={`${t('Password')}:`} labelClassName="text-sm mr-1" />
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
                            <LabelStyle1 labelText={`${t('ConfirmPassword')}:`} labelClassName="text-sm mr-1 text-nowrap" />
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
      </form>

      <p className="text-gray-400 text-xs mt-2 ltr:mr-auto rtl:ml-auto rtl:mr-6 ltr:ml-6">
      {`${t('AlreadyHaveAnAccount')}`}
        <button onClick={SingInButtonHandled} className="text-blue-400 hover:underline rtl:mr-1 ltr:ml-1"> {`${t('Login')}`}</button>
      </p>
    </div>
  );
}
