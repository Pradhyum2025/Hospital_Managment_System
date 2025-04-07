
import axiosInstance from "../helper/axiosInstance";
import { appointmentSliceAction } from "../store/slices/appoinments";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import toast from "react-hot-toast";

// Upload new listing
export const createNewAppoinment = async (dispatch, navigate, apponmentData) => {
  try {

    dispatch(fetchSliceAction.serializeFetching())
    // Send request with authorization
    const res = await axiosInstance.post(`/appoinment`, apponmentData);
    dispatch(fetchSliceAction.deserializeFetching())
    if (res.data && res.data.success) {
      // console.log("CREATE APPOINMENT RESPONSE --->>>", res)
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
      navigate('/user-dashboard');
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

export const getMyAppoinments = async(dispatch)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching())
    const res = await axiosInstance.get(`/appoinment`);
    dispatch(fetchSliceAction.deserializeFetching())
    if (res.data && res.data.success) {
      // console.log("All appoinment Response --->>>", res)
      dispatch(appointmentSliceAction.setAppoinmentData(res.data.myAppointments));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching())
    console.log('Get all appoinment error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

export const ScheduleAppoinment = async (dispatch,appoinmentId, updatedData, setIsEditing) => {
  try {

    dispatch(fetchSliceAction.serializeFetching())
    // Send request with authorization
    const res = await axiosInstance.patch(`/appoinment/schedule/${appoinmentId}`, updatedData);
    dispatch(fetchSliceAction.deserializeFetching())
    if (res.data && res.data.success) {
      // console.log("SCHEDULE APPOINMENT RESPONSE --->>>", res) 
      dispatch(appointmentSliceAction.scheduleAppoinment(res.data.savedAppointment))
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
      setIsEditing(()=>false)
    }
  } catch (error) {
    // dispatch(fetchSliceAction.deserializeFetching())
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

export const chnageAppoinmentStatus = async (dispatch,appoinmentId,statusValue, setIsStatusEditing) => { 
  //  dispatch,appointment._id,statusValue,setIsStatusEditing
  try {

    dispatch(fetchSliceAction.serializeFetching())
    // Send request with authorization
    const res = await axiosInstance.patch(`/appoinment/status/${appoinmentId}`, {statusValue});
    dispatch(fetchSliceAction.deserializeFetching())
    // console.log("STTAUS CHNAGED APPOINMENT RESPONSE --->>>", res)
    if (res.data && res.data.success) {
      dispatch(appointmentSliceAction.setApponmentStatus({appoinmentId,statusValue}))
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
      setIsStatusEditing(()=>false)
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching())
    toast.error(error?.response?.data?.message, {
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
    console.log('APPOINMNET STATUS error : ', error)
    throw new Error(
      error?.response?.data?.message || error?.message || "An unknown error occurred."
    );
  }
}
