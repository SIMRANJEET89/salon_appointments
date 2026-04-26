import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedArtist = ({artId, speciality}) => {

 const {artists} = useContext(AppContext)   
 const navigate = useNavigate()
 const [relArt, setRelArts] = useState([])

 useEffect(()=> {
    if (artists.length > 0 && speciality) {
        const artistData = artists.filter(
            (art) => art.speciality === speciality && art._id !== artId
        )
        setRelArts(artistData)
        
    }
 }, [artists, speciality, artId])



  return (
    <div className="flex flex-col items-center gap-4 m-16 md:mx-10">
      <h1 className="text-3xl font-medium">Top Artist To Book</h1>
      <p className="sm:w-1/3 text-sm text-center">
        Simply browse through our extensive list of trusted Artists.
      </p>

      <div  className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relArt.slice(0,5).map((item, index) => (
          <div
          onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            className="border border-rose-800 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 cursor-pointer bg-rose-100"
            key={index}
          >
            <img className="object-cover w-full h-56 gap-4" src={item.image} alt="" />
            <div className="p-4">
               <div className={`flex items-center ${item.available ? 'text-green-500' : 'text-rose-800'} gap-2 text-sm text-center`}>
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className="px-5 font-medium text-lg">{item.name}</p>
              <p className="px-5 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => {navigate('/artists')}} className="border border-rose-800 rounded-3xl px-5 py-2 bg-rose-100 cursor-pointer hover:bg-rose-50 font-medium">More</button>
    </div>
  )
}

export default RelatedArtist