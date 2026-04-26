import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  const {token, setToken, userData} = useContext(AppContext)


  const logout = () => {
    setToken('false')
    localStorage.removeItem('token')
    setShowMenu(false)
  }


  return (
    
      <div className="w-full">
        <div className="bg-rose-100 text-rose-800 flex items-center text-sm mb-5 border-b border-b-gray-400 justify-between py-4">
          <img
            onClick={() => navigate("/")}
            className="w-15 rounded-full"
            src={assets.logo}
            alt=""
          />

          <ul className="hidden font-medium md:flex gap-4 items-start">
            <NavLink to="/">
              <li className="py-1">HOME</li>
              <hr className="border-none outline-none h-0.5 bg-rose-900 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/artists">
              <li className="py-1">ALL ARTIST</li>
              <hr className="border-none outline-none h-0.5 bg-rose-900 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/about">
              <li className="py-1">ABOUT</li>
              <hr className="border-none outline-none h-0.5 bg-rose-900 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/contact">
              <li className="py-1">CONTACT</li>
              <hr className="border-none outline-none h-0.5 bg-rose-900 w-3/5 m-auto hidden" />
            </NavLink>
          </ul>

          <div className="flex items-center gap-4">
            {token && userData ? (
              <div
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
                setMobileMenu(false)
              }} className="flex items-center gap-2 cursor-pointer group relative">
                <img
                  className="w-10 rounded-full"
                  src={userData.image}
                  alt=""
                />
                <img
                  className="w-2.5 invert brightness-0"
                  src={assets.dropdown_icon}
                  alt=""
                />

{showMenu && 
                <div className="absolute ring-0 right-0 top-0 text-base mt-1 font-medium z-20 hidden pt-14 group-hover:block bg-rose-100 ">
                  <div className="min-w-38 bg-rose-100 rounded flex flex-col text-rose-800 gap-4 p-4">
                    <p className='hover:text-rose-300' onClick={() => navigate("/my-profile")}>My Profile</p>
                    <p className='hover:text-rose-300' onClick={() => navigate("/my-appointment")}>
                      My Appointment
                    </p>
                    <p className='hover:text-rose-300' onClick={logout}>Logout</p>
                  </div>
                </div>
                }
              </div>
            ) : (
              <button type="submit"
                onClick={() => navigate("/login")}
                className="bg-rose-800 rounded-full px-8 py-2 font-light hidden md:block text-rose-100"
              >
                Create account
              </button>
            )}
            <img onClick={(e)=>{
              e.stopPropagation()
              setShowMenu(false)
              setMobileMenu(true)
              }} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
            {/* mobile menu */}
            <div className={`${mobileMenu ? 'fixed w-full h-full' : 'h-0 w-0 overflow-hidden'}md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-rose-100 transition-all`}>
              <div className="flex items-center justify-between px-5 py-6">
                <img className="w-16 rounded-full" src={assets.logo} alt="" />
                <img onClick={()=>setMobileMenu(false)} className="w-7" src={assets.cross_icon} alt="" />
              </div>
              <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
                <NavLink onClick={()=>setMobileMenu(false)} to='/'> <p className='px-4 rounded inline-block'>HOME</p></NavLink>
                <NavLink onClick={()=>setMobileMenu(false)} to='/artists'><p className='px-4 rounded inline-block'>ALL ARTISTS</p></NavLink>
                <NavLink onClick={()=>setMobileMenu(false)} to='/about'><p className='px-4 rounded inline-block'>ABOUT</p></NavLink>
                <NavLink onClick={()=>setMobileMenu(false)} to='/contact'><p className='px-4 rounded inline-block'>CONTACT</p></NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Navbar;
