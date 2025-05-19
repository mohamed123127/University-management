import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function AttestationBonneConduite1() {
  const { t } = useTranslation();
  const location = useLocation();
  const type = 'attestationBonneConduite2';
  const studentId = localStorage.getItem('id');
  const documentRef = useRef();


  const params = new URLSearchParams(location.search);
  const LastName = params.get('LastName');
  const FirstName = params.get('FirstName');
  const matricule = params.get('matricule');
  const speciality = params.get('Speciality');


  const handleValidateClick = async () => {
    try {
      const pdf = await PdfGenerator.generate(documentRef);
      const pdfData = { matricule,name: LastName + " " + FirstName, type };

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
  className="bg-white p-8 rounded-lg shadow-md mx-auto border-2 border-gray-300 text-sm"
  dir="ltr"
  style={{ width: '704px', height: '1090px', padding: '40px', boxSizing: 'border-box', position: 'relative' }}
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


        <div className="flex justify-between mt-6 font-bold">
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

       
        <h2 className="mt-16 text-l font-semibold  mb-6 text-center underline">Attestation <br></br>de bonne conduite</h2>

        <div className="text-left text-lg mb-4 ml-14 mt-10 space-y-0.5 leading-5 font-serif">
         <p>Le Chef de département d’Informatique, atteste que l’étudiante :</p>
         <div className='ml-8'>
         <p>● Nom : {LastName}</p>
         <p>● Prénom : {FirstName}</p>
         <p>● Date de Naissance : à</p>
         </div>

         <p>
           A obtenu le diplôme Licence en Informatique ,<br />
           Spécialité  {speciality} en l’année universitaire …….. sous le matricule {matricule}<br /><br />
           L’intéressée a eu une bonne conduite durant son cursus universitaire<br /> et
           n’a pas été soumis au conseil de disciplinaire.
        </p>
      </div>
      <p className="pl-10 mt-20 italic">
        Cette attestation est délivrée à la demande de l’étudiant(e) pour servir  et valoir ce qui est de droit.
          </p>
       
        <div className='mt-16'>
        <p className="mt-20 mr-5 font-semibold text-right font-serif">Le Chef de département</p>
         <img src={umbblocal} alt="University localisation" className="w-250 h-30 ltr mt-28" />
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
