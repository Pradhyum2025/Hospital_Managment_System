import React, { useState } from "react";
import { FiPhone, FiMail, FiCalendar, FiCopy, FiEdit2 } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";

export const UserProfilePage = ({setIsEditing}) => {
  const [copied, setCopied] = useState("");

  // const userData = {
  //   name: "Alexander Mitchell",
  //   role: "Senior Software Engineer",
  //   email: "alex.mitchell@example.com",
  //   phone: "+1 (555) 123-4567",
  //   dateOfBirth: "1990-05-15",
  //   age: 33,
  //   gender: "Male",
  //   location: "San Francisco, CA",
  //   avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //   socials: [
  //     { platform: "LinkedIn", url: "#" },
  //     { platform: "Twitter", url: "#" },
  //     { platform: "GitHub", url: "#" }
  //   ]
  // };
  const userData =  useSelector(store=>store.auth)

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="absolute -bottom-16 w-full flex justify-center">
              <div className="relative">
                <img
                  src={userData?.profileImage}
                  alt={userData?.firstName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-transform hover:scale-105"
                />
                <button onClick={()=>setIsEditing(()=>true)} className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
                  <FiEdit2 className="w-4 h-4 text-gray-600 cursor-pointer" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">{userData.firstName+" "+userData.lastName}</h1>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {userData.role}
            </div>
          </div>

          {/* Profile Details */}
          <div className="border-t border-gray-200 px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="mt-1 text-gray-900">{userData.firstName+" "+userData.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="mt-1 text-gray-900">{userData.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="mt-1 text-gray-900">{userData.age} years</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <div className="mt-1 flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <p className="text-gray-900">{userData?.dateOfBirth?.substring(0,10)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <FiMail className="mr-2 text-gray-400" />
                        <p className="text-gray-900">{userData.email}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(userData.email, "email")}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {copied === "email" ? <IoMdCheckmark className="w-5 h-5" /> : <FiCopy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <FiPhone className="mr-2 text-gray-400" />
                        <p className="text-gray-900">{userData.phoneNumber}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(userData.phoneNumberne, "phone")}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {copied === "phone" ? <IoMdCheckmark className="w-5 h-5" /> : <FiCopy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
