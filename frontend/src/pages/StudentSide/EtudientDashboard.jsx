import React from 'react';
import { useTranslation } from 'react-i18next';
import LazyVideo from 'components/LeazyLoading/LazyVideo';
import reportVideo from 'resources/videos/Repport_Problems.mp4';
import additionalFeatures from 'resources/videos/Additional.mp4';
import Announncement from 'resources/videos/Announncement.mp4';
import VirtualRequest from 'resources/videos/VirtualRequest.mp4';
import DocumentRequest from 'resources/videos/DocumentRequest.mp4';

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
          {/* العنصر 1 */}
          <div className="p-4 border rounded-md bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {t('request_services')}
            </h2>
            <div className="mb-6">
              <LazyVideo src={DocumentRequest} />
            </div>
            <ul className="list-disc rtl:pr-6 ltr:pl-6 text-sm">
              <li>{t('registration_certificate')}</li>
              <li>{t('vehicle_access_permit')}</li>
              <li>{t('library_card')}</li>
              <li>{t('more')}</li>
            </ul>
          </div>

          {/* العنصر 2 */}
          <div className="p-4 border rounded-md bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {t('visual_requests')}
            </h2>
            <div className="mb-6">
              <LazyVideo src={VirtualRequest} />
            </div>
            <ul className="list-disc rtl:pr-6 ltr:pl-6 text-sm">
              <li>{t('department_change')}</li>
              <li>{t('specialization_change')}</li>
            </ul>
          </div>

          {/* العنصر 3 */}
          <div className="p-4 border rounded-md bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {t('university_announcements')}
            </h2>
            <div className="mb-6">
              <LazyVideo src={Announncement} />
            </div>
            <p className="rtl:pr-6 ltr:pl-6 text-sm">
              {t('stay_informed')}
            </p>
          </div>


          <div className="flex-col lg:hidden p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {t('report_issues')}
            </h2>
            <div className="mb-6">
            <LazyVideo src={reportVideo} />
          </div>
          <p className="rtl:pr-6 ltr:pl-6 text-sm">
            {t('report_problems')}
          </p>
        </div>

        <div className=" flex-col lg:hidden p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            {t('additional_features')}
          </h2>
          <div className="mb-6">
            <LazyVideo src={additionalFeatures} />
          </div>
          <ul className="list-disc rtl:pr-6 ltr:pl-6 text-sm">
            <li>{t('change_language')}</li>
            <li>{t('enable_email_notifications')}</li>
          </ul>
        </div>
<div className='hidden lg:flex col-span-1 sm:col-span-2 lg:col-span-3 w-2/3 gap-6 mx-auto'>
<div className="w-1/2 p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {t('report_issues')}
            </h2>
            <div className="mb-6">
            <LazyVideo src={reportVideo} />
          </div>
          <p className="rtl:pr-6 ltr:pl-6 text-sm">
            {t('report_problems')}
          </p>
        </div>

        <div className="w-1/2 p-4 border rounded-md cursor-pointer bg-blue-50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            {t('additional_features')}
          </h2>
          <div className="mb-6">
            <LazyVideo src={additionalFeatures} />
          </div>
          <ul className="list-disc rtl:pr-6 ltr:pl-6 text-sm">
            <li>{t('change_language')}</li>
            <li>{t('enable_email_notifications')}</li>
          </ul>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}