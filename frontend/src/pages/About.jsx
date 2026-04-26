import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
     
      <div className="text-center text-2xl pt-10 ">
         <p>
        ABOUT <span className="text-rose-900 font-medium">US</span>
      </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full max-w-[360px] pl-3 rounded-2xl" src={assets.about_image} alt="" />

        <div className="flex flex-col gap-6 justify-center md:w-2/4 text-sm px-3">
          <p>
            Welcome to your trusted partner in managing your beauty and skincare
            needs conveniently and efficiently.Here we understand the challenges
            individuals face when it comes to booking beauty appointments and
            maintaining their skincare and makeup routines.
          </p>
          <p>
            Beauty hub is committed to excellence in beauty technology. We
            continuously strive to enhance our platform, integrating the latest
            trends and techniques to improve user experience and deliver
            superior service. Whether you’re booking your first appointment or
            managing your regular beauty care, Prescripto is here to support you
            every step of the way.
          </p>
          <b className="text-rose-800">Our Vision</b>
          <p>
            Our vision at Beauty hub is to create a seamless beauty experience
            for every user. We aim to bridge the gap between clients and
            professional artists, making it easier for you to access the
            skincare and makeup services you need, whenever you need them.
          </p>
        </div>
      </div>

      <div>
        <div className="text-center text-2xl ">
          <p>WHY <span className="text-rose-800 font-semibold">CHOOSE US</span></p>
        </div>

        <div className="flex md:flex-row flex-col mt-10 p-3 text-center gap-2">
          <div className="border border-rose-800 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-rose-100 cursor-pointer transition-all duration-600 hover:scale-105">
            <b>Efficiency:</b>
            <p>Stremlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="border border-rose-800 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-rose-100 cursor-pointer transition-all duration-600 hover:scale-105">
            <b>Convenience:</b>
            <p>Access to a network of trusted artists professionals in your area.</p>
          </div>
          <div className="border border-rose-800 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-rose-100 cursor-pointer transition-all duration-600 hover:scale-105">
            <b>Personlization:</b>
            <p>Tailored recommmendation and reminders to help you stay on top of your skin.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
