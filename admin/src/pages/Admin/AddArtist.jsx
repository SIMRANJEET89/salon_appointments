import React, {  useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify'
import axios from 'axios'

const AddArtist = () => {


  const [artImg, setArtImg] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [speciality, setSpeciality] = useState("Hair Stylist")
  const [fees, setFees] = useState("")
  const [about, setAbout] = useState("")
  const [experience, setExperience] = useState("1 Year")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")


  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler = async(event) => {
       event.preventDefault()

       try {
       if (!artImg) {
        toast.message('Image Not Selected')
         
       }

       const formData = new FormData()

       formData.append('image', artImg)
       formData.append('name', name)
       formData.append('email', email)
       formData.append('password', password)
       formData.append('speciality', speciality)
       formData.append('fees', Number(fees))
       formData.append('about', about)
       formData.append('experience', experience)
       formData.append('address', JSON.stringify({line1: address1, line2: address2}))


         //  console log formdata
       formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`);
        
       })

       const {data} = await axios.post(backendUrl + '/api/admin/add-artist', formData, {headers: {aToken}})

       if (data.success) {
        toast.success(data.message)
        setArtImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAbout('')
        setFees('')
        setAddress1('')
        setAddress2('')

        
       }else{
        toast.error(data.message)
       }
      }
       catch(error){
         toast.error(error.message)
        console.log(error);
        
       }

   }


  return (
    <form onSubmit={onSubmitHandler} className="mt-5 w-full px-5">
      <p className="mb-3 text-lg font-medium">Add Artist</p>

      <div className="bg-rose-100 px-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-rose-800 ">
          <label htmlFor="art-img">
            <img  className="w-16 bg-gray-100 rounded-full cursor-pointer" src={artImg ? URL.createObjectURL(artImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setArtImg(e.target.files[0])} type="file" id="art-img" hidden />
          <p>
            Upload artist <br />
            picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-700">
          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Artist Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className="border rounded px-3 py-2" type="text" placeholder="Name" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Artist Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border rounded px-3 py-2"  type="email" placeholder="email" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Artist Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border rounded px-3 py-2"  type="text" placeholder="password" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experince</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2" name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className="border rounded px-3 py-2" type="number" placeholder="fees" required />
            </div>

          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2" name="" id="">
                <option value="Hair stylist">Hair stylist</option>
                <option value="Makeup artist">Makeup artist</option>
                <option value="Masage Therapist">Masage Therapist</option>
                <option value="Nail artist">Nail artist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className="border rounded px-3 py-2" type="text" placeholder="address 1" />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className="border rounded px-3 py-2" type="text" placeholder="address 2" />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Artist</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded"
            name=""
            id=""
            placeholder="Write about Artist"
            required
          ></textarea>
        </div>
        <button className="bg-rose-800 text-rose-100 px-10 py-3 mt-4 rounded-full">Add artist</button>
      </div>
    </form>
  );
};

export default AddArtist;
