import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function Prestage() {
  const { t } = useTranslation();
  const location = useLocation();
  const documentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const type = 'block_academic_year';
  const studentId = localStorage.getItem('id');

  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const matricule = params.get('matricule');

  const ValiderButtonClickHandled = async () => {
    setIsLoading(true);
    try {
      const pdf = await PdfGenerator.generate(documentRef);

      const dataToSavePdf = { matricule, name, type };
      const result = await DocumentRequest.SaveDocumentRequestAsPdf(pdf, dataToSavePdf);

      if (result.success) {
        const fileUrl = result.fileUrl;
        const result2 = await DocumentRequest.SaveDocumentRequestInDb({
          documentUrl: fileUrl,
          type,
          studentId
        });

        alert(result2.success ? result2.message : "لم يتم حفظ في قاعدة البيانات");
      } else {
        alert('لم يتم حفظ الملف. تأكد من الخادم.\n' + result.message);
      }
    } catch (error) {
      alert("حدث خطأ أثناء التوليد: " + error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 w-full flex flex-col items-center">
   
      <div
        ref={documentRef}
        className="relative bg-white rounded-lg shadow-md border-2 border-gray-300 w-[774px] h-[1023px] p-14 box-border my-8"
        dir="ltr"
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

      
        <h2 className="mb-4">
          <span className="underline">Objet</span>: Recommandation pour un pré-stage
        </h2>

       
        <div className="text-justify text-[18px] my-6 font-serif">
          <p className="font-bold">Madame/ Monsieur :</p>
          <p className="mt-3">Nous avons l’honneur et le plaisir de vous demander de bien vouloir recevoir l’étudiant : {name}</p>
          <p className="mt-3">Inscrite en ……. année filière : Informatique sous le matricule {matricule}</p>
          <p className="mt-3">Il souhaiterait effectuer un stage afin d’approfondir ses connaissances du milieu professionnel et de connaître ses apports et ses contraintes à la structure de l’organisme d’accueil.</p>
          <p className="mt-3">Nous vous serons reconnaissants de bien vouloir l’accueillir dans votre établissement durant la période des vacances de printemps du ……. au …..</p>
          <p className="mt-3">Dans l’attente d’une réponse favorable, veuillez agréer, Monsieur / Madame, l’expression de nos salutations les plus distinguées.</p>
          <p className="mt-10 mr-5 font-semibold text-right">Le Chef de département</p>
        </div>

       
        <div className="absolute bottom-20 left-14 right-14 text-justify text-[13px] italic">
          <p className="pl-20">Cette attestation est délivrée à la demande de l’étudiant(e).</p>
          <div className="flex justify-center">
            <img src={umbblocal} alt="University localisation" className="w-250 h-30 ltr" />
          </div>
        </div>
      </div>

    
      <div className="flex justify-center mt-4 space-x-4">
        <ButtonStyle1
          onClick={ValiderButtonClickHandled}
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
