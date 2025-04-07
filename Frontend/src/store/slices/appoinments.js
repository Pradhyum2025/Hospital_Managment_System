import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: 'appoinment',
  initialState: [],
  reducers: {
    setAppoinmentData: (state, action) => {
      return [...action.payload]
    },
    scheduleAppoinment : (state, action) => {
      return state.map(appoinment=>{
        if(appoinment._id=action.payload._id){
          return action.payload
        }else{
          return appoinment
        }
      })
  }
  ,
  setApponmentStatus : (state, action) => {
    console.log(action.payload)
    return state.map(appoinment=>{
      if(appoinment._id=action.payload.appoinmentId){
        return {...appoinment,status:action.payload.statusValue};
      }else{
        return appoinment
      }
    })
}

  
}
})

export default appointmentSlice;
export const appointmentSliceAction = appointmentSlice.actions;