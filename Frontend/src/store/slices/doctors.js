import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name:'doctor',
  initialState:[],
  reducers:{
    setDoctorData:(state,action)=>{
      return [...action.payload]
    },
    setDoctorSeller:(state,action)=>{
      return [action.payload]
    }
  }
})

export const doctorSliceAction  = doctorSlice.actions;
export default doctorSlice;