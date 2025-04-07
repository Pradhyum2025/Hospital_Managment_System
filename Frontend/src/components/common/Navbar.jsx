import React, { useState } from "react";
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaRegHospital } from "react-icons/fa";
import {Link, useLocation} from 'react-router-dom'
import { RiHospitalFill } from "react-icons/ri";
import { useSelector } from "react-redux";
export const Navbar = () => {
  const currPath = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
 const currUser= useSelector(store=>store.auth);
  const navItems = [
    { name: "Services", link: "#" },
    { name: "Doctors", link: "#" },
    { name: "Appointments", link: "/user-dashboard" },
    { name: "Contact", link: "#" },
  ];

  const handleNavigateLogin = () => {
    setIsOpen(()=>!isOpen)
    if (currPath === '/signup') {
      navigate('/');
    }
    return document.getElementById('my_modal_3').showModal();
  }

  return (
    <nav className="bg-white shadow-lg font-underDog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
          <FaRegHospital className="text-2xl text-blue-600"/>
          </div>

          <div className="hidden md:flex gap-x-10 items-center space-x-0">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}

                className="text-gray-700 hover:text-blue-600 px-1 w-full py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end space-x-4 w-full md:w-[40%]">
            {currUser?.email?
            <Link  to={'/user-dashboard'} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Account
            </Link>
            :
            <button  onClick={handleNavigateLogin} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Login
            </button>
            }
            <button className="hidden md:flex bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Emergency Contact
            </button>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                onClick={()=>setIsOpen(false)}
                to={item.link}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
            <button
            onClick={() => setIsOpen(!isOpen)}
             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Emergency Contact
            </button>
          </div>

          </div>
        </div>
      )}
    </nav>
  );
};