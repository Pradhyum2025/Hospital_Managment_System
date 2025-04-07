
import axiosInstance from "../helper/axiosInstance";
import { doctorSliceAction } from "../store/slices/doctors";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import toast from "react-hot-toast";

export const getAllDoctors = async(dispatch)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching())
    const res = await axiosInstance.get(`/doctor`,{
    });
    dispatch(fetchSliceAction.deserializeFetching())
    if (res.data && res.data.success) {
      console.log("All doctors Response --->>>", res)
      dispatch(doctorSliceAction.setDoctorData(res.data.allDoctors));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching())
    console.log('Get all doctors error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

