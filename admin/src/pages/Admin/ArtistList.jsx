import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const ArtistList = () => {
  const { artists, aToken, getAllArtist, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllArtist();
    }
    
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="font-medium text-lg">All Artists</h1>
      <div className="flex flex-wrap w-full gap-4  gap-y-4 pt-5">
        {artists.map((item, index) => (
          <div className="border border-rose-800 p-2 rounded-xl max-w-56 overflow-hidden cursor-pointer group hover:bg-rose-100 transition-all duration-500" key={index}>
            <img className="w-60 h-50 bg-rose-100 " src={item.image} alt="" />
            <div className="p-2">
              <p className="font-medium text-lg">{item.name}</p>
              <p className="text-sm text-rose-800">{item.speciality}</p>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.avilable} />
              <p>Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
