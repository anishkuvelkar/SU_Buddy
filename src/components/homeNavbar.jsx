import React from 'react';
import img1 from '../images/logo.png';
import img2 from '../images/profile.jpg';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Make sure to install react-icons if not already
const navigation = [
  { name: 'BUDDIES', href: '/home', current: false },
  { name: 'GROUPS', href: '/group', current: false },
  { name: 'MY ACCOUNT', href: '/userProfile', current: true },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // get the navigate function

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      // Redirect to the login page
      navigate('/login', { replace: true }); // Using replace to prevent going back to the private page using browser back button
    } catch (error) {
      // Handle errors here, like showing a message to the user
      console.error('Logout error', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center">
              
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={`text-gray-300 rounded-md px-3 py-2 text-sm font-medium ${pathname === item.href ? 'text-white bg-orange-500' : 'hover:bg-gray-800 hover:text-white'}`}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={img2}
                    alt="Empty profile"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          to="/userProfile"
                          className={`${active ? 'bg-orange-500 text-white' : 'text-gray-700'
                            } block px-4 py-2 text-sm`}
                        >
                          My Account
                        </NavLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-orange-500 text-white' : 'text-gray-700'
                            } flex items-center w-full px-4 py-2 text-sm`}
                          onClick={handleLogout}
                        >
                          <FiLogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}