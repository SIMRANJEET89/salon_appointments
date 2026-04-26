import React, { useContext, useEffect } from "react";
import { ArtistContext } from "../../context/ArtistContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const ArtistDashboard = () => {
  const {
    artistToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(ArtistContext);

  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (artistToken) {
      getDashData();
    }
  }, [artistToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className=" flex items-center gap-3 p-4 min-w-52 rounded border-2 border-rose-50 cursor-pointer hover:scale-105 transition-all bg-rose-100">
            <img className="w-14" src={assets.earning_icon} alt="" />

            <div>
              <p className="font-semibold text-xl text-gray-600">
               {currency} {dashData.earnings}
              </p>
              <p className="font-semibold text-rose-800">Earnings</p>
            </div>
          </div>

          <div className=" flex items-center gap-3 p-4 min-w-52 rounded border-2 border-rose-50 cursor-pointer hover:scale-105 transition-all bg-rose-100">
            <img className="w-14" src={assets.appointments_icon} alt="" />

            <div>
              <p className="font-semibold text-xl text-gray-600">
                {dashData.appointments}
              </p>
              <p className="font-semibold text-rose-800">Appointments</p>
            </div>
          </div>

          <div className=" flex items-center gap-3 p-4 min-w-52 rounded border-2 border-rose-50 cursor-pointer hover:scale-105 transition-all bg-rose-100">
            <img className="w-14" src={assets.customer_icon} alt="" />

            <div>
              <p className="font-semibold text-xl text-gray-600">
                {dashData.customer}
              </p>
              <p className="font-semibold text-rose-800">Customer</p>
            </div>
          </div>
        </div>

        {/* jjj */}
        <div className="my-5 bg-rose-100">
          <div className="flex flex-wrap  gap-2.5 border border-rose-800 px-4 py-4 rounded">
            <img className="w-6" src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-rose-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-rose-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-800">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-xs font-medium text-rose-700">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-xs font-medium text-green-500">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ArtistDashboard;
