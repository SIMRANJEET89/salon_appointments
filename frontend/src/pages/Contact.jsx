import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10">
        <p>
          CONTACT <span className="text-red-800 font-semibold">US</span>
        </p>
      </div>
      <div className="flex md:flex-row flex-col justify-center my-10 gap-10 mb-2 text-sm ml-2">
        <img className="w-full max-w-[360px] p-1" src={assets.contact_image} alt="" />

        <div className="flex flex-col justify-center items-start gap-6 ml-3">
          <p className='font-semibold text-lg text-rose-800'>Our OFFICE</p>
          <p>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p>
            Tel: +1-123-456-7890 <br />
            beauty@gmail.com
          </p>
          <p className="font-semibold text-lg text-rose-800">Careers at BeautyHub</p>
          <p className='text-rose-800'>Learn more about our teams and job openings.</p>
          <button className="border border-rose-800 px-8 py-4 text-sm hover:bg-rose-800 hover:text-rose-100 transition-all cursor-pointer">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
