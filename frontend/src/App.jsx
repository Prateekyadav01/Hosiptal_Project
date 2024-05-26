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
      // element: <Layout />
      element:<Medicine/>
    },
    {
      path: "/contact",
      element: <ContactPage />
    },
    {
      path: "/login",
      element: <Login />,
      children:[
        {
          path:'medicine',
          element:<Medicine/>
        }
      ]
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
