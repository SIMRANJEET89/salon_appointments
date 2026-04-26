import React, {useContext} from 'react'
import { AdminContext } from '../context/AdminContext'
import {assets} from '../assets/assets'
import {NavLink} from 'react-router-dom'
import { ArtistContext } from '../context/ArtistContext'


const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {artistToken} = useContext(ArtistContext)

  return (
    <div className='border-r min-h-screen'>
        { aToken && <ul className='mt-5 font-medium'>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-rose-100 text-rose-800 border-r-4' : ''}`} to={'/admin-dashboard'}>
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-rose-100 text-rose-800 border-r-4' : ''}`} to={'/all-appointment'} >
                <img src={assets.appointment_icon} alt="" />
                <p>Appointment</p>

            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-rose-100 text-rose-800 border-r-4' : ''}`} to={'/add-artist'}>
                <img src={assets.add_icon} alt="" />
                <p>Add Artist</p>

            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-rose-100 text-rose-800 border-r-4' : ''}`} to={'/artist-list'}>
                <img src={assets.people_icon} alt="" />
                <p>Artist List</p>

            </NavLink>
        </ul>
        }

         { artistToken && <ul className='mt-5 font-medium'>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-rose-100 text-rose-800 border-r-4' : ''}`} to={'/artist-dashboard'}>
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-rose-100 text-rose-800 border-r-4' : ''}`} to={'/artist-appointment'} >
                <img src={assets.appointment_icon} alt="" />
                <p>Appointment</p>

            </NavLink>
            
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-rose-100 text-rose-800 border-r-4' : ''}`} to={'/artist-profile'}>
                <img src={assets.people_icon} alt="" />
                <p>Profile</p>

            </NavLink>
        </ul>
        }
    </div>
  )
}

export default Sidebar