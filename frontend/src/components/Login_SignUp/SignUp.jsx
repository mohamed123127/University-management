import React, { useEffect, useState } from "react";
import LabelStyle1 from "../custom controls/labels/LabelStyle1";
import TextBoxStyle2 from "../custom controls/textBox/TextBoxStyle2";
import ButtonStyle1 from "../custom controls/buttons/ButtonStyle1";
import ComboBoxStyle1 from "../custom controls/combo box/ComboBoxStyle1";

export default function SignUp({ SingInButtonHandled }) {
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
        Specialty: '-' // تعيين القيمة إلى '-'
      }));
    } else {
      setSpecialityComboBoxDisabled(false);
      setSignUpFormData((prevData) => ({
        ...prevData,
        Specialty: '' // إعادة تعيين القيمة إذا كانت ليست Licence 1 أو 2
      }));
    }
  }, [SignUpFormData.EducationYear]);

  const SignUpButtonHandled = () => {
    alert("wsh moooooh!");
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-6 bg-white rounded-lg shadow-md">
      <LabelStyle1 labelText="Sign Up" labelClassName="text-3xl mb-6 text-blue-600" />
      <form className="flex flex-col w-full">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex flex-col">
              <LabelStyle1 labelText="First Name:" labelClassName="text-sm ml-1" />
              <TextBoxStyle2
                Name='firstName'
                placeholder="First name"
                value={SignUpFormData.firstName}
                onChange={handleChange}
                textBoxClassName="w-full border rounded-md shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <LabelStyle1 labelText="Last Name:" labelClassName="text-sm ml-1" />
              <TextBoxStyle2
                Name='lastName'
                placeholder="Last name"
                value={SignUpFormData.lastName}
                onChange={handleChange}
                textBoxClassName="w-full border rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="flex space-x-1 items-center">
            <LabelStyle1 labelText="Matricule:" labelClassName="text-sm" />
            <TextBoxStyle2
              Name='matricule'
              placeholder="222231354689"
              value={SignUpFormData.matricule}
              onChange={handleChange}
              textBoxClassName="w-full border rounded-md shadow-sm"
            />
          </div>

          <div className="flex space-x-1 items-center">
            <LabelStyle1 labelText="Faculty:" labelClassName="text-sm" />
            <ComboBoxStyle1
              Name="faculty"
              options={facultyOptions}
              value={SignUpFormData.faculty}
              onChange={handleChange}
              comboBoxClassName="w-full border rounded-md shadow-sm"
            />
          </div>

          <div className="flex space-x-1 items-center">
            <LabelStyle1 labelText="Academic Year:" labelClassName="text-sm" />
            <ComboBoxStyle1
              Name="EducationYear"
              options={academicYearOptions}
              value={SignUpFormData.EducationYear}
              onChange={handleChange}
            />
            <LabelStyle1 labelText="Speciality:" labelClassName="text-sm" />
            <ComboBoxStyle1
              Name="Specialty"
              options={specialityOptions}
              value={SignUpFormData.Specialty}
              onChange={handleChange}
              disabled={specialityComboBoxDisabled}
              comboBoxClassName={`${specialityComboBoxDisabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
            />
          </div>

          <div className="flex space-x-1">
            <LabelStyle1 labelText="Email:" labelClassName="text-md w-auto" />
            <TextBoxStyle2
              Name='email'
              textBoxtype='email'
              placeholder="example@gmail.com"
              value={SignUpFormData.email}
              onChange={handleChange}
              textBoxClassName="border rounded-md shadow-sm flex-grow"
            />
          </div>

          <div className="flex space-x-2">
            <div className="flex flex-col">
              <LabelStyle1 labelText="Password:" labelClassName="text-sm ml-1" />
              <TextBoxStyle2
                Name='password'
                type='password'
                placeholder="Password"
                value={SignUpFormData.password}
                onChange={handleChange}
                textBoxClassName="w-full border rounded-md shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <LabelStyle1 labelText="Confirm Password:" labelClassName="text-sm ml-1" />
              <TextBoxStyle2
                Name='confirmPassword'
                type='password'
                placeholder="Confirm password"
                value={SignUpFormData.confirmPassword}
                onChange={handleChange}
                textBoxClassName="w-full border rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        <ButtonStyle1
          buttonText="Sign Up"
          buttonClassName="items-center w-full mt-10"
          onClick={SignUpButtonHandled}
        />
      </form>

      <p className="text-gray-400 text-xs mt-4">
        Already have an account?
        <button onClick={SingInButtonHandled} className="text-blue-400 hover:underline"> Sign In</button>
      </p>
    </div>
  );
}
