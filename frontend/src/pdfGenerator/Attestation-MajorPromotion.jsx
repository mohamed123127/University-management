import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function AttestationMajorPromotion() {
  
  const { t } = useTranslation();
  const location = useLocation();
  const type = 'Attestation-MajorPromotion';
  const studentId = localStorage.getItem('id');
  const documentRef = useRef();


  const params = new URLSearchParams(location.search);
  const FirstName = params.get('FirstName');
  const LastName = params.get('LastName');
  const matricule = params.get('matricule');
  const speciality = params.get('Speciality');
  const educationYear = params.get('educationYear');


  const handleValidateClick = async () => {
    try {
      const pdf = await PdfGenerator.generate(documentRef);
      const pdfData = { matricule,name:LastName + " " + FirstName, type };

      const result = await DocumentRequest.SaveDocumentRequestAsPdf(pdf, pdfData);

      if (result.success) {
        const fileUrl = result.fileUrl;

        const dbData = {
          documentUrl: fileUrl,
          type,
          studentId
        };

        const dbResult = await DocumentRequest.SaveDocumentRequestInDb(dbData);

        if (dbResult.success) {
          alert(dbResult.message);
        } else {
          alert("لم يتم حفظ في قاعدة البيانات");
        }
      } else {
        alert(`لم يتم حفظ الملف. تأكد من الخادم.\n${result.message}`);
      }
    } catch (error) {
      alert("حدث خطأ أثناء توليد وحفظ الوثيقة: " + error);
      console.error(error);
    }
  };

  return (
    <div className="p-4 w-full">

      <div
        ref={documentRef}
        className="bg-white p-8 rounded-lg shadow-md mx-auto border-2 border-gray-300"
        dir="ltr"
        style={{ width: '794px', height: '1123px', padding: '40px', boxSizing: 'border-box' }}
      >
 
        <div className="flex justify-between items-center mb-2">
          <img src={uniBoumrdas} alt="University Logo" className="w-24 h-23 ltr" />
          <div className="text-center flex-1 font-bold">
            <h1>الجمهورية الجزائرية الديمقراطية الشعبي</h1>
            <h1>Democratic and People's Republic of Algeria</h1>
            <h1>وزارة التعليم العالي والبحث العلمي</h1>
            <h2>Ministry of Higher Education and Scientific Research</h2>
            <h1>جامعة أمحمد بوقرة- بومرداس</h1>
            <h1>Mhamed Bougara University - Boumerdès</h1>
          </div>
        </div>


        <div className="flex justify-between font-bold">
          <div className="text-left ltr">
            <h2>Faculté des sciences</h2>
            <h2>Département d’informatique</h2>
            <h2 className="pt-3">N° ……/SL/2025</h2>
          </div>

          <div className="text-right rtl">
            <h2>كـــــــــــــــــــــــــــــلية العلـــــــــــــــــــــوم</h2>
            <h2>قسم الإعلام الآلي</h2>
            <h2 className="text-left ltr pt-3">Boumerdès le : </h2>
          </div>
        </div>

        {/* عنوان الوثيقة */}
        <h2 className="mt-12 text-2xl font-bold mb-4 text-center underline">Attestation-Major de Promotion</h2>

        {/* محتوى الوثيقة */}
        <div className="text-left mb-4 space-y-4 leading-8">
          <p>Vu les procès-verbaux des délibérations, je, soussigné, Chef de département de la faculté de sciences, atteste que l’étudiant :</p>
          <p><span className="font-semibold">Nom :</span> {LastName}</p>
          <p><span className="font-semibold">Prénom :</span>{FirstName} </p>
          <p><span className="font-semibold">Date et lieu de naissance :</span> ….. à ………..</p>
          <p><span className="font-semibold">Matricule :</span> {matricule}</p>
          <p><span className="font-semibold">Domaine :</span> Mathématiques et Informatique</p>
          <p><span className="font-semibold">Filière :</span> Informatique</p>
          <p><span className="font-semibold">Spécialité :</span> {speciality}</p>
          <p>Est classé, sans rattrapage, sans redoublement et dans le même parcours de formation, le premier de sa promotion de ……. étudiants, avec une moyenne de ………./20.</p>
          <p>Le classement tient compte des deux années des études pour trois année prévues dans cursus.</p>
          <p className="mt-8">Cette attestation est délivrée à l’intéressé pour servir et faire valoir ce que de droit.</p>
          <p className="mt-10 mr-5 font-semibold text-right font-serif">Le Chef de département</p>
        </div>

   
        <div>
          <img src={umbblocal} alt="University localisation" className="w-250 h-30 ltr" />
        </div>
      </div>


      <div className="flex justify-center mt-4 space-x-4">
        <ButtonStyle1
          onClick={handleValidateClick}
          buttonClassName="px-6 py-2 bg-green-500 font-bold w-24 text-white rounded-md hover:bg-green-600"
          buttonText={t('send')}
        />
        <ButtonStyle1
          onClick={() => window.close()}
          buttonClassName="px-6 py-2 bg-red-600 font-bold text-white w-24 rounded-md hover:bg-red-700"
          buttonText={t('close')}
        />
      </div>
    </div>
  );
}
