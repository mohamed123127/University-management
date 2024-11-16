import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import uniBoumrdas from 'resources/Images/univ-logo.png';
import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';
import { useLocation } from 'react-router-dom';

export default function InternshipPermitRequest() {
    const location = useLocation();
    const type = 'registration_certificate';
    const url = 'ddddddddddsasas';
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    const matricule = params.get('matricule');
    const speciality = params.get('speciality');
    const internshipPlace = params.get('internshipPlace');
    const internshipPeriod = params.get('internshipPeriod');



    const certRef = useRef();

    const generatePDF = async () => {
        const element = certRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('Internship_Permit_Request.pdf');
    };

    return (
        <div className="p-4 w-full">
            <div ref={certRef} className="bg-white p-8 rounded-lg shadow-md w-[80%] max-w-2xl mx-auto border-2 border-gray-300" dir="rtl">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-center flex-1">
                        <h1>الجمهورية الجزائرية الديمقراطية الشعبية</h1>
                        <h1>République Algérienne Démocratique et Populaire</h1>
                        <h1>وزارة التعليم العالي والبحث العلمي</h1>
                        <h1 className="mb-3">Ministère de l'Enseignement Supérieur et de la Recherche Scientifique</h1>
                    </div>
                    <img src={uniBoumrdas} alt="University Logo" className="w-20 h-20" />
                </div>
                
                <hr />
                <h2 className="mt-6 text-2xl font-bold mb-4 text-center">طلب إذن التكوين</h2>

                <div className="text-right mb-4 space-y-2">
                    <div className="flex">
                        <span className="font-semibold">السيد :</span>
                        <span className="mr-2"> {name}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold">رقم التسجيل:</span>
                        <span className="mr-2">{matricule}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold">التخصص:</span>
                        <span className="mr-2"> {speciality} </span>
                    </div>
                   
                    
                </div>
              
                <div className="flex mt-2 text-right">
                        <span className="font-semibold">مكان التكوين:</span>
                        <span className="mr-2">  {internshipPlace}</span>
                    </div>
                
                <div className="flex mt-2 text-right">
                        <span className="font-semibold">مدة تكوين:</span>
                        <span className="mr-2">{internshipPeriod} </span>
                    </div>
                    <div className="text-left mt-2  ml-24 ">
                        <span className="font-semibold ml-16">إمضاء:</span>
                    </div>
               

                
                
                <div className="mt-40 text-right">
                    <p className="mb-2">أتعهد بالالتزام بمواعيد العمل والشروط المحددة أثناء فترة التدريب.</p>
                </div>
                
                <hr />
                <h1 className="text-center">جامعة بومرداس</h1>
                <h1 className="text-center">Université de Boumerdès</h1>
                <h1 className="text-center">شارع الاستقلال</h1>
            </div>

            <div className='flex justify-center mt-4 space-x-4'>
                <ButtonStyle1
                    onClick={generatePDF}
                    buttonClassName="px-6 py-2 bg-green-500 w-[120px] text-white rounded-md hover:bg-green-600"
                    buttonText="Confirm"
                />
                <ButtonStyle1
                    buttonClassName="px-6 py-2 bg-red-600 w-[120px] text-white rounded-md hover:bg-red-700"
                    buttonText="Cancel"
                />
            </div>
        </div>
    );
};
