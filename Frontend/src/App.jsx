import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { Toaster } from 'react-hot-toast'
import Login from './components/core/Auth/Login'

function App() {
  
  return (
    <>
    <Navbar/>
    <Toaster/>
    <Login/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
