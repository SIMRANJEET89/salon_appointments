import React from 'react'
import { useContext } from 'react'
import { ArtistContext } from '../../context/ArtistContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const ArtistProfile = () => {
  
  const {artistToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(ArtistContext)
  const {currency} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {

      const updateData = {
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available
      }

      const {data} = await axios.post(backendUrl + '/api/artist/update-profile', updateData, {headers: {artistToken}})

      if (data.success) {
        setIsEdit(false),
        getProfileData()
        toast.success(data.message)
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
      
    }
  }

useEffect(()=>{
  if (artistToken) {
    getProfileData()
    
  }
}, [artistToken])

  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='w-50 h-50 sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
<div className='flex-1 border border-rose-800 rounded-lg p-8 py-7 bg-rose-100'>
  {/* artist info name, experience */}
  <p className='text-3xl text-rose-800'>{profileData.name}</p>

  <div className='flex gap-4 text-'>
    <p className='font-medium'>{profileData.speciality}</p>
    <button className='border border-rose-800 rounded-full px-2 text-sm'>{profileData.experience}</button>
  </div>

  {/* art about */}
  <div>
    <p className='text-sm pt-3 font-medium'>About:</p>
    <p>{profileData.about}</p>
  </div>
<p className='mt-4 font-medium'>Appointment fees:
  <span>{currency} {isEdit ? <input type="number"  onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees}/> :profileData.fees}</span>
</p>

<div className='flex gap-2'>
  <p>Address:</p>
  <p className='text-sm'>
    {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev, address:{...prev.address, line1:e.target.value}}))} value={profileData.address.value}/> : profileData.address.line1}
    <br />
   {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev, address:{...prev.address, line2:e.target.value}}))} value={profileData.address.value}/> : profileData.address.line2}
  </p>
</div>

<div className='flex gap-1 pt-2'>
  <input onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" name="" id="" />
  <label htmlFor="">Available</label>
</div>
{
  isEdit
  ? <button onClick={updateProfile} className='mt-4 border border-rose-800 px-5 py-1 rounded-full hover:bg-rose-800 hover:text-rose-100 cursor-pointer'>Save</button>
  : <button onClick={()=>setIsEdit(true)} className='mt-4 border border-rose-800 px-5 py-1 rounded-full hover:bg-rose-800 hover:text-rose-100 cursor-pointer'>Edit</button>
}

</div>
</div>
</div>
  )
}

export default ArtistProfile