import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './components/auth/Login';
import Layout from './components/Layout';
import ContactPage from './components/pages/Contact';
import Register from './components/auth/Register';
import Medicine from './components/Medicine/Medicine';
import OtpConfirmation from './components/auth/OtpVerify';
import Appoint from './components/appointment/Appoint';
import Details from './components/appointment/Details';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />
    },
    {
      path: "/contact",
      element: <ContactPage />
    },
    {
      path:"/section/:id",
      element : <Details/>
    },
    {
      path: "/login",
      element: <Login />,
      
    },
    {
      path: "/register",
      element: <Register />
      
    },{
      path:"/otp-verify",
      element:<OtpConfirmation/>
    },{
      
        path:'/medicine',
        element:<Medicine/>
      }
      ,{
        path:'/appointment',
        element:<Appoint/>
      }
    
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
