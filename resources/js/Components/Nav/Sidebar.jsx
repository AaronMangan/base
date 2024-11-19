import React, { useState } from 'react';
import {
  HomeIcon,
  XCircleIcon,
  InformationCircleIcon,
  DevicePhoneMobileIcon,
  Bars3Icon,
  PhoneIcon, // Use PhoneIcon or another appropriate icon
} from '@heroicons/react/24/outline'; // Heroicons v2 Outline icons

const Sidebar = () => {
  const appName = 'Flow';
  const [collapsed, setCollapsed] = useState(false);

  // Toggle the collapsed state
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`h-screen ${collapsed ? 'w-15' : 'w-64'} bg-gray-800 text-white transition-all duration-300`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
        {/* Logo/Title */}
        {!collapsed && <h1 className="text-xl font-semibold">{appName}</h1>}
        {/* Toggle Button */}
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {
            !collapsed && <XCircleIcon className="w-5 h-5"/> || <Bars3Icon className="w-5 h-5"/>
          }
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="mt-6">
        <ul>
          {/* Home Link */}
          <li className="flex items-center px-4 py-2 space-x-4 hover:bg-gray-700">
            {!collapsed ? (
              <>
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
              </>
            ) : (
              <HomeIcon className="w-5 h-5" />
            )}
          </li>

          {/* About Link */}
          <li className="flex items-center px-4 py-2 space-x-4 hover:bg-gray-700">
            {!collapsed ? (
              <>
                <InformationCircleIcon className="w-5 h-5" />
                <span>About</span>
              </>
            ) : (
              <InformationCircleIcon className="w-5 h-5" />
            )}
          </li>

          {/* Services Link */}
          <li className="flex items-center px-4 py-2 space-x-4 hover:bg-gray-700">
            {!collapsed ? (
              <>
                <DevicePhoneMobileIcon className="w-5 h-5" />
                <span>Services</span>
              </>
            ) : (
              <DevicePhoneMobileIcon className="w-5 h-5" />
            )}
          </li>

          {/* Contact Link - Replaced SupportIcon with PhoneIcon */}
          <li className="flex items-center px-4 py-2 space-x-4 hover:bg-gray-700">
            {!collapsed ? (
              <>
                <PhoneIcon className="w-5 h-5" />
                <span>Contact</span>
              </>
            ) : (
              <PhoneIcon className="w-5 h-5" />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
