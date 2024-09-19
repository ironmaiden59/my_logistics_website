import React from 'react';
import UserInfoForm from './UserInfoForm';
import PasswordManagement from './PasswordManagement';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Profile</h2>
        <UserInfoForm />
        <PasswordManagement />
      </motion.div>
    </div>
  );
};

export default Profile;