import React, { useState } from 'react';
import { Camera, Save, Edit2, X } from 'lucide-react';

const CharityProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/assets/images/logo.png");
  const [formData, setFormData] = useState({
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
    trusteesName: "AbdulSamad ",
    trusteesNumber: "+44 123 456 7891",
    trusteesEmail: "abdulsamad@gmail.com",
    trusteesAddress: "456 Trustee Avenue"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Updated data:', formData);
    setIsEditing(false);
  };

  const Field = ({ label, name, value, type = "text" }) => (
    <div className="col-span-1 sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className=" w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      ) : (
        <p className="px-3 py-2 text-gray-800">{value}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header with Profile Image */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Charity logo" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{formData.charityName}</h1>
              <p className="text-sm text-gray-500">{formData.orgType}</p>
            </div>
          </div>
          {/* <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium p-2 bg-primary text-white"
          >
            {isEditing ? (
              <X className="w-4 h-4 mr-2" />
            ) : (
              <Edit2 className="w-4 h-4 mr-2" />
            )}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button> */}
        </div>

        {/* Main Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Organization Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Charity Name" name="charityName" value={formData.charityName} />
              <Field label="Organization Type" name="orgType" value={formData.orgType} />
              <Field label="Objectives" name="objectives" value={formData.objectives} />
              <Field label="Operating Address" name="operatingAddress" value={formData.operatingAddress} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Contact Name" name="contactName" value={formData.contactName} />
              <Field label="Position" name="position" value={formData.position} />
              <Field label="Email" name="email" value={formData.email} type="email" />
              <Field label="Phone" name="phone" value={formData.phone} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Address Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Address Line 1" name="address1" value={formData.address1} />
              <Field label="Address Line 2" name="address2" value={formData.address2} />
              <Field label="City" name="cityName" value={formData.cityName} />
              <Field label="Post Code" name="postCode" value={formData.postCode} />
              <Field label="Country" name="country" value={formData.country} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Trustee Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Number of Trustees" name="trusteesCount" value={formData.trusteesCount} />
              <Field label="Trustee Name" name="trusteesName" value={formData.trusteesName} />
              <Field label="Trustee Number" name="trusteesNumber" value={formData.trusteesNumber} />
              <Field label="Trustee Email" name="trusteesEmail" value={formData.trusteesEmail} type="email" />
              <Field label="Trustee Address" name="trusteesAddress" value={formData.trusteesAddress} />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CharityProfile;