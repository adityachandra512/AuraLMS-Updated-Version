"use client";
import { useState, useEffect } from 'react';
import { Book, Users as UsersIcon, LayoutList, Settings as SettingsIcon, Bell, Search, Trophy } from 'lucide-react';
import Overview from '../components/admin/Overview';
import UsersManagement from '../components/admin/Users';
import Courses from '../components/admin/Courses';
import SystemSettings from '../components/admin/Settings';
import Settings from '../components/admin/Settings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail') || 'Admin';
    setUserEmail(email);
  }, []);

  // Update the Users icon usage in the navigation
  <button
    onClick={() => setActiveTab('users')}
    className={`w-full flex items-center gap-3 p-3 rounded-lg ${
      activeTab === 'users' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
    }`}
  >
    <UsersIcon size={18} />
    Users
  </button>
  
  // Update the renderActiveTab function
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'users':
        return <UsersManagement />;
      case 'courses':
        return <Courses />;
      case 'settings':
        return <SystemSettings />;
      default:
        return null;
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 fixed h-full">
        <div className="flex items-center gap-2 mb-8">
          <Book className="text-purple-600" />
          <h1 className="text-xl font-bold">AuraLMS Admin</h1>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'overview' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
            }`}
          >
            <Book size={18} />
            Overview
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'users' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
            }`}
          >
            <UsersIcon size={18} />
            Users
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'courses' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
            }`}
          >
            <LayoutList size={18} />
            Courses
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'settings' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
            }`}
          >
            <SettingsIcon size={18} />
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              <span className="font-medium">{userEmail}</span>
            </div>
          </div>
        </div>

        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;