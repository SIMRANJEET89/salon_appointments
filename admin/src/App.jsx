import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddArtist from "./pages/Admin/AddArtist";
import AllAppointment from "./pages/Admin/AllAppointment";
import ArtistList from "./pages/Admin/ArtistList";
import Dashboard from "./pages/Admin/Dashboard";
import { ArtistContext } from "./context/ArtistContext";
import ArtistAppointments from "./pages/Artist/ArtistAppointments";
import ArtistDashboard from "./pages/Artist/ArtistDashboard";
import ArtistProfile from "./pages/Artist/ArtistProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const {artistToken} = useContext(ArtistContext)

  return aToken || artistToken ? (
    <div>
      <ToastContainer />
      <Navbar />

      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* admin route */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllAppointment />} />
          <Route path="/add-artist" element={<AddArtist />} />
          <Route path="/artist-list" element={<ArtistList />} />

          {/* artist route */}
          <Route path="/artist-appointment" element={<ArtistAppointments />} />
          <Route path="/artist-dashboard" element={<ArtistDashboard />} />
          <Route path="/artist-profile" element={<ArtistProfile/>} />
          

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
