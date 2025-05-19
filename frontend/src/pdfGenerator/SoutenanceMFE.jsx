import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from "lucide-react";
import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function SoutenanceMFE() {
  const { t } = useTranslation();
  const location = useLocation();
  const type = 'block_academic_year';
  const studentId = localStorage.getItem('id');
  const documentRef = useRef();


  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  //const matricule = params.get('matricule');
  const speciality = params.get('Speciality');
  const educationYear = params.get('educationYear');


  const handleValidateClick = async () => {
    try {
      const pdf = await PdfGenerator.generate(documentRef);
      const pdfData = {  name,speciality,educationYear, type };

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
            <h2 className="text-left ltr pt-3">Boumerdès le :</h2>
          </div>
        </div>

       
        <h2 className="mt-16 text-3xl font-semibold mb-6 text-center">
          <span className="underline">Soutenance de MFE</span><br />
          <span className="underline">Niveau : {educationYear}</span>
        </h2>

       
        <div className="space-y-10">
          <div className="text-xl font-semibold space-y-5 ml-5">
            <div className="flex justify-between">
              <p><span className="underline">L'étudiant(e) :</span> <span>{name}</span></p>
              <p className="mr-16"><span className="underline">N° d'inscription :</span> ............</p>
            </div>
            <p><span className="underline">Spécialité : {speciality}</span> </p>
            <p><span className="underline">Sujet :</span> .........................................</p>
          </div>

       
          <table className="w-[95%] ml-5 border-collapse border border-black">
            <thead>
              <tr className="h-8">
                <th className="bg-gray-200 px-4 py-2 text-left border border-black underline">
                  Avis du promoteur (Etablissement)
                </th>
                <th className="bg-gray-200 px-4 py-2 text-left border border-black underline">
                  Avis de L’encadreur (Enseignant)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-40">
                {[1, 2].map((_, i) => (
                  <td key={i} className="px-4 py-2 border w-[50%] border-black align-top">
                    <p className="mt-6 underline">Nom :</p>
                    <p className="mt-6 underline">Prénom :</p>
                    <div className="mt-6 flex space-x-10">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full border border-black"></div>
                        <span>Favorable</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full border border-black"></div>
                        <span>Défavorable</span>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* Signatures */}
          <div className="flex justify-between mt-6">
            <p className="ml-12">Date, signature et cachet</p>
            <p className="mr-20">Date et signature</p>
          </div>

       
       
          <div className="mt-16 space-y-28">
            <div className='space-y-1'>
            <p className="underline font-semibold ">Avis de la bibliothèque de la faculté</p>
            <p>(Remise de 2 exemplaires du MFE)</p>
           </div>

        
         <div className="mt-10 space-y-2 text-justify text-sm font-medium w-[704px] mx-auto">
  <p><span className="font-bold">NB :</span> - Des commentaires peuvent être joints, si nécessaire, sur une feuille séparée, dûment signée.</p>
  <p>- Ce présent document doit être accompagné des comptes rendus de prés soutenance.</p>
</div>
  </div>
        </div>
      </div>

      {/* Boutons */}
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
