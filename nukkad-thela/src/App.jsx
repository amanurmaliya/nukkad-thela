import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

      {/* <div className=""> */}
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}> </Route>

        {/* For all other routes send to the page not found route 
        For this we had created a seperate component itself*/}
        <Route path="*" element={<PageNotFound/>}> </Route>
        {/* </div>{" "} */}
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
