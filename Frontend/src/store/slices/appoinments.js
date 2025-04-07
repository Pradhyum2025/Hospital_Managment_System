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
        if(appoinment._id===action.payload._id){
          return action.payload
        }else{
          return appoinment
        }
      })
  }
  ,
  setApponmentStatus: (state, action) => {
    const { appoinmentId, statusValue } = action.payload;
    return state.map(app => {
      if (app._id === appoinmentId) {
        return { ...app, status: statusValue };
      }
      return app;
    });
  }

  
}
})

export default appointmentSlice;
export const appointmentSliceAction = appointmentSlice.actions;