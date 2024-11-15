import React, { useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import uniBoumrdas from 'resources/Images/univ-logo.png';
import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';



export default function RegistrationCertificate  ()  {
    
        const location = useLocation();
        const type = 'registration_certificate';
        const url = 'ddddddddddsasas';
        // استخدم URLSearchParams لاستخراج الـ query parameters
        const params = new URLSearchParams(location.search);
        const name = params.get('name');
        const matricule = params.get('matricule');
        const educationYear = params.get('educationYear');
        const faculty = params.get('faculty');
        const speciality = params.get('speciality');

    const certRef = useRef();

    const generatePDF = async () => {
        const element = certRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        return pdf;
    };

    const savePdfInServer = async () => {
        try {
            // انتظر توليد ملف PDF
            const pdf = await generatePDF();
    
            // تحويل ملف PDF إلى Blob
            const pdfArrayBuffer = pdf.output('arraybuffer');
            const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
    
            const pdfData = new FormData();
            const fileName = `${type}_${matricule}_${name}.pdf`;
            pdfData.append('file', pdfBlob, fileName);
    
            // إرسال البيانات إلى الخادم
            const response = await fetch('http://localhost/University-management/backend/roots/SaveDocumentRequest.php', {
                method: 'POST',
                body: pdfData,
            });
    
            const result = await response.json();
            if (result.success) {
                // الحصول على رابط الملف المحفوظ
                const fileUrl = result.fileUrl;
                alert('تم حفظ الملف بنجاح. الرابط: ' + fileUrl);
    
                // إرسال رابط الملف إلى قاعدة البيانات
                await fetch('http://localhost/University-management/backend/roots/AddDocumentRequest.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ type: type, documentUrl: fileUrl }),
                });
            } else {
                alert('لم يتم حفظ الملف. تأكد من الخادم.');
            }
        } catch (error) {
            console.error('Error while saving PDF:', error);
            alert('حدث خطأ أثناء حفظ الملف.');
        }
    };
    

    const ValiderButtonClickHandled = async(e)=> {
        e.preventDefault();
        savePdfInServer();
        try{
            const response = await fetch('http://localhost/University-management/backend/roots/AddDocumentRequest.php', { // تأكد من تغيير الرابط
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({type:type, documentUrl: url})
            });
            if(response.ok){
                    alert('تم ارسال الطلب بنجاح');
            }else{
                alert('هناك خطأ في ارسال الطلب');
            }
        } catch (err) {
            alert("cathch:    "+err);
        }
    }
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
                <h2 className="mt-6 text-2xl font-bold mb-4 text-center">شهادة مدرسية</h2>

                <div className="text-right mb-2 space-y-1">
                    <div className="flex ">
                        <span className="font-semibold mt-12">السيد :</span>
                        <span className="mr-2 mt-12">{name}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold">رقم التسجيل:</span>
                        <span className="mr-2">{matricule}</span>
                    </div>
                    <div className="flex space-x-36 space-x-reverse">
                        <span className="font-semibold mb-2 mt-2">مسجل (ة) بالمؤسسة لمتابعة دراسته (ها) الجامعية في :</span>
                    </div>
                    <div className="flex space-x-36 space-x-reverse">
                        <span className="font-semibold">السنة : {educationYear}</span>
                        <span className="font-semibold">كلية : {faculty}</span>
                    </div>
                    <div className="flex space-x-36 space-x-reverse">
                        <span className="font-semibold mb-2 mt-2">تخصص : {speciality}</span>
                    </div>
                </div>

                <div className="mt-4 text-right">
                    <span className="font-semibold">خلال السنة الجامعية : {new Date().getFullYear()+1}/{new Date().getFullYear()}</span>
                    <div className="text-left mt-">
                        <span className="font-semibold ml-16 ">إمضاء :</span>
                    </div>
                </div>
                
                <div className="mt-40 text-right">
                    <p className="mb-2">يتعهد الطالب بالإلتزام بميثاق الآداب والأخلاقيات الجامعية</p>
                </div>
                
                <hr />
                <h1 className="text-center">جامعة بومرداس</h1>
                <h1 className="text-center ">université de boumerdes</h1>
                <h1 className="text-center">شارع الاستقلال</h1>
            </div>

            <div className='flex justify-center mt-4 space-x-4'>
            <ButtonStyle1 onClick={savePdfInServer} buttonClassName="px-6 py-2 bg-green-500  w-36 text-white rounded-md hover:bg-green-600"
                   
            buttonText="ارسال الطلب"/>
            <ButtonStyle1 onClick={()=>window.close()}   buttonClassName="px-6 py-2 bg-red-600 text-white w-36 rounded-md hover:bg-red-700"
            buttonText="إلغاء"/>
            </div>
          
        </div>
    );
};


