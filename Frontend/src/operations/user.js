import toast from "react-hot-toast";
import { authSliceAction } from "../store/slices/auth";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import axiosInstance from "../helper/axiosInstance";

// Upload new listing
export const updateProfile = async (dispatch, setIsEditing,updatedData) => {
  try {

    dispatch(fetchSliceAction.serializeFetching())
    // Send request with authorization
    const res = await axiosInstance.patch(`/user/profile-update`,updatedData);
    dispatch(fetchSliceAction.deserializeFetching())
    if (res.data && res.data.success) {
      // console.log("Update Profile RESPONSE --->>>", res);
      //save user info into local storage
      window.localStorage.setItem('currUser', JSON.stringify(res.data.updatedUser));
      dispatch(authSliceAction.setUserData(res.data.updatedUser))
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center',
        duration: 2000
      })
      if(setIsEditing){
        setIsEditing(()=>false)
      }
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching())
    toast.error(error.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'bottom-center',
      duration: 2000
    });
    console.log('CREATE APPOINMENT error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}
