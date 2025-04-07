import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../../operations/doctors";
import { createNewAppoinment } from "../../../operations/apponment";


function UserBookAppointment() {
  const navigate = useNavigate();
  const loggedInUser = useSelector(store=>store.auth)
 const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const getTodayDate = () => new Date().toISOString().split("T")[0];
 console.log(loggedInUser)
  useEffect(() => {
    getAllDoctors(dispatch)
    if(loggedInUser){
      reset({firstName:loggedInUser?.firstName,
        lastName:loggedInUser?.lastName,
        phoneNumber:loggedInUser?.phoneNumber,
        email:loggedInUser?.email,
        age:loggedInUser?.age})
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    // return
    createNewAppoinment(dispatch,navigate,data);
  };

 const allDoctors =  useSelector(store=>store.doctor)
  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Book an Appointment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Your First Name</label>
              <input
                {...register("firstName", { required: "Firstname is required" })}
                type="text"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md "
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            {/* LastName */}
            <div className="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Your Last Name</label>
              <input
                {...register("lastName", { required: "Name is required" })}
                type="text"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>

             {/* Age */}
             <div className="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Your age</label>
              <input
                {...register("age", { required: "Name is required" })}
                type="number"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
            </div>

            {/* Email */}
            <div className ="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                })}
                type="email"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className ="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <input
                {...register("phoneNumber", { required: "Phone number is required" })}
                type="text"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Date */}
            <div className ="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Appointment Date</label>
              <input
                {...register("appointmentDate", { required: "Appointment date is required" })}
                type="date"
                min={getTodayDate()}
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
              />
            </div>

            {/* Gender */}
            <div className ="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Gender</label>
              <input
                {...register("gender", { required: "Gender is required" })}
                type="text"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
                placeholder="Male / Female / Others"
              />
            </div>

            {/* Doctor */}
            <div className ="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Select Doctor</label>
              <select
                {...register("doctor", { required: "Doctor selection is required" })}
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
              >
                <option value="">Choose your Consultant</option>
                {allDoctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.firstName+" "+doc.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Reason */}
            <div className ="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Reason for Appointment</label>
              <input
                {...register("reason", { required: "Reason is required" })}
                type="text"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
                placeholder="E.g. Regular checkup, pain, etc."
              />
            </div>

            {/* Time */}
            <div className ="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Appointment Time</label>
              <input
                {...register("time", { required: "Time is required" })}
                type="time"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
              />
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              className="w-full md:w-1/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserBookAppointment;
