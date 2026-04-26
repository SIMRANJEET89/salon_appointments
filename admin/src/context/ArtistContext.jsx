import { useState } from "react"
import { createContext } from "react"
import axios from 'axios'
import {toast }from 'react-toastify'

export const ArtistContext = createContext()

const ArtistContextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [artistToken, setArtistToken] = useState(localStorage.getItem("artistToken") ? localStorage.getItem("artistToken") : "",)

    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)


    const getAppointments = async() => {
        try {

            const {data} = await axios.get(backendUrl+'/api/artist/appointments', {headers: {artistToken}})


            console.log("FULL RESPONSE:", data);

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
                
                
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }
    }

    const completeAppointment = async(appointmentId) => {
        try {

            const {data} = await axios.post(backendUrl + '/api/artist/complete-appointment', {appointmentId}, {headers: {artistToken}})

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                
            }else{
                toast.error(data.message)
            }

            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }
    }

    const cancelAppointment = async(appointmentId) => {
        try {

            const {data} = await axios.post(backendUrl + '/api/artist/cancel-appointment', {appointmentId}, {headers: {artistToken}})

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                
            }else{
                toast.error(data.message)
            }

            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }
    }

    const getDashData = async () => {

        try {

            const {data} = await axios.get(backendUrl+ '/api/artist/dashboard', {headers: {artistToken}})

            if (data.success) {
               setDashData(data.dashData)
               console.log(data.dashData);
               
                
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }
    }

    const getProfileData = async () => {

        try {

            const {data} = await axios.get(backendUrl + '/api/artist/profile', {headers: {artistToken}})

            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData);
                
                
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const value = {
        artistToken, setArtistToken,
        backendUrl,
        getAppointments,
        appointments, setAppointments,
        completeAppointment, cancelAppointment,
        dashData, setDashData,
        getDashData,
        profileData, setProfileData,
        getProfileData

    }
    return (
        <ArtistContext.Provider value={value}>
            {props.children}
        </ArtistContext.Provider>
    )
   
}
export default ArtistContextProvider