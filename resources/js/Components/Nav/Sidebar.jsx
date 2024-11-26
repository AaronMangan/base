import React, { useState, useEffect } from 'react';
import {
  HomeIcon,
  XCircleIcon,
  ChevronDoubleRightIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon className="w-5 h-5" />,
    path: '/dashboard',
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
        name: 'Config',
        icon: <WrenchScrewdriverIcon className="w-5 h-5" />,
        path: '/settings',
      },
    ]
  }
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openItem, setOpenItem] = useState(null);

  const toggleSubMenu = (index) => {
    setOpenItem(openItem === index ? null : index);  // Toggle the open/close of sub-items
  };
  
  // Toggle the collapsed state
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Navigate to the profile page when clicked.
  const goToPath = (path) => {
    window.location.href = path;
    setCollapsed(true)
  }

  const logout = () => {
    axios.post(route('logout'), {
      // You can send data here if needed (e.g., for logging purposes)
    })
    .then(function (response) {
      // Handle successful logout response
      window.location.href = '/';   // Redirect to the homepage or login page
    })
    .catch(function (error) {
      // Handle any errors
      console.error('Logout failed', error);
    });
  }

  /**
   * Handles the user clicking on a menu item. If the item has children toggle the sub item visibility.
   * Otherwise navigate to the specified path.
   * 
   * @param {*} item 
   * @param {*} index 
   */
  const handleItemClick = (item, index) => {
    if (item && item.children && item.children.length > 0) {
      // Toggle the submenu visibility
      toggleSubMenu(index);
    } else {
      // Navigate to the item's path
      goToPath(item.path);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className={`fixed h-full ${collapsed ? 'w-15' : 'w-64 z-20'} bg-gray-800 text-white transition-all duration-300`}>
      <div className="flex items-center px-2 py-2 pr-2 space-x-4 hover:bg-gray-700">
        { !collapsed && 
          <img
            src='https://via.placeholder.com/40?text=TU'  // Assuming `user.profileImage` is the URL of the user's image
            alt="User Profile"
            className="w-10 h-10 border-2 border-gray-300 rounded-full"
            onClick={() => {goToPath('/profile')}}
          />
        }
        {!collapsed && <span className="w-full font-semibold text-white">Test User</span>}
        
        <button onClick={toggleSidebar} className="text-white focus:outline-none">{!collapsed && <XCircleIcon className="w-5 h-5"/> || <ChevronDoubleRightIcon className="w-5 h-5"/>}</button>
      </div>
      <nav className="mt-6">
        <ul>
          {/* Handle menu items */}
          {menuItems.map((item, index) => (
            <li key={index}>
              <div
                className="flex items-center px-2 py-2 space-x-4 hover:bg-gray-700"
                onClick={() => {handleItemClick(item, index)}}
              >
                <span className="w-5 h-5">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </div>

              {/* Handle sub-menu items (children) */}
              {item.children.length > 0 && openItem === index && (
                <ul className={`ml-6 ${collapsed ? 'hidden' : ''}`}>
                  {item.children.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <div onClick={() => {handleItemClick(subItem, subIndex)}} className="flex items-center px-4 py-2 space-x-4 hover:bg-gray-600">
                        <span className="w-5 h-5">{subItem.icon}</span>
                        {!collapsed && <span>{subItem.name}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
            <li key='logout_link'>
              <div
                className="flex items-center px-2 py-2 space-x-4 hover:bg-gray-700"
                onClick={() => {logout()}}
              >
                <span className="w-5 h-5"><ArrowLeftStartOnRectangleIcon className="w-5 h-5" /></span>
                {!collapsed && <span>Logout</span>}
              </div>
            </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
