import artistModel from '../models/artistsModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'


const changeAvailability = async (req, res) => {

    try {
        
        const {artId} = req.body

        const artData = await artistModel.findById(artId)

       await artistModel.findByIdAndUpdate(artId, {avilable: !artData.avilable})
        res.json({success: true, message: "Avilability Change"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message:error})
    }
}


const artistList = async (req,res) => {
    try {
        const artists = await artistModel.find({}).select(['-password', '-email'])
        res.json({success:true, artists})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error})
        
    }
}

// api for artist login

const loginArtist = async (req,res) => {
    try {

        const {email, password} = req.body
        const artist = await artistModel.findOne({email})

        if (!artist) {
            return res.json({success:false, message: 'Invalid credentials'})
            
        }

        const isMatch = await bcrypt.compare(password, artist.password)

        if (isMatch) {
          
            const token = jwt.sign({id:artist._id}, process.env.JWT_SECRET)

            res.json({success:true, token})
            
        }else{
            res.json({success:false, message: 'Invalid credentials'})
        }
        
    } catch (error) {
        onsole.log(error);
        res.json({success: false, message:error})
        
        
    }
}

// api to get artist appointments for artist pannel

const appointmentsArtist = async(req,res) => {
    try {
        const artId = req.artId
        console.log(artId);
        
        const appointments = await appointmentModel.find({artId})
       
        res.json({success:true, appointments})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error})
        
        
    }
}

// api to mark appointmemt complete for artist pannel

const completeAppointment = async (req,res) => {

    try {

        const {appointmentId} = req.body
        const artId = req.artId

        const appointmemtData = await appointmentModel.findById(appointmentId)

        if (appointmemtData && appointmemtData.artId === artId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})

            return res.json({success: true, message: 'Appointment Completed'})
            
        }else{
            return res.json({success:false, message:'Mark Faild'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error})
        
    }
}

const cancelAppointment = async (req,res) => {

    try {

        const {appointmentId} = req.body
        const artId = req.artId

        const appointmemtData = await appointmentModel.findById(appointmentId)

        if (appointmemtData && appointmemtData.artId === artId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

            return res.json({success: true, message: 'Appointment Cancelled'})
            
        }else{
            return res.json({success:false, message:'Cancellation Faild'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error})
        
    }
}

// api to get dashdata for artist pannel

const artistDashboard = async ( req, res ) => {

    try {

        const artId = req.artId

        const appointments = await appointmentModel.find({artId})

        let earnings = 0

        appointments.map((item) => {
        if (item.isCompleted || item.payment) {
            earnings += item.amount
            
        }
        })

        let customer = []

        appointments.map((item)=>{
            if (!customer.includes(item.userId)) {
                customer.push(item.userId)
                
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            customer: customer.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true, dashData})
        
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error})
        
    }
}

// api to get artist profile for artist

const artistProfile = async (req,res) => {

    try {

        const artId = req.artId;
        const profileData = await artistModel.findById(artId).select('-password')

        res.json({success: true, profileData})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error})
        
    }
}

// api to update artistProfile for artist panel

const updateArtistProfile = async (req,res)=>{
    try {

        const {fees, address, available} = req.body
        const artId = req.artId

        await artistModel.findByIdAndUpdate(artId, {fees, address, available})

        res.json({success: true, message: 'Profile Updated'})
        
    } catch (error) {
         console.log(error);
        res.json({success: false, message:error})
        
    }
}
 
export {changeAvailability, artistList, loginArtist, appointmentsArtist, completeAppointment, cancelAppointment, artistDashboard, artistProfile, updateArtistProfile}