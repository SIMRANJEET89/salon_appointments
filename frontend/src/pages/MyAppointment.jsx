import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { backendUrl, token, getArtistData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const navigate = useNavigate();

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      console.log(data);

      if (data.success) {
        setAppointments(data.appointment.reverse());
        console.log(appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      reciept: order.reciept,
      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } },
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointment");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  // payment

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
      getArtistData();
    }
  }, [token]);

  const cancleAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-[90%] m-10">
      <p className="font-medium pb-3 mt-12 border-b">My Appointment</p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img className="w-32 h-36" src={item.artData.image} alt="" />
            </div>
            <div className="flex-1 text-sm ">
              <p className="font-semibold">{item.artData.name}</p>
              <p>{item.speciality}</p>
              <p className="font-medium mt-1">Address:</p>
              <p className="text-xs">{item.artData.address.line1}</p>
              <p className="text-xs">{item.artData.address.line2}</p>
              <p className="text-xs mt-1">
                Date & Time:{" "}
                <span className="text-sm font-medium">
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </span>
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted &&(
                <button className="sm:min-w-48 py-2 border border-rose-800 text-rose-800">
                  Paid
                </button>
              )}

              {!item.cancelled && !item.payment && !item.isCompleted &&(
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="text-sm text-stone-500 text-center sm:m-w-48 py-2 border border-rose-800 hover:bg-green-300 hover:text-black transition-all duration-300 cursor-pointer"
                >
                  Pay Online{" "}
                </button>
              )}

              {!item.cancelled && !item.isCompleted &&(
                <button
                  onClick={() => cancleAppointments(item._id)}
                  className="text-sm text-stone-500 text-center sm:m-w-48 p-3 border border-rose-800 hover:bg-rose-800 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Cancel appointment
                </button>
              )}
              {!item.cancelled && !item.isCompleted &&(
                <button className="border border-rose-800 text-rose-800 sm:min-w-48 py-2">
                  Appointment Cancelled
                </button>
              )}

              {item.cancelled && !item.isCompleted &&(
                <button className="sm-min-w-48 p-3 border border-rose-800 text-rose-800">
                  Appointment Cancelled
                </button>
              )}
              {
                item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 text-green-500 rounded">Completed</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
