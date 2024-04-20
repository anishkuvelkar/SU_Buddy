import React from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import img1 from '../images/logo.png';
import img2 from '../images/profile.jpg';
import { NavLink, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'ME', href: '/me', current: true },
  { name: 'FIND BUDDY', href: '/home', current: false },
  { name: 'CHAT', href: '/chat', current: false },
  { name: 'GROUPS', href: '/group', current: false },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center">
            <NavLink to="/" className="reroutetohome">
                <img
                  className="h-11 w-auto mr-2 hover:text-orange-500"
                  src={img1}
                  alt="Your Project"
                />
              </NavLink>
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
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <div className="profilepic">
                    <NavLink to="/login">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={img2}
                          alt="Empty profile"
                        />
                      </NavLink>
                    </div>
                  </Menu.Button>
                </div>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}