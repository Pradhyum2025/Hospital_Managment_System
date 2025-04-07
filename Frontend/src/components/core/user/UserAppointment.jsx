import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getMyAppoinments } from "../../../operations/apponment";
import { useDispatch, useSelector } from "react-redux";
import { AppointmentCard } from "./AppoinmentCard";

function UserAppointment() {
 const dispatch = useDispatch();


  useEffect(() => {
    getMyAppoinments(dispatch)
  }, []);

 const myAppoinmants = useSelector(store=>store.appoinment);
  return (
    <section className="bg-slate-200 py-10 px-4 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h1 className="text-3xl font-semibold text-center mb-6">My Appointments</h1>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {myAppoinmants.length === 0 ? (
            <p className="text-center text-gray-500">No appointments found.</p>
          ) : (
            myAppoinmants.map((appointment, index) => {
              return (
               <AppointmentCard key={index} appointment={appointment}/>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default UserAppointment;
