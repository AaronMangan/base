import React, { useState } from 'react';
import {
  HomeIcon,
  XCircleIcon,
  InformationCircleIcon,
  DevicePhoneMobileIcon,
  // ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  FingerPrintIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'; // Heroicons v2 Outline icons

const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon className="w-5 h-5" />,
    path: '/home',
    children: []
  },
  {
    name: 'Manage',
    icon: <Cog6ToothIcon className="w-5 h-5" />,
    path: '',
    children: [
      {
        name: 'Users',
        icon: <UserGroupIcon className="w-5 h-5" />,
        path: '/users',
      },
      {
        name: 'Roles',
        icon: <FingerPrintIcon className="w-5 h-5" />,
        path: '/users',
      },
      {
        name: 'Config',
        icon: <WrenchScrewdriverIcon className="w-5 h-5" />,
        path: '/users',
      },
    ]
  },
];

const Sidebar = () => {
  const appName = 'Flow';
  const [collapsed, setCollapsed] = useState(false);

  const [openItem, setOpenItem] = useState(null);

  const toggleSubMenu = (index) => {
    setOpenItem(openItem === index ? null : index);  // Toggle the open/close of sub-items
  };
  
  // Toggle the collapsed state
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`h-screen ${collapsed ? 'w-15' : 'w-64'} bg-gray-800 text-white transition-all duration-300`}>
      <div className="flex items-center px-2 py-2 pr-2 space-x-4 hover:bg-gray-700">
        { !collapsed && 
          <img
            src='https://via.placeholder.com/40?text=TU'  // Assuming `user.profileImage` is the URL of the user's image
            alt="User Profile"
            className="w-10 h-10 border-2 border-gray-300 rounded-full"
          />
        }
        {!collapsed && <span className="w-full font-semibold text-white">Test User</span>}
        
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {
            !collapsed && <XCircleIcon className="w-5 h-5"/> || <ChevronDoubleRightIcon className="w-5 h-5"/>
          }
        </button>
      </div>
      <nav className="mt-6">
        <ul>
          {/* Handle menu items */}
          {menuItems.map((item, index) => (
            <li key={index}>
              <div
                className="flex items-center px-2 py-2 space-x-4 hover:bg-gray-700"
                onClick={() => item.children.length > 0 && toggleSubMenu(index)}
              >
                <span className="w-5 h-5">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </div>

              {/* Handle sub-menu items (children) */}
              {item.children.length > 0 && openItem === index && (
                <ul className={`ml-6 ${collapsed ? 'hidden' : ''}`}>
                  {item.children.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <div className="flex items-center px-4 py-2 space-x-4 hover:bg-gray-600">
                        <span className="w-5 h-5">{subItem.icon}</span>
                        {!collapsed && <span>{subItem.name}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
