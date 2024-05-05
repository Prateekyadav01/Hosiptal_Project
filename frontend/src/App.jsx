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

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/team",
          element: <Team />,
        },
       
        {
          path:"/contact",
          element:<ContactPage/>
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
