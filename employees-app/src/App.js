import './App.css';

//import React-router-dom
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

//import components
import Homepage from './components/homepage/Homepage';
import RootComponent from './components/rootComponent/RootComponent';
import ErrorPage from './components/errorPage/ErrorPage';
import Registration from './components/registration/Registration';
import AdminPage from './components/admin/AdminPage';
import Memeber from './components/member/Memeber';
function App() {

  //create router object
  const routerObject = createBrowserRouter([
    {
      path:"",
      element:<RootComponent/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:"",
          element:<Homepage/>
        },
        {
          path:"register",
          element:<Registration/>
        },
        {
          path:"admin",
          element:<AdminPage/>
        },
        {
          path:"member",
          element:<Memeber/>
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={routerObject}/>
    </div>
  );
}

export default App;
