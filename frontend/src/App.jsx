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
      path: "/login",
      element: <Login />,
      
    },
    {
      path: "/register",
      element: <Register />
      
    },{
      
        path:'/medicine',
        element:<Medicine/>
      }
    
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
