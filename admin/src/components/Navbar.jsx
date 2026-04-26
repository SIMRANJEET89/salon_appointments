import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { ArtistContext } from '../context/ArtistContext'



const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext)
    const {artistToken, setArtistToken} = useContext(ArtistContext)

   const navigate = useNavigate()

   const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    artistToken && setArtistToken('')
    artistToken && localStorage.removeItem('artistToken')
   }

  return (
    <div className='flex justify-center items-center px-4 sm:px-10 py-3 border-b bg-rose-100'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-15 rounded-full cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full'>Admin</p>
        </div>
        <button onClick={logout} className='bg-rose-800 rounded-full text-rose-100 text-sm px-10 py-2
        '>Logout</button>
    </div>
  )
}

export default Navbar