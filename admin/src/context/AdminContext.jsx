import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "",
  );

  const [artists, setArtists] = useState([]);
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllArtist = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-artist",
        {},
        { headers: { aToken } },
      );

      if (data.success) {
        setArtists(data.artists);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (artId) => {
    try {

      const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {artId}, {headers: {aToken}})

      if (data.success) {
       toast.success(data.message)
       getAllArtist()
        
      }else{
        toast.error(data.message)
      }
      
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  const getAllAppointments = async() => {
    try {

      const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers: {aToken}})

      if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments);
        console.log(appointments.length);
        
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }

  }

  // appointment cancel

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/appointment-cancel', {appointmentId}, {headers:{aToken}})

      if (data.success) {
        toast.success(data.message)
        getAllAppointments()
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  const getDashData = async () =>{
    try {

      const {data} = await axios.get(backendUrl+'/api/admin/dashboard', {headers:{aToken}})

      if (data.success) {
        setDashData(data.dashData)
        toast.success(data.message)
        console.log(data.dashData);
        
        
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    artists,
    getAllArtist,
    changeAvailability,
    appointments, setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData
  };
  
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
