import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import RelatedArtist from "../components/RelatedArtist";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { artId } = useParams();
  const { artists, currency, backendUrl, token, getArtistData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate()

  const [artInfo, setArtInfo] = useState(null);
  const [artSlots, setArtSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchArtInfo = async () => {
    const artInfo = artists.find((art) => art._id === artId);
    setArtInfo(artInfo);
  };

  const getAvilableSlots = async () => {
    setArtSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // settings end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + '_' + month + '_' + year;
        const slotTime = formattedTime

        const isSlotAvailable = 
            artInfo.slots_booked[slotDate] && 
            artInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
            // add slot to array
            timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
        });
     }
        // increment current time by 30 minuts
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setArtSlots((prev) => [...prev, timeSlots]);
    }
  };

  // book appointment

  const bookAppointment = async() => {

     if (!token) {
      toast.warn('Login for appointment')
      return navigate('/login')
      
    }


    try {
     
    const date = artSlots[slotIndex][0].datetime;

     let day = date.getDate();
     let month = date.getMonth() + 1;
     let year = date.getFullYear();

     const slotDate = day + '_' + month + '_' + year;


     const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{artId, slotDate, slotTime}, {headers:{ token}})

     if (data.success) {
      toast.success(data.message)
      getArtistData()
      navigate('/my-appointment')
     }else{
      toast.error(data.message)
     }

  } catch (error) {
    toast.error(error.message)
     console.log(error);
      
    }
  }
    
  useEffect(() => {
    fetchArtInfo();
  }, [artists, artId]);

useEffect(() => {
  if (artInfo) {
    getAvilableSlots();
  }
  
}, [artInfo]);


  // useEffect(() => {
  //   getAvilableSlots();
  // }, [artInfo]);

  useEffect(() => {
    console.log(artSlots);
  }, [artSlots]);

  return (
    artInfo && (
      <div>
        {/* artist details */}

        <div className="flex flex-col md:flex-row gap-2 p-2">
          <div>
            <img
              className="w-600 p-5 rounded-lg sm:max-w-72 h-90"
              src={artInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-rose-800 w-[90%] rounded-lg p-6 py-7 mx-2 sm:mx-0 mt-[80px] sm:mt-0">
            {/* artist info name experince etc */}
            <p className="flex items-center gap-2 text-2xl font-medium">
              {artInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1">
              <p>{artInfo.speciality}</p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{artInfo.experience}</button>
            </div>

            {/* about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm max-w-[700px] mt-1">{artInfo.about}</p>
            </div>

            <p className="font-medium mt-4">
              Appointment fee: {currency}
              {artInfo.fees}
            </p>
          </div>
        </div>
        {/* slots */}

        <div className="sm:ml-72 sm:pl-2 gap-4 mt-4 font-medium border-rose-900 p-2">
          <p>Booking Slots</p>

          <div className="flex gap-5 mt-4 items-center w-full overflow-y-scroll">
            {artSlots.length &&
              artSlots.map((item, index) => (
                <div onClick={()=> setSlotIndex(index)}
                  className={`border  rounded-full min-w-16 gap-2 py-4 text-center cursor-pointer ${slotIndex === index ? "bg-rose-100" : "border border-rose-900"}`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center mt-4 gap-3 overflow-x-scroll w-[90%]">
            {
              artSlots.length && artSlots[slotIndex].map((item, index)=> (
                <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 border border-rose-900 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-rose-100' : 'border border-rose-800'}`} key={index}>
                  {item.time.toLowerCase()}
                </p>
              ))
            }
          </div>
          <button onClick={bookAppointment} className="border border-rose-900 bg-rose-100 text-rose-900 text-sm font-light  px-14 py-3 rounded-full hover:scale-105 transition-all duration-300 mt-6">Book an appointment</button>
        </div>

        {/* related artist */}
        <div>
          <RelatedArtist artId={artId} speciality={artInfo.speciality}/>
        </div>
      </div>
    )
  );
};

export default Appointment;
