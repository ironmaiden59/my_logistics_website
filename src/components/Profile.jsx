import React from 'react';
import UserInfoForm from './UserInfoForm';
import PasswordManagement from './PasswordManagement';


const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Profile</h2>
        <UserInfoForm />
        <PasswordManagement />
        
      </div>
    </div>
  );
};

export default Profile;