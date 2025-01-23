import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MapPin, Phone, User, Building2 } from 'lucide-react';

const CharityProfileView = () => {
  const [openSections, setOpenSections] = useState({
    organizationDetails: true,
    contactInformation: true,
    addressDetails: true,
    trusteeInformation: true
  });

  const profileData = {
    charityName: "My Sadaqah Online",
    orgType: "Non-Profit",
    objectives: "To help those in need",
    contactName: "Daniyal Khan",
    position: "Director",
    email: "daniyalahs8@gmail.com",
    phone: "+44 123 456 7890",
    address1: "123 Charity Street",
    address2: "Suite 100",
    cityName: "Birmingham",
    postCode: "B1 1AA",
    country: "United Kingdom",
    operatingAddress: "Same as above",
    trusteesCount: "5",
    trusteesName: "AbdulSamad",
    trusteesNumber: "+44 123 456 7891",
    trusteesEmail: "abdulsamad@gmail.com",
    trusteesAddress: "456 Trustee Avenue",
    profileImage: "/assets/images/logo.png"
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const AccordionSection = ({ title, section, icon: Icon, children }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div 
        className='flex justify-between items-center bg-primary p-4 text-white cursor-pointer'
        onClick={() => toggleSection(section)}
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {openSections[section] ? <ChevronDown /> : <ChevronRight />}
      </div>
      {openSections[section] && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );

  const Field = ({ label, value, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-start space-x-4">
      {Icon && <Icon className="w-6 h-6 text-teal-500 mt-1 flex-shrink-0" />}
      <div>
        <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value || 'Not Provided'}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto py-8 ">
      {/* Header with Profile Image */}
      <div className="bg-primary rounded-2xl flex flex-col sm:flex-row items-center justify-between p-6 mb-8 shadow-lg">
        <div className="flex items-center space-x-6 mb-4 sm:mb-0">
          <div className="md:w-32 md:h-32 w-20  rounded-full overflow-hidden  shadow-lg ">
            <img 
              src={profileData.profileImage} 
              alt="Charity logo" 
              className="w-full h-full object-cover bg-black"
            />
          </div>
          <div>
            <h1 className="md:text-3xl text-xl font-bold text-white mb-2">{profileData.charityName}</h1>
            <p className="md:text-md text-sm text-white font-semibold">{profileData.orgType}</p>
          </div>
        </div>
      </div>

      {/* Main Form Fields with Accordions */}
      <div className="space-y-6">
        <AccordionSection 
          title="Organization Details" 
          section="organizationDetails"
          icon={Building2}
        >
          <Field label="Charity Name" value={profileData.charityName} />
          <Field label="Organization Type" value={profileData.orgType} />
          <Field label="Objectives" value={profileData.objectives} />
          <Field label="Operating Address" value={profileData.operatingAddress} />
        </AccordionSection>

        <AccordionSection 
          title="Contact Information" 
          section="contactInformation"
          icon={Phone}
        >
          <Field label="Contact Name" value={profileData.contactName} />
          <Field label="Position" value={profileData.position} />
          <Field label="Email" value={profileData.email}  />
          <Field label="Phone" value={profileData.phone}  />
        </AccordionSection>

        <AccordionSection 
          title="Address Details" 
          section="addressDetails"
          icon={MapPin}
        >
          <Field label="Address Line 1" value={profileData.address1} />
          <Field label="Address Line 2" value={profileData.address2} />
          <Field label="City" value={profileData.cityName} />
          <Field label="Post Code" value={profileData.postCode} />
          <Field label="Country" value={profileData.country} />
        </AccordionSection>

        <AccordionSection 
          title="Trustee Information" 
          section="trusteeInformation"
          icon={User}
        >
          <Field label="Number of Trustees" value={profileData.trusteesCount} />
          <Field label="Trustee Name" value={profileData.trusteesName} />
          <Field label="Trustee Number" value={profileData.trusteesNumber} />
          <Field label="Trustee Email" value={profileData.trusteesEmail} />
          <Field label="Trustee Address" value={profileData.trusteesAddress} />
        </AccordionSection>
      </div>
    </div>
  );
};

export default CharityProfileView;