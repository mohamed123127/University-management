import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from "lucide-react";
import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import fudb from 'resources/Images/FUDB.png';
import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function ConventionDePreStage() {
  const { t } = useTranslation();
  const location = useLocation();
  const type = 'block_academic_year';
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
        style={{ width: '754px', height: '1090px', padding: '20px', boxSizing: 'border-box', position: 'relative' }}
      >
     <div className=''>
        <div className="flex justify-between items-center ">
          <img src={uniBoumrdas} alt="University Logo" className="w-24 h-23 ltr" />
          <div className="text-center flex-1 ">
            <h1>الجمهوريـــــــــة الجزائريـــــــــــة الديمقراطيـــــــــــة الشعبيـــــــــــة</h1>
            <h1>وزارة التعليـــــــم العالـــــــــي والبحـــــــث العلــــمي</h1>
           <hr className="border-blue-500 w-56 ml-32 mt-4" />

           </div>
           <img src={fudb} alt="fudb" className="w-24 h-23 ltr" />

        </div>
       <div className=" flex justify-between top-24 left-0 right-0">
        <h1 className="font-serif">University Mhamed Bougara University - Boumerdès</h1>
        <h1>جامعة أمحمد بوقرة- بومرداس</h1>
       </div>
      <hr className="border-blue-500 w-full  " />

        <div className=" flex justify-between mt-6">
            <div>
                <h1 className="font-serif text-xl">Faculty of Science</h1>
                <h1 className="font-serif">Vice Dean for Studies and Student Affairs</h1>
             </div>
            <div >
                <h1 dir='rtl' className=" text-xl">  كليــــــــــــــة العلوم</h1>
                <h1>نائب العميد المكلف بالدراسات</h1>
            </div> 
            </div>
            <hr className="w-full border-black  " />
            <h2 className=" text-2xl font-semibold  text-center bg-gray-300">
          <span className="">CONVENTION DE PRE-STAGE</span><br />    </h2>
          <div > 
            <h2 className="  font-semibold  text-center">
          <span className="">Année universitaire: 2024/2025</span><br />    </h2>
          <p ><span className="font-semibold">Entre :</span> La Faculté des Sciences.</p>
        <p>
         Représentée par son Doyen : <span className="font-semibold">Professeur DAOUI Abdelhakim</span>
        </p>
          <p>Domiciliée à Boumerdes.</p>
          <div className='space-y-2'>
          <p className='font-semibold'>Et</p>

          <p>L’entreprise :</p>
          <p>Représenté par : ………………………………………………………………..…………………</p>
         <p className='h-10'>Domiciliée à :</p></div>

         <p>Il a été convenu et arrêté ce qui suit :</p>

         <p><strong>Article 1 :</strong> La présente convention a pour objet l’organisation d’un pré-stage en conformité avec le programme de la spécialité suivie par l’étudiant(e).</p>

         <p><strong>Article 2 :</strong> Cette convention concerne l’étudiant(e) du cycle : ……………</p>

          </div>

        <div className="border-2 border-black">
            <p className='ml-32'>Niveau : 2ème année</p>
          <div className='flex justify-between mt-4'>
            <p className='ml-14'>Filière : Informatique: </p>
            <p className='mr-44'> spécialité :</p>
         </div>
         <div className='flex justify-between mt-4'>
            <p className='ml-14'>Nom : <span className="font-semibold">……..</span> </p>
            <p>Prénom :<span className="font-semibold">……..</span></p>
            <p className='mr-32'>Matricule : <span className="font-semibold">232331……..</span></p>
         </div>
       </div>
        <p className='ml-24 font-semibold'> Lieu de stage : ………………….</p>
      <div className='space-y-2 mt-3'>
        <p><span className="font-semibold">Article 3 :</span> La période du pré-stage est fixée par l’entreprise selon ses possibilités d’accueil, du ……… au ..…..</p>
        <p><span className="font-semibold">Article 4 :</span> Ce pré-stage a pour but d’assurer l’application pratique de l’enseignement donné à l’université conformément aux programmes et plans d’études de la spécialité de l’étudiant (e) dont le nom est cité ci-dessus.</p>
        <p><span className="font-semibold">Article 5 :</span> Le programme de pré-stage est contrôlé dans son exécution par l’entreprise d’accueil.</p>
        <p><span className="font-semibold">Article 6 :</span> L’encadrement du stagiaire est assuré par des cadres techniques désignés par l’organisme d’accueil.</p>
        <p><span className="font-semibold">Article 7 :</span> La couverture de la sécurité sociale est assurée par l’établissement d’accueil. Lorsqu’un accident survient par le fait ou à l’occasion du pré-stage, celle-ci doit adresser sans délai à l’établissement universitaire dont relève le stagiaire une copie de la déclaration d’accident afin de la transmettre à la structure de la sécurité sociale compétente.</p>
        <p><span className="font-semibold">Article 8 :</span> Les stagiaires ne perçoivent pas une indemnité journalière destinée à couvrir leurs frais de pré-stage durant la période de leurs pré-stage.</p>
        <p><span className="font-semibold">Article 9 :</span> Pendant le pré-stage, l’étudiant(e) est soumis aux obligations de l’ensemble du personnel de l’organisme d’accueil, telles qu’elles sont définies dans son règlement intérieur.</p>
        <p><span className="font-semibold">Article 10 :</span> L’organisme d’accueil devra porter à la connaissance de l’étudiant(e) les dispositions de son règlement intérieur ainsi que les consignes d’hygiène et de sécurité.</p>
      </div>
      <div className='flex justify-between font-semibold mt-3'>
        <p>Fait à Boumerdes, le : ………….…………………..…..</p>
        <p>Fait à : ………..……………….. le : ……..….…….………</p>
     </div>
     <div className='flex justify-between font-semibold'>
      <p>Le Chef de Département</p>
      <p>Visa du responsable de l’établissement<br/>Ou l’administration d’accueil</p>
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
