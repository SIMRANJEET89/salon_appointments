import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import artistsModel from "../models/artistsModel.js";
import jwt from 'jsonwebtoken'
import artistModel from "../models/artistsModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// api for adding artis
const addArtist = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      about,
      fees,
      address,
    } = req.body;

    console.log("Address type:", typeof address);
    console.log("Address raw:", address);

    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email formet
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload img to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const artistData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      fees,
      experience,
      about,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newArtist = new artistsModel(artistData);
    await newArtist.save();

    res.json({ success: true, message: "Artist Added" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
            
        }else{
            res.json({success: false, message:'Invalid credentials' })
        }
        
    } catch (error) {
        return res.json({ success: false, message: error.message });
        
    }

}

// api for get all artist list for admin pannel

const allArtists = async (req,res) => {

  try {
    const artists = await artistModel.find({}).select('-password')
     res.json({success:true, artists})
    
  } catch (error) {
    return res.json({ success: false, message: error.message });
    
  }

  
}

// api to get all appointments

const appointmentsAdmin = async(req,res) => {

  try {

    const appointments = await appointmentModel.find({})

    res.json({success:true, appointments})
    
  } catch (error) {
    return res.json({ success: false, message: error.message });
    
    
  }
}

// api for appointment cancellation
const appointmentCancel = async(req, res) => {
    try {

        const {appointmentId} = req.body
       

        const appointmentData = await appointmentModel.findById(appointmentId)


        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

    //    releasing artist slot

    const {artId, slotDate, slotTime} = appointmentData

    const artistData = await artistModel.findById(artId)

    let slots_booked = await artistData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await artistModel.findByIdAndUpdate(artId, {slots_booked})

    res.json({success:true, message: 'Appointment Cancelled'})

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
        
    }
}

// api to get dashdata for admin pannel

const adminDashboard = async (req,res) => {

  try {

    const artist = await artistModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {

      artist: artist.length,
      customer: users.length,
      appointments: appointments.length,
      latestAppointments : appointments.reverse().slice(0,5)
    }

    res.json({success:true, dashData})
    
  } catch (error) {
     console.log(error);
     res.json({success:false, message:error.message})
  
    
  }
}


export { addArtist, adminLogin, allArtists, appointmentsAdmin, appointmentCancel, adminDashboard};
