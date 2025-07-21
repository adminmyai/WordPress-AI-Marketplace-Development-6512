import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestLogin } from '@questlabs/react-sdk';
import questConfig from '../../config/questConfig';

const QuestLoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = ({ userId, token, newUser }) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your AI tools and templates</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <QuestLogin
            onSubmit={handleLogin}
            email={true}
            google={false}
            accent={questConfig.PRIMARY_COLOR}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestLoginPage;