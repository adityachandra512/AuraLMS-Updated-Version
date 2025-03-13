import { useState, useEffect } from 'react';
import { Save, Building2, Mail, Phone, MapPin } from 'lucide-react';

const SystemSettings = () => {
  const companyInfo = {
    creatorEmail: 'developer@auralms.com',
    organizationName: 'AuraLMS - By int21h',
    phoneNumber: '+91 9868092982',
    address: 'SRM Univeristy AP',
    developerInfo: 'Development Team @ int21h',
    website: 'www.auralms.com'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Company Information</h3>
        <div className="max-w-2xl space-y-6">
          <div className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Organization</p>
                <p className="font-medium">{companyInfo.organizationName}</p>
                <p className="text-sm text-purple-600">{companyInfo.website}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Developer Contact</p>
                <p className="font-medium">{companyInfo.creatorEmail}</p>
                <p className="text-sm text-gray-600">{companyInfo.developerInfo}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Support Contact</p>
                <p className="font-medium">{companyInfo.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Headquarters</p>
                <p className="font-medium">{companyInfo.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">About AuraLMS</h4>
            <p className="text-sm text-purple-700">
              AuraLMS is a modern learning management system designed to provide seamless 
              educational experiences. Built with cutting-edge technology, we aim to 
              transform the way institutions manage and deliver online education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;