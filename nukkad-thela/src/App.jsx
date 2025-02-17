import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

      {/* <div className=""> */}
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}> </Route>
        {/* </div>{" "} */}
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
