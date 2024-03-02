import './App.css';
import {Home} from './components/Home.js';
import {List} from './components/List.js';
import {Login , createAction} from './components/Login.js';
import {Register} from './components/Register.js';
import {Auth} from './components/Auth.js';
import {BrowserRouter, Router, Routes,createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from "react-router-dom";


function App() {

 
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Home />}>
  //        <Route  path="login" element={<Login/>}></Route>
  //             <Route  exact path="register" element={<Register/>}></Route>

  //             <Route  path="list" element={<Auth/>}></Route>
  //     </Route>


  //   )
  // );
 
  return (

  //  <RouterProvider router={router} />
      <BrowserRouter>
       
             <Routes>
             <Route path="/" element={<Home />}>
                <Route  path="login" element={<Login/>}></Route>
                    <Route   path="register" element={<Register/>}></Route>

                    <Route  path="list" element={<Auth/>}></Route>
                </Route>
             </Routes>
     
      
      </BrowserRouter>
  );
}






export default App;
