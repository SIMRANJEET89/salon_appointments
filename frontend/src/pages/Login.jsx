import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {

  const [state, setState] = useState("signup");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()



  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'signup') {
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, email, password})

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          
        }else {
          toast.error(data.message)
        }
        
      }else{
         const {data} = await axios.post(backendUrl + '/api/user/login', {name, email, password})

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          
        }else {
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }

  };

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-3 m-auto border border-rose-800 items-start p-8 min-w-[340px] sm:min-w-96 text-sm shadow-lg rounded-xl">
        <p className='text-2xl font-semibold'>
          {state === "Sign up" ? "Create Account" : "Login"}</p>
        <p>
          Please {state === "signup" ? "Sign up" : "Log in"} to book
          appointment
        </p>
        {state === "signup" && (
          <div className="w-full">
            <p>Full Name</p>
            <input 
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
          className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
          className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text"
            required
          />
        </div>
        <button className="w-full bg-rose-800 py-2 text-rose-100 rounded-md text-base cursor-pointer">{state === "signup" ? "Create account" : "Login"}</button>
        {state === "signup" ? (
          <p>
            Already have an account ?
            <span className="text-sm text-rose-800 underline" onClick={() => setState('login')}>Login here</span>
          </p>
        ) : (
          <p>
            Create new account?
            <span className="text-sm text-rose-800 underline" onClick={() => setState('signup')}>
              Click here</span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
