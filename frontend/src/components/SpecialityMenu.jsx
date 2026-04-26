import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16'>
        <h1 className='text-center text-3xl font-medium'>Find By Speciality</h1>
        <p className='text-sm w-1/3 text-center'>Simply browse throught our extensive list of trusted artists, schedule your appointment hassle-free.</p>
        <div className='flex justify-center gap-3 pt-5 w-full overflow-x-auto'>
            {specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center flex-shrink-0 hover:translate-y-[-10px] translate-all text-xs cursor-pointer transition-all duration-500' key={index} to={`/artists/${item.speciality}`}>
            <img className='w-16 rounded-full sm:w-24 mb-2 border border-black bg-rose-800' src={item.image} alt="" />
            <p>{item.speciality}</p>
            </Link>
                
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu