import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function Attestation3() {
  const { t } = useTranslation();
  const location = useLocation();
  const documentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const type = 'attestationDeLangue';
  const studentId = localStorage.getItem('id');
  const params = new URLSearchParams(location.search);
  const FirstName = params.get('FirstName');
  const LastName = params.get('LastName');  const matricule = params.get('matricule');
  const speciality = params.get('Speciality');
  const educationYear = params.get('educationYear');

  const handleValidate = async () => {
    setIsLoading(true);
    try {
      const pdf = await PdfGenerator.generate(documentRef);
      const pdfData = { matricule,name:LastName + " " + FirstName, type };

      const saveResult = await DocumentRequest.SaveDocumentRequestAsPdf(pdf, pdfData);

      if (saveResult.success) {
        const dbResult = await DocumentRequest.SaveDocumentRequestInDb({
          documentUrl: saveResult.fileUrl,
          type,
          studentId
        });

        alert(dbResult.success ? dbResult.message : "لم يتم حفظ في قاعدة البيانات");
      } else {
        alert('لم يتم حفظ الملف.\n' + saveResult.message);
      }
    } catch (err) {
      alert("حدث خطأ أثناء التوليد: " + err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 w-full flex flex-col items-center">
      <div
        ref={documentRef}
        className="bg-white p-8 rounded-lg shadow-md mx-auto border-2 border-gray-300 text-sm"
        dir="ltr"
        style={{ width: '704px', height: '1100px', padding: '40px', position: 'relative' }}
      >
        <div className="flex justify-between items-center mb-4">
          <img src={uniBoumrdas} alt="University Logo" className="w-24 h-24" />
          <div className="text-center flex-1 font-bold">
            <h1>الجمهورية الجزائرية الديمقراطية الشعبي</h1>
            <h1>Democratic and People's Republic of Algeria</h1>
            <h1>وزارة التعليم العالي والبحث العلمي</h1>
            <h2>Ministry of Higher Education and Scientific Research</h2>
            <h1>جامعة أمحمد بوقرة- بومرداس</h1>
            <h1>Mhamed Bougara University - Boumerdès</h1>
          </div>
        </div>

        <div className="flex justify-between font-bold mb-4">
          <div className="text-left">
            <h2>Faculté des sciences</h2>
            <h2>Département d’informatique</h2>
            <h2 className="pt-3">N° ……/SL/2025</h2>
          </div>
          <div className="text-right">
            <h2>كـــــــــــــــــــــــــــــلية العلـــــــــــــــــــــوم</h2>
            <h2>قسم الإعلام الآلي</h2>
            <h2 className="text-left pt-3">Boumerdès le :</h2>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-bold mb-4 text-center underline">Attestation de Langue</h2>

        <div className="text-justify leading-8 text-[18px] my-6 font-serif">
          <p>
            Je, soussigné, le chef de département d’informatique, certifie que l’étudiant {LastName + " " +  FirstName} , né le ………,
            a obtenu le diplôme de …… en Informatique – spécialité : {speciality} en l’année universitaire ……., sous le matricule {matricule}.
          </p>
          <p className="mt-4">
            Par ailleurs, le programme de la formation qu’il a suivi durant son cursus s’est effectué en langue ……… en globalité.
          </p>
          <p className="mt-20 mr-5 font-semibold text-right">Le Chef de département</p>
        </div>

        <div className="absolute bottom-10 left-14 right-14 text-justify text-[13px] italic">
          <p className="pl-10  mb-10">
            Cette attestation est délivrée à la demande de l’étudiant(e) pour servir et valoir ce que de droit.
          </p>
          <div className="flex justify-center mt-20">
            <img src={umbblocal} alt="University localisation" className="w-250 h-30" />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <ButtonStyle1
          onClick={handleValidate}
          buttonClassName="px-6 py-2 bg-green-500 font-bold w-28 text-white rounded-md hover:bg-green-600"
          buttonText={t('send')}
        />
        <ButtonStyle1
          onClick={() => window.close()}
          buttonClassName="px-6 py-2 bg-red-600 font-bold text-white w-28 rounded-md hover:bg-red-700"
          buttonText={t('close')}
        />
      </div>
    </div>
  );
}
