import React from 'react';
import { useTranslation } from 'react-i18next';
import reportVideo from 'resources/videos/Repport_Problems.mp4';
export default function EtudientDashboard({ studentName }) {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6">

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          {t('welcome_message', { studentName })}
        </h1>

        <p className="text-lg mb-8 text-center">
          {t('platform_description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {t('request_services')}
            </h2>
            <div className="mb-6">
            <video controls className="w-full rounded-md">
              <source src={reportVideo} />
            </video>
          </div>
            <ul className="list-disc rtl:pr-6 ltr:pl-6 text-sm">
              <li>{t('registration_certificate')}</li>
              <li>{t('vehicle_access_permit')}</li>
              <li>{t('library_card')}</li>
              <li>{t('more')}</li>
            </ul>
          </div>

          <div className="p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {t('visual_requests')}
            </h2>
            <div className="mb-6">
            <video controls className="w-full rounded-md">
              <source src={reportVideo}/>
            </video>
          </div>
            <ul className="list-disc rtl:pr-6 ltr:pl-6 text-sm">
              <li>{t('department_change')}</li>
              <li>{t('specialization_change')}</li>
              <li>{t('create_new_club')}</li>
            </ul>
          </div>

          <div className="p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {t('university_announcements')}
            </h2>
            <div className="mb-6">
            <video controls className="w-full rounded-md">
              <source src={reportVideo} />
            </video>
          </div>
            <p className="rtl:pr-6 ltr:pl-6 text-sm">
              {t('stay_informed')}
            </p>
          </div>

          <div className="p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {t('report_issues')}
            </h2>
            <div className="mb-6">
            <video controls className="w-full rounded-md">
              <source src={reportVideo}/>
            </video>
          </div>
          <p className="rtl:pr-6 ltr:pl-6 text-sm">
            {t('report_problems')}
          </p>
        </div>

        <div className="p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            {t('account_management')}
          </h2>
          <div className="mb-6">
            <video controls className="w-full rounded-md">
              <source src={reportVideo} />
            </video>
          </div>
          <p className="rtl:pr-6 ltr:pl-6 text-sm">
            {t('manage_account_card')}
          </p>
        </div>

        <div className="p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            {t('additional_features')}
          </h2>
          <div className="mb-6">
            <video controls className="w-full rounded-md">
              <source src={reportVideo} />
            </video>
          </div>
          <ul className="list-disc rtl:pr-6 ltr:pl-6 text-sm">
            <li>{t('change_language')}</li>
            <li>{t('enable_email_notifications')}</li>
          </ul>
        </div>
      </div>
    </div>
    </div >
  );
}