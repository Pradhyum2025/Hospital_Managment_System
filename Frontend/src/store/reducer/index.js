import {configureStore} from '@reduxjs/toolkit'
import fetchSlice from '../slices/fetchSlice';
import authSlice from '../slices/auth';
import appointmentSlice from '../slices/appoinments';
import doctorSlice from '../slices/doctors';

const appStore = configureStore({
  reducer:{
   auth:authSlice.reducer,
   appoinment:appointmentSlice.reducer,
   fetching:fetchSlice.reducer,
   doctor:doctorSlice.reducer,
  }
})

export default appStore;