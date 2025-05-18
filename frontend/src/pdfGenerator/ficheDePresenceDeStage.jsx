import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PdfGenerator from 'js/Helpers/PdfGenerator';
import DocumentRequest from 'js/models/DocumentRequest';

import uniBoumrdas from 'resources/Images/univ-logo.png';
import umbblocal from 'resources/Images/umbb.png';

import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';

export default function FicheDePresenceDeStage() {
  
  const { t } = useTranslation();
  const location = useLocation();
  const type = 'block_academic_year';
  const studentId = localStorage.getItem('id');
  const documentRef = useRef();


  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const matricule = params.get('matricule');
  const speciality = params.get('Speciality');
  const group = params.get('group');


  const handleValidateClick = async () => {
    try {
      const pdf = await PdfGenerator.generate(documentRef);
      const pdfData = { matricule, name, speciality,group,type };

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
        style={{ width: '794px', height: '1203px', padding: '20px', boxSizing: 'border-box' }}
      >
 
        <div className=" items-center mb-2">
         <div className="text-center flex-1 font-bold">
         <h1>MINISTERE DE LENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE</h1>
           
            <h1>Democratic and People's Republic of Algeria</h1>
            <h1>UNIVERSITE M’Hamed BOUGARA- BOUMERDES</h1>
             <h1>FACULTE DES SCIENCES</h1>
             <h1>DEPARTEMENT D’INFORMATIQUE</h1>
          </div>
           <div className="flex justify-center">
            <img
             src={uniBoumrdas}
             alt="University Logo"
             className="w-48 h-28"
             />
        </div>

        </div>


      <div>
        <div className="text-center bg-gray-300 font-serif text-lg font-semibold border-2 border-black w-[80%] ml-20">
             <h1>FICHE DE PRESENCE DE STAGE PRATIQUE</h1>
             <h1>EN MILIEU PROFESSIONNEL</h1>
             <h1>Année universitaire : 2022/2023</h1>
        </div>
       <p className='mt-7 font-serif text-lg'><span className="font-semibold">Type de stage</span> : MEMOIRE DE FIN D’ETUDES (Licence/Master)</p>
       <p className="font-serif mt-10 text-lg"> Stage convenu suivant la convention signée, N° : …… /FS/………….</p>
       <p> <span className="font-semibold font-serif text-lg">Période de Stage</span> : du ……………………… Au ……………………</p>
       
       <div className="bg-gray-300 p-4 font-serif space-y-2">
         <p><span className="font-semibold underline">Etudiant concerné</span> :</p>
         <p><span className="font-semibold">Nom et Prénom</span> : {name}.</p>
         <p><span className="font-semibold">Groupe</span> : {group}</p>
         <p><span className="font-semibold">Spécialité</span> : {speciality}</p>
         <p><span className="font-semibold">Adresse</span> : ………………………………………………………………………………………………….</p>
         <p>…………………………………………………………………………………………………………………………</p>
       
</div>
   <div className='font-serif mt-5'>
            <p className="font-semibold text-lg"> Lieu de stage</p>
            <p>…………………………………………………………………………………………</p>
            <p>Nombre de jours de présences (en chiffres): ………………. Jours</p>
            <p>Nombre de jours d’absences (en chiffres): ………………… Jours</p>
            <p className='mt-4 text-lg'>Observation du responsable de la structure d’accueil et/ou de suivi du stage</p>
            <p>…………………………………………………………………………………………………………………………</p>
            <p>……………………………………………………………………………………………………………………….</p>
            <p>………………………………………………………………………………………………………………………</p>

         </div>
    </div>
    <div className='flex justify-between '>
    <div className="space-y-0 font-serif">
  <p>Fait à…………… le ……….</p>
  <p>Fait à Boumerdes le : …………..</p>
  <p>Visa du Responsable de l’établissement</p>
  <p>Ou de l’Administration d’accueil</p>
  <p>(Cachet, Griffe et signature)</p>
</div>

     <p className='font-serif font-semibold mr-5'>Le Chef de département</p>
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
