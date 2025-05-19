import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function ProlongationStage() {
  
  const { t } = useTranslation();
  const location = useLocation();
  const type = 'prolongationStage';
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
        className="bg-white p-8 rounded-lg shadow-md mx-auto border-2 border-gray-300"
        dir="ltr"
        style={{ width: '794px', height: '1123px', padding: '40px', boxSizing: 'border-box' }}
      >
 
        <div className="flex justify-between items-center mb-2">
          <img src={uniBoumrdas} alt="University Logo" className="w-40 h-36ltr" />
          <div className="text-center flex-1 font-bold">
         
            <h1>Democratic and People's Republic of Algeria</h1>
     
            <h2>Ministry of Higher Education and Scientific Research</h2>
           
            <h1>Mhamed Bougara University - Boumerdès</h1>
             <h1>Faculté des sciences</h1>
          </div>
        </div>


        <div className="flex justify-between font-bold">
          

          <div className="text-right " dir>
             <h2 className="text-left ltr pt-3 ml-[500px]">Boumerdès le : </h2>
          </div>
        </div>
 <div>
    <div className="flex justify-between mt-4 font-serif">
  <p className=''>N° d’inscription : 31026944</p>
  <p className=''>N° d’inscription : 31026944</p>
  <p className=''>N° d’inscription : 31026944</p>
</div>
<div className="flex justify-between mt-4 font-serif">
  <p className=''>Nom : </p>
  <p className=' mr-3'>Nom : </p>
  <p className='mr-36'>Nom : </p>
</div>
<div className="flex justify-between mt-4 font-serif">
  <p>Prénom : </p>
  <p className=''>Prénom : </p>
  <p className='mr-32'>Prénom : </p>
</div>

<p className='mt-10 text-xl'><span className="font-semibold  ">OBJET</span> : Demande de prolongation de stage</p>

<div className=' font-serif space-y-2 text-lg my-10'>
    <p><span className="font-bold ml-10">M</span>essieurs,</p>


<p className="ml-5">
  <span className="font-bold ml-16">D</span>ans le cadre de la préparation de nos diplômes de <span className="font-bold">Licence/</span> <span className="font-bold">Master</span> d’informatique, nous avons l’honneur de solliciter une demande de prolongation pour la finalisation de notre rapport de fin de Stage.
</p>


<p className=" ml-10">
  <span className="font-bold">L</span>a durée supplémentaire souhaitée est de ….. jours à compter du …
</p>



</div>
<div className="flex justify-between mt-16">
  <p className="underline">Avis du Chef du département</p>
  <p className="underline mr-10">Avis de l’entreprise d’accueil</p>
</div>
<p>-</p>
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
