import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ArtistContext } from '../context/ArtistContext.jsx'

const Login = () => {

    const [state, setState] = useState('Admin')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {setAToken, backendUrl} = useContext(AdminContext)
    const {setArtistToken} = useContext(ArtistContext)

    const onSubmitHandler = async (event) =>{
      event.preventDefault()

      try { 
         if (state === 'Admin') {
            const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
         if (data.success) {
           localStorage.setItem('aToken', data.token)
           setAToken(data.token)
            
         }else{
            toast.error(data.message)
         }
            
         }    else{
            const {data} = await axios.post(backendUrl+ '/api/artist/login', {email, password})
            if (data.success) {
           localStorage.setItem('artistToken', data.token)
           setArtistToken(data.token)
           console.log(data.token);
           

         } else{
            toast.error(data.message)
         } 
      } 
         
      }catch (error) {
         console.log(error);
         
      }
    }

  return (

    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
     <div className='flex flex-col items-start p-8 gap-3 rounded-xl shadow-lg m-auto min-w-[340px] sm:min-w-96 border text-sm text-gray-700'>
        <p className='text-2xl font-semibold m-auto'><span className='text-rose-800'>{state } </span> Login</p>
    
     <div className='w-full'>
        <p className='text-rose-800 font-semibold'>Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full rounded border border-gray-300 p-2 mt-1' type="email" required />
     </div>
     <div className='w-full'>
        <p className='text-rose-800 font-semibold'>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full rounded border border-gray-300 p-2 mt-1' type="password" required />
     </div>
     <button className='bg-rose-800 w-full text-rose-100 py-2 rounded-md text-base'>Login</button>
     {
      state === 'Admin' ? 
      <p>Artist Login? <span onClick={()=>setState('Artist')} className='text-rose-800 underline cursor-pointer'>Click here</span></p>:
      <p>Admin Login? <span onClick={()=>setState('Admin')} className='text-rose-800 underline cursor-pointer'>Click here</span></p>
     }
    </div>
    </form>
  )
}

export default Login