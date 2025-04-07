import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../operations/user";


export const ProfileSetting = ({setIsEditing}) => {
const loggedInUser =  useSelector(store=>store.auth)
 const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if(loggedInUser){
     reset({
      firstName:loggedInUser?.firstName,
      lastName:loggedInUser?.lastName,
      phoneNumber:loggedInUser?.phoneNumber,
      age:loggedInUser?.age,
      gender:loggedInUser?.gender,
      email:loggedInUser?.email,
      dateOfBirth:loggedInUser?.dateOfBirth?.substring(0,10),
     })
    }
  }, []);

  const onSubmit = async (data,e) => {
    e.preventDefault();
     return updateProfile(dispatch,setIsEditing,data)
  };


  return (
    <section className="bg-slate-300 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Account Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col justify-center items-start gap-2">
              <label className="block text-gray-700 font-medium mb-1">Your First Name</label>
              <input
                {...register("firstName", { required: "Firstname is required" })}
                type="text"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md  "
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            {/* LastName */}
            <div className="flex flex-col justify-center items-start gap-2">
              <label className="block text-gray-700 font-medium mb-1">Your Last Name</label>
              <input
                {...register("lastName", { required: "Name is required" })}
                type="text"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md  "
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>

             {/* Age */}
             <div className="flex flex-col justify-center items-start gap-2">
              <label className="block text-gray-700 font-medium mb-1">Your age</label>
              <input
                {...register("age", { required: "Age is required" })}
                type="number"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md  "
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors?.age?.message}</p>}
            </div>

             {/* Age */}
             <div className="flex flex-col justify-center items-start gap-2">
              <label className="block text-gray-700 font-medium mb-1">Date of birth</label>
              <input
                {...register("dateOfBirth", { required: "DOB is required" })}
                type="date"
                
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md  "
                placeholder="Enter your age"
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors?.dateOfBirth?.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                })}
                type="email"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md  "
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <input
                {...register("phoneNumber", { required: "Phone number is required" })}
                type="text"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Date */}
         

            {/* Gender */}
            <div className="flex flex-col justify-center items-start gap-1">
              <label className="block text-gray-700 font-medium mb-1">Gender</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                type="text"
                className="form-input ring-2 ring-indigo-300 focus:ring-indigo-500 rounded w-[100%] outline-0 px-3 py-1 text-md"
                placeholder="Male / Female / Others"
              >
                <option value={'male'}>Male</option>
                <option value={'female'}>Female</option>
                <option value={'other '}>Other</option>
              </select>
            </div>

      
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              className="w-full md:w-1/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};


