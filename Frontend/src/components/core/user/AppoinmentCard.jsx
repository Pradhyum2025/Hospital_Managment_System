import React, { useState } from "react";
import { FaUser, FaCalendarAlt, FaStethoscope, FaClock, FaPhone, FaEnvelope, FaMapMarkerAlt, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import { chnageAppoinmentStatus, ScheduleAppoinment } from "../../../operations/apponment";
import { useDispatch, useSelector } from "react-redux";
import { SiGooglemessages } from "react-icons/si";
import toast from "react-hot-toast";

export const AppointmentCard = ({ appointment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isStatusEditing, setIsStatusEditing] = useState(false)
  const [newDate, setNewDate] = useState(appointment?.appointmentDate);
  const [newTime, setNewTime] = useState(appointment?.time);
  const [department, setDepartment] = useState(appointment?.department || '');
  const [notes, setNotes] = useState(appointment?.notes || '')
  const dispatch = useDispatch();
  const loggedInUser = useSelector(store => store.auth);


  // const appointment = {
  //   status: "inProgress",
  //   patientName: "Sarah Johnson",
  //   patientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  //   contactNumber: "+1 (555) 123-4567",
  //   email: "sarah.j@email.com",
  //   date: "2024-02-15",
  //   time: "10:30 AM",
  //   doctor: "Dr. Michael Anderson",
  //   department: "Cardiology",
  //   reason: "Annual Heart Checkup",
  //   location: "Medical Center, Room 204"
  // };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300";
      case "inProgress":
        return "bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300";
      default:
        return "text-gray-500";
    }
  };

  const formattedDate = new Date(appointment?.appointmentDate).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSaveChanges = async () => {
    if (newTime && newDate && department && notes && appointment._id) {
      const payload = {
        time: newTime,
        appointmentDate: newDate,
        department,
        notes
      }

      return ScheduleAppoinment(dispatch, appointment._id, payload, setIsEditing)
    } else {
      toast.error('Fill all mendatory fields', {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 600

        },
        position: 'bottom-center',
        duration: 2000
      })
    }
  }

  const handleStatusChange = (e) => {
    if (e.target.value) {
      const statusValue = e.target.value;
      return chnageAppoinmentStatus(dispatch, appointment._id, statusValue, setIsStatusEditing);
    }
  }
  const statusOptions = ["completed", "cancelled"];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">

            {isStatusEditing && loggedInUser.role == 'doctor' ? (
              <div className="flex gap-x-4">
                <select
                  defaultValue={appointment.status}
                  onChange={(e) => handleStatusChange(e)}
                  className={`${getStatusColor(appointment.status)} px-3 py-1 rounded-full text-sm font-medium cursor-pointer`}
                >
                  <option>{appointment.status}</option>

                  {appointment.status === 'scheduled' &&
                    <>
                      <option key={'completed'} value={'completed'}>
                        {'completed'.charAt(0).toUpperCase() + 'completed'.slice(1)}
                      </option>
                      <option key={'cancelled'} value={'cancelled'}>
                        {'cancelled'.charAt(0).toUpperCase() + 'cancelled'.slice(1)}
                      </option>
                    </>
                  }

                  {appointment.status === 'inProgress' &&
                    <option key={'cancelled'} value={'cancelled'}>
                      {'cancelled'.charAt(0).toUpperCase() + 'cancelled'.slice(1)}
                    </option>

                  }
                </select>
                <button
                  onClick={() => setIsStatusEditing(() => false)}
                  className="text-red-500 hover:text-red-700 transition-colors  cursor-pointer"
                  aria-label="Cancel edit"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className="flex gap-x-10">
                <span
                  className={`${getStatusColor(
                    appointment.status
                  )} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {appointment.status}
                </span>
                {
                  loggedInUser.role == 'doctor' &&
                  <button
                    onClick={() => setIsStatusEditing(() => true)}
                    disabled={appointment.status === 'cancelled' || appointment.status === 'completed'}
                    className="text-blue-500 hover:text-blue-700 transition-colors disabled:cursor-not-allowed  cursor-pointer"
                    aria-label="Edit appointment"
                  >
                    <FaEdit />
                  </button>
                }

              </div>
            )}

            
              <div className="flex gap-2">
                { loggedInUser.role === 'doctor' &&
                  <>
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveChanges}
                        className="text-green-500 hover:text-green-700 transition-colors"
                        aria-label="Save changes"
                      >
                        <FaCheck />
                      </button>

                      <button
                        onClick={() => setIsEditing(() => false)}
                        className="text-red-500 hover:text-red-700 transition-colors  cursor-pointer"
                        aria-label="Cancel edit"
                      >
                        <FaTimes />
                      </button>
                    </>
                    
                  ) : (
                    <button
                      onClick={() => setIsEditing(() => true)}
                      disabled={appointment.status === 'cancelled' || appointment.status === 'completed'}
                      className="text-blue-500 hover:text-blue-700 transition-colors disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Edit appointment"
                    >
                      <FaEdit />
                    </button>
                  )}
                  </>
                }

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-500 hover:text-gray-700 transition-colors btn  cursor-pointer font-[700] min-h-[2rem] h-[2rem] px-3"
                  aria-label="Toggle details"
                >
                  {isExpanded ? "Less Details" : "More Details"}
                </button>

              </div>
        

          </div>

          {/* Patient Information */}
          <div className="flex items-center space-x-4 mb-6">

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {appointment.patient}
              </h2>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaUser className="text-blue-500" />
                <span>Patient ID: #12345</span>
              </div>
            </div>
          </div>

          {/* Primary Appointment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                {isEditing && loggedInUser.role == 'doctor' ? (
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(() => e.target.value)}
                    className="font-medium border rounded px-2 py-1"
                  />
                ) : (
                  <p className="font-medium">{formattedDate}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaClock className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                {isEditing && loggedInUser.role == 'doctor' ? (
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(() => e.target.value)}
                    className="font-medium border rounded px-2 py-1"
                  />
                ) : (
                  <p className="font-medium">{appointment.time}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaStethoscope className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{appointment.doctor?.firstName + " " + appointment.doctor?.lastName}</p>
              </div>
            </div>
            {appointment.status !== 'inProgress' &&
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  {isEditing && loggedInUser.role == 'doctor' ? (
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(() => e.target.value)}
                      className="font-medium border rounded px-2 py-1"
                    />
                  ) : (
                    <p className="font-medium">{appointment?.department}</p>
                  )}
                </div>

              </div>
            }
            {/* Notes */}

            <div className="flex items-center space-x-3">
              {notes &&
                <SiGooglemessages className="text-blue-500 text-xl" />
              }
              <div>
                {notes &&
                  <p className="text-sm text-gray-500">Leave not for patient</p>
                }
                {isEditing && loggedInUser.role == 'doctor' ? (
                  <textarea
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(() => e.target.value)}
                    className="font-medium border rounded px-2 py-1"
                  />
                ) : (
                  <>
                    {notes &&
                      <p className="font-medium">{appointment.notes}</p>
                    }
                  </>
                )}
              </div>

            </div>
          </div>

          {/* Expandable Details */}
          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium">{appointment.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{appointment.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Reason for Visit</p>
                  <p className="text-gray-700">{appointment.reason}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

