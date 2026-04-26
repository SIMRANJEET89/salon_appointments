import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary bg-rose-900 rounded-lg px-6 md:px-0 lg:px-20">
      {/* left side */}
      <div
        className="flex flex-col
      md:w-1/2 items-start justify-center gap-4 py-10  m-auto md:py-[10vw] md:mb-[-30px]"
      >
        <p className="text-3xl md:text-4xl lg:text-5xl text-white p-10 font-semibold leading-tight md:leading-tight lg:leading-tight  ">
          Book Appointment <br />
          With Trusted Artists.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3  text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted artists, <br />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          className="bg-rose-100 text-rose-800 flex items-center gap-2 px-8 py-3 rounded-full text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          href="#speciality"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* right side */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full rounded-3xl bottom-0 h-auto p-2  md:p-3 object-cover"
          src={assets.header_img}
          alt=""
        />
      </div>

    </div>
  );
};

export default Header;
