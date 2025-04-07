import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import appStore from './store/reducer/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './components/core/Home/Hero.jsx'
import UserProfile from './components/core/user/UserProfile.jsx'
import UserAppointment from './components/core/user/UserAppointment.jsx'
import UserBookAppointment from './components/core/user/UserBookAppointment.jsx'
import { MainLayout } from './components/core/Dashboards/UserDashbaord.jsx'
import { Provider } from 'react-redux'
import Signup from './components/core/Auth/Signup.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {path:"/",element:<Hero/>},
      {path:'/signup',element:<Signup/>},
    ]

  },
  {
    path:"/user-dashboard",
    element:<MainLayout/>,
    children:[
      {path:"/user-dashboard/",element:<UserAppointment/>},
      {path:"/user-dashboard/book-new-appointment",element:<UserBookAppointment/>},
      {path:"/user-dashboard/profile",element:<UserProfile/>},
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
    <RouterProvider router={router}/>

    </Provider>

  </StrictMode>,
)
