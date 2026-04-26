import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllArtist from "./pages/AllArtist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ArtistAppointment from './pages/ArtistAppointment'


const App = () => {
  return (
    <>
    {/* <div className="max-4 sm:mx-[10%]"> */}
      <ToastContainer/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<AllArtist />} />
           <Route path="/artists/:speciality" element={<AllArtist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointment" element={<MyAppointment />} />
          <Route path="/appointment/:artId" element={<ArtistAppointment/>}/>
        </Routes>
        <Footer/>
       {/* </div> */}
    </>
  );
};

export default App;
