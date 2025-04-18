import toast from "react-hot-toast";
import { authSliceAction } from "../store/slices/auth";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import axiosInstance from "../helper/axiosInstance";


// Signup function handler
export const signUp = async (navigate, dispatch, signUpData) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.post('/auth/signup', signUpData, {
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res && res?.data?.success) {
      console.log("SIGNUP RESPONSE ---->>:", res)
      //save user info into local storage
      window.localStorage.setItem('currUser', JSON.stringify(res.data.loggedInUser));
      dispatch(authSliceAction.setUserData(res.data.loggedInUser))
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '350px',
          height:'40px',
          padding:'0px 10px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })

      navigate('/');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('SignUp error :',error)
    toast.error(error?.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        height:'60px',
        padding:'0px 20px',
        fontWeight: 900
      },
      position: 'bottom-center'
    });
  }

}

// Login / Signin function handler
export const signIn = async (navigate,dispatch,formData,currPath,setFetching) => {
  try {
    setFetching(()=>true)
    const res = await axiosInstance.post('/auth/login', formData);
    setFetching(()=>false)
    if (res.data && res.data.success) {
      console.log("LOGIN RESPONSE --->>>", res)
      dispatch(authSliceAction.setUserData(res.data.loggedInUser));
      window.localStorage.setItem('currUser', JSON.stringify(res.data.loggedInUser));
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '350px',
          height:'40px',
          padding:'0px 10px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })
      document.getElementById('my_modal_3').close()
      navigate(`${currPath}`);
    }
  } catch (error) {
    setFetching(()=>false)
    toast.error(error?.response?.data?.message, { 
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        height:'60px',
        padding:'0px 20px',
        fontWeight: 900
      },
      position: 'right-center'
     });
    console.log('Login error : ', error)
  }

}


// Sign out function 
export const signOut = (dispatch, navigate) => {
  dispatch(authSliceAction.signout())
  dispatch(fetchSliceAction.deserializeFetching());
  toast.success('Logout successful', {
    style: {
      background: '#001a00',
      color: '#f2f2f2',
      borderRadius: '0px',
      width: '350px',
      height:'40px',
      padding:'0px 10px',
      fontWeight: 900
    },
    position: 'bottom-center'
  })
  navigate('/')
}


