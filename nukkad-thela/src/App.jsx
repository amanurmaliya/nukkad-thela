import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Payment from "./pages/payment/Payment.jsx";
import './App.css'
import CreateDish from "./pages/vendor/CreateDish.jsx";
import UserReview from "./pages/user/UserReview.jsx";
import Order from "./pages/user/Order.jsx";
import PhotoUpload from "./pages/vendor/PhotoUpload.jsx";
import VendorDashboard from "./pages/vendor/VendorDashboard.jsx";
import Menu from "./pages/vendor/Menu.jsx";
import ShowReviews from "./pages/vendor/ShowReview.jsx";
import ShopDetail from "./pages/vendor/ShopDetail.jsx";
import Header from "./utils/Header.jsx";
import Footer from "./utils/Footer.jsx";
import ShowShopDetails from "./pages/user/ShowShopDetails.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import OrderSuccess from "./pages/payment/OrderSuccess.jsx";
import OrderTracking from "./pages/user/OrderTracking.jsx";
import ShopPage2 from "./pages/user/ShopPage2.jsx";
import CustomerDashboard from "./pages/user/UserDashboard2.jsx";
import ShopOrders from "./pages/vendor/ShopOrders.jsx";
import OrderStatus from "./pages/user/OrderStatus.jsx";
import About from "./pages/about/About.jsx";

function App() {
  return (
    <>
    <div>
    <Header/>
    <BrowserRouter>
    <Routes>

      {/* <div className=""> */}
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}> </Route>

        {/* For all other routes send to the page not found route 
        For this we had created a seperate component itself*/}
        <Route path="*" element={<PageNotFound/>}> </Route>
        <Route path="/payment" element={<Payment/>}></Route>
        <Route path="/create-dish" element={<CreateDish/>}></Route>
        <Route path="/create-review" element={<UserReview/>}></Route>
        <Route path="/order-details" element={<Order/>}></Route>
        <Route path="/upload-photo" element={<PhotoUpload/>}></Route>
        <Route path="/dashboard" element={<VendorDashboard/>}></Route>
        <Route path="/menu" element={<Menu/>}></Route>
        <Route path="/show-reviews" element={<ShowReviews/>}></Route>
        <Route path="/shop-detail" element={<ShopDetail/>}></Route>
        <Route path="/shop-detail/:id" element={<ShowShopDetails/>}></Route>
        <Route path="/" element={<UserDashboard/>}></Route>
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-track" element={<OrderTracking/>}></Route>
        <Route path="/manisha" element={<CustomerDashboard/>}></Route>
        <Route path='/show-orders' element={<ShopOrders/>}></Route>
        <Route path="/show-user-orders" element={<OrderStatus/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        {/* </div>{" "} */}
    </Routes>
    </BrowserRouter>
    {/* <Footer/> */}
        </div>
    </>
  );
}

export default App;
