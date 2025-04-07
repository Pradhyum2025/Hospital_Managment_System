import React, { useState, useEffect } from "react";
import {  FiSearch } from "react-icons/fi";
import { format } from "date-fns";

export default function SubHero1(){
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    {
      id: 1,
      name: "Emergency Room",
      hours: "24/7",
      currentStatus: "Busy",
      occupancy: 85,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
    },
    {
      id: 2,
      name: "Cardiology",
      hours: "8:00 AM - 8:00 PM",
      currentStatus: "Available",
      occupancy: 45,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
    },
    {
      id: 3,
      name: "Pediatrics",
      hours: "9:00 AM - 6:00 PM",
      currentStatus: "Limited",
      occupancy: 70,
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842"
    }
  ];

  const staff = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      department: "Emergency Room",
      status: "On Duty",
      shift: "Morning",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      department: "Cardiology",
      status: "Off Duty",
      shift: "Evening",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
    },
    {
      id: 3,
      name: "Dr. Emily Williams",
      department: "Pediatrics",
      status: "On Call",
      shift: "Night",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f"
    }
  ];

  const resources = [
    {
      id: 1,
      name: "ICU Beds",
      total: 50,
      available: 12,
      status: "Limited"
    },
    {
      id: 2,
      name: "Ventilators",
      total: 30,
      available: 20,
      status: "Available"
    },
    {
      id: 3,
      name: "Operating Rooms",
      total: 10,
      available: 2,
      status: "Critical"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);



  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-500";
      case "limited":
        return "bg-yellow-500";
      case "critical":
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Hospital HORO</h1>
          <div className="flex items-center space-x-4">
          
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-2">Welcome to Hospital HORO</h2>
          <p className="text-gray-600 dark:text-gray-300">Real-time hospital operations and resource overview system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Patients</h3>
            <p className="text-3xl font-bold text-blue-600">127</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Available Doctors</h3>
            <p className="text-3xl font-bold text-green-600">24</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Emergency Cases</h3>
            <p className="text-3xl font-bold text-red-600">8</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Scheduled Surgeries</h3>
            <p className="text-3xl font-bold text-purple-600">12</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              {format(currentTime, "EEEE, MMMM do yyyy, h:mm:ss a")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Hours: {dept.hours}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${getStatusColor(
                        dept.currentStatus
                      )}`}
                    >
                      {dept.currentStatus}
                    </span>
                    <span className="text-sm">{dept.occupancy}% Occupancy</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="md:text-2xl font-bold">Staff Availability</h2>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search staff..."
                className="pl-10 pr-4 py-2 w-[90%] rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-4"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {member.department}
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${member.status === "On Duty"
                        ? "bg-green-500 text-white"
                        : member.status === "On Call"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                        }`}
                    >
                      {member.status}
                    </span>
                    <span className="ml-2 text-sm">{member.shift} Shift</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Resource Allocation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">{resource.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span>Available:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-white ${getStatusColor(
                      resource.status
                    )}`}
                  >
                    {resource.available}/{resource.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`${getStatusColor(
                      resource.status
                    )} h-2.5 rounded-full`}
                    style={{
                      width: `${(resource.available / resource.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Hospital Announcements</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="border-l-4 border-blue-500 pl-4 mb-4">
              <h3 className="font-semibold">COVID-19 Vaccination Drive</h3>
              <p className="text-gray-600 dark:text-gray-300">Available for all staff members this weekend.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 mb-4">
              <h3 className="font-semibold">New MRI Machine Installation</h3>
              <p className="text-gray-600 dark:text-gray-300">Radiology department upgrade scheduled next week.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold">Staff Training Session</h3>
              <p className="text-gray-600 dark:text-gray-300">Mandatory emergency response training on Friday.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
