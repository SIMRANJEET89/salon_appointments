import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const AllAppointment = () => {
  const { appointments, aToken, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-2-6xl m-5">
      <p classNamemb="mb-3 text-lg font-medium">All appointments</p>

      <div className="bg-rose-100 border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>customer</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Artist</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b hover-bg-rose-100"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
              <img
                className="w-10 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img
                className="w-10 rounded-full"
                src={item.artData.image}
                alt=""
              />{" "}
              <p>{item.artData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-xs text-rose-800 font-medium">Cancelled</p>
            ) : item.isCompleted ? <p className="text-xs text-green-500 font-medium">Completed</p> : (
              <img
                onClick={() => cancelAppointment(item._id)}
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
