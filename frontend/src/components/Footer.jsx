import React from "react";
import { assets } from "../assets/assets.js";

const Footer = () => {
  return (
    
    <div className="md:mx-10 p-2">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left side */}
        <div>
          <img
            className="w-15 rounded-full"
            src={assets.logo}
            alt=""
          />
          <p className="w-full md:w-2/3 leading-6 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
            maxime nobis asperiores illum provident porro, nisi error quasi
            ducimus consectetur!
          </p>
        </div>

        {/* center side */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 ">
            <p>Home</p>
            <p>About us</p>
            <p>Contact us</p>
            <p>Privacy Policy</p>
          </ul>
        </div>

        {/* right side */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2">
            <li className="text-sm">+1-123-456-7890</li>
            <li className="text-sm">beauty@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* copyright text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2026@ Beauty - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
