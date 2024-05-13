import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import Team from './components/Team';
import Login from './components/auth/Login';
import Layout from './components/Layout';
import ContactPage from './components/pages/Contact';
import Register from './components/auth/Register';

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
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
