import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from "lucide-react";
import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function AttestationNonRéinscription() {
  const { t } = useTranslation();
  const location = useLocation();
  const type = 'AttestationNonRéinscription';
  const studentId = localStorage.getItem('id');
  const documentRef = useRef();


  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const matricule = params.get('matricule');
  const speciality = params.get('Speciality');
  const educationYear = params.get('educationYear');


  const handleValidateClick = async () => {
    try {
      const pdf = await PdfGenerator.generate(documentRef);
      const pdfData = { matricule, name, type };

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
        {/* Header logos et titres */}
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

        {/* Faculté / Département */}
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

        {/* Titre central */}
        <h2 className="mt-16 text-2xl font-semibold mb-6 text-center bg-gray-400">
          <span className="">شهادة عدم إعادة التسجيل</span><br />    </h2>


          <div  dir="rtl">
          <p className="leading-8 text-justify text-lg mr-6">
        يشهــــــــــــــــــــــــــــد رئيس قسم الإعلام الآلـــــــــــــــــــي أن:
      </p>

      <div className="mt-6 space-y-4 text-lg leading-8 pr-6">
        <p className='font-semibold'>الطالــــب(ة): {name}</p>
        <p className='font-semibold' >المولــــود(ة) بتاريخ: …………………… بـ: ……………………، ولاية: ………………………</p>
        <p className='font-semibold'>رقم التسجيــــل: {matricule}</p>
        <p className='font-semibold'>الفـــــرع: إعلام آلي</p>
      </div>

      <p className="mt-8 text-lg leading-8 text-justify pr-6">
         غير مسجل ( ة  )في السنــــة الجـــامعية    <strong>2023/2024</strong>،<br/> ويعتبــر(تعتبــر) في حالــة تخـلي عن الدراسـة ابتداءً من تاريخ <strong>23 نوفمبر 2023</strong>،
        <br/>وهو التاريخ المحدد كآخر أجل للتسجيل الجامعي، وذلك حسب مراسلة المديرية العامة للتعليم والتكوين رقم: …../م.ع.ت.ت/202….
      </p>

      <p className="mt-8 text-lg leading-8 text-justify pr-6 font-semibold">
        سلّمت هذه الشهــادة للمعنــي(ة) للأستعـمال فيما يسمح به القـانون.
      </p>
</div>
      <div className="mt-28 text-left ltr font-semibold">
        <p>حرر ببومرداس، في: …… / …… / 2025</p>
        <p className="mt-4 font-bold underline"> رئيس القسم الآلـــــــــــــــــــي</p>
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
