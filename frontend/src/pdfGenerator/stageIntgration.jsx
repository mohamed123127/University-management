import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function  RecommandationStageDintégration () {
  const { t } = useTranslation();
  const location = useLocation();
  const documentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const type = 'block_academic_year';
  const studentId = localStorage.getItem('id');
  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const matricule = params.get('matricule');

  const handleValidate = async () => {
    setIsLoading(true);
    try {
      const pdf = await PdfGenerator.generate(documentRef);
      const saveResult = await DocumentRequest.SaveDocumentRequestAsPdf(pdf, { name, matricule, type });

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
        style={{ width: '704px', height: '1100px', padding: '50px', position: 'relative' }}
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

        <h2 className="mt-12 text-2xl font-bold mb-4 text-center underline">Recommandation pour un stage <br/>
D’intégration dans l’entreprise.</h2>
<div className='space-y-4 text-xl'>
    <p className='font-semibold'>Madame, Monsieur ;</p>
    <p>
  Nous avons l’honneur et le plaisir de vous demander de bien vouloir accueillir
  l’intéressé ci-dessous nommé, étudiante en première année de master
  Informatique spécialité :
</p>
<p>
  En effet, l’étudiant souhaiterait bénéficier d’un accès à votre établissement afin de
  réaliser un mini-projet qui l’aidera, d’une part, à se préparer pour une bonne
  intégration dans le monde socioprofessionnel, et d’autre part, d’appliquer et
  d’enrichir les connaissances acquises dans son cursus universitaire.
</p>
<p>Veuillez agréer, Madame, Monsieur, l’expression de mes salutations.</p>
 
</div>
        <div className='flex justify-between mt-20 text-xl font-semibold'>
    <p>L’intéressé</p>
<p>Le Chef de Département</p>
 </div>

        <div className="absolute bottom-10 left-14 right-14 text-justify text-[13px] italic">
          
          <div className="flex justify-center ">
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
