import React, { useState } from "react";
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";


export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <FaPhone className="mr-2" /> Emergency: +1 (555) 123-4567
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2" /> info@hospital.com
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> 123 Medical Center Drive,
                Healthcare City, HC 12345
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">Services</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">Departments</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">Patient Resources</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">Career Opportunities</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Hospital Name. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};