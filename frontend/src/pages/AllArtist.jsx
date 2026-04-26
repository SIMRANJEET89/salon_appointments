import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AllArtist = () => {
  const { speciality } = useParams();
  const [filterArt, setFilterArt] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { artists } = useContext(AppContext);

  const applyfilter = () => {
    if (speciality) {
      setFilterArt(artists.filter((art) => art.speciality === speciality));
    } else {
      setFilterArt(artists);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [artists, speciality]);

  return (
    <div className="p-1">
      <p className="text-rose-900">
        Browse throught the artists speciality
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-rose-800 text-rose-100" : ""}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >Filters</button>

        <div className={`flex flex-col gap-4 text-sm ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-rose-800 rounded transition-all cursor-pointer ${speciality === "Hair stylist" ? "bg-rose-200" : ""}`}
            onClick={() =>
              speciality === "Hair stylist"
                ? navigate("/artists")
                : navigate("/artists/Hair stylist")
            }
          >
            Hair stylist
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-rose-800 rounded transition-all cursor-pointer ${speciality === "Makeup artist" ? "bg-rose-200" : ""}`}
            onClick={() =>
              speciality === "Makeup artist"
                ? navigate("/artists")
                : navigate("/artists/Makeup artist")
            }
          >
            Makeup artist
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-rose-800 rounded transition-all cursor-pointer ${speciality === "Masage Therapist" ? "bg-rose-200" : ""}`}
            onClick={() =>
              speciality === "Masage Therapist"
                ? navigate("/artists")
                : navigate("/artists/Masage Therapist")
            }
          >
            Masage Therapist
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-rose-800 rounded transition-all cursor-pointer ${speciality === "Nail artist" ? "bg-rose-200" : ""}`}
            onClick={() =>
              speciality === "Nail artist"
                ? navigate("/artists")
                : navigate("/artists/Nail artist")
            }
          >
            Nail artist
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 gap-y-6 p-2">
          {filterArt.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-rose-800 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 cursor-pointer bg-rose-100 mt-1"
              key={index}
            >
              <img
                className="object-cover w-full  h-56 gap-4"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                 <div className={`flex items-center ${item.available ? 'text-green-500' : 'text-rose-800'} gap-2 text-sm text-center`}>
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-rose-800'} rounded-full`}></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
                <p className="px-5 font-medium text-lg">{item.name}</p>
                <p className="px-5 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllArtist;
