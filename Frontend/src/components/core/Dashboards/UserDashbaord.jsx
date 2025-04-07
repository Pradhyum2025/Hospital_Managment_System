import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate, Link } from "react-router-dom";
import { FiUsers, FiCalendar, FiBell, FiMessageSquare, FiLogOut, FiMenu } from "react-icons/fi";
import { FaBed } from "react-icons/fa";
import { signOut } from "../../../operations/auth";
import { FaRegHospital } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const Sidebar = ({ isOpen,  toggleSidebar }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(store=>store.auth);
  const navigate = useNavigate();
 


  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64 ' : '-translate-x-full'} lg:translate-x-0 lg:w-64 z-20`}>

      <div className="p-4">

        <button onClick={()=>navigate('/')} className={`btn pl-4 w-full border-0 bg-white p-2 items-center justify-center `}>
          <FaRegHospital className="text-2xl text-blue-600 "/>
        </button>

        <nav className={`space-y-2 `}>
          
          <SidebarLink  icon={<FiCalendar />} text="My Appointments" path="/user-dashboard" toggleSidebar={toggleSidebar} />
          {loggedInUser.role==='patient' &&
          <SidebarLink icon={<FaBed />} text="Admissions" path="/user-dashboard/book-new-appointment" toggleSidebar={toggleSidebar}  />
          } 
          <SidebarLink icon={<FiUsers />} text="profile" path="/user-dashboard/profile" toggleSidebar={toggleSidebar} />
        </nav>

      </div>
    </div>
  );
};

const SidebarLink = ({ icon, text, path,toggleSidebar }) => {
  return (
    <Link
      to={path}
      onClick={toggleSidebar}
      className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{text}</span>
    </Link>
  );
};

const Navbar = ({ toggleSidebar }) => {
  const loggedInUser= useSelector(store=>store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 right-0 left-0 lg:left-64 bg-white shadow-sm z-30">
      <div className="flex items-center justify-between lg:justify-start px-4 py-3">
        <div className="flex items-center justify-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <FiMenu className="text-2xl" />
        </button>

        <button onClick={()=>navigate('/')} className={`btn lg:hidden border-0 bg-white p-2 items-center justify-center `}>
          <FaRegHospital className="text-2xl text-blue-600"/>
        </button>

        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <FiBell className="text-2xl" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <Link to={'/user-dashboard/profile'}>
            <img
              src={loggedInUser?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=40&h=40"}
              alt="User"
              className="h-8 w-8 rounded-full"
            />
            </Link>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{loggedInUser.firstName+ " "+ loggedInUser.lastName}</p>
              <p className="text-xs text-gray-500">{loggedInUser.role}</p>
            </div>
          </div>
          <button onClick={()=>signOut(dispatch,navigate)} className="p-2 rounded-lg hover:bg-gray-100">
            <FiLogOut className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(()=>!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Toaster/>
      <main className="pt-16 lg:pl-64">
        <Outlet/>
      </main>
    </div>
  );
};
