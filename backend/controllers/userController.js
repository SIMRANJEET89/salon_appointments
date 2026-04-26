import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import artistModel from '../models/artistsModel.js'
import { v2 as cloudinary} from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'



// api to register user
const registerUser = async (req,res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({success:false, message: 'Missing Details'})            
        }

        // validating email formet

        if (!validator.isEmail(email)) {
            return res.json({success:false, message: 'Enter a valid email'})            
            
        }
        // validating password
        if(password.length < 8){
            return res.json({success:false, message: 'Enter a strong password'})            
        }

        // hashed password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)



        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()


        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true, token})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

const loginUser = async (req,res) => {

    try {

        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
            
        }else{
            res.json({success:false, message:'Invalid credantials'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

const getProfile = async(req, res) => {

    try {

        const userId = req.userId

        const userData = await userModel.findById(userId).select('-password')

        res.json({success: true, userData})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}


const updateProfile = async (req,res) => {

    try {
        
        const userId = req.userId
        const { name, phone, dob, address, gender} = req.body

        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({success: false, message: 'Data Missing'})

        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender})

        if (imageFile) {

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})

            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image:imageURL})
            
        }

        res.json({success:true, message: 'Profile Updated'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }



}


const bookAppointment = async(req, res) => {

    try {

        const { artId, slotDate, slotTime} = req.body
        const userId = req.userId

        console.log("userId:", userId)

        const artData = await artistModel.findById(artId).select('-password')

        if (!artData.available) {
            return res.json({success: false, message: 'Artist not available'})
            
        }

        let slots_booked = artData.slots_booked

        // checking for slots availablity

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success: false, message: 'Slot not available'})
                
            }else{
            slots_booked[slotDate].push(slotTime)
        }
           
            
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

    
        const userData = await userModel.findById(userId).select('-password')
        console.log('userData:', userData);
        
        

        delete artData.slots_booked


        const appointmentData = {
            userId,
            artId,
            slotDate,
            slotTime,
            userData,
            artData,     
            amount:artData.fees,
            date: Date.now()

        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots in artData

        await artistModel.findByIdAndUpdate(artId, {slots_booked})

        res.json({success:true, message: 'Appointment Booked'})


        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
        
    }
}

// api to get user appointments for frontend my appointment page

const listAppointments = async (req, res) =>{

    try {

        const userId = req.userId
        const appointment = await appointmentModel.find({userId})

        res.json({success: true, appointment})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

// api to cancel the appointment

const cancelAppointment = async(req, res) => {
    try {

        const {appointmentId} = req.body
        const userId = req.userId

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData.userId !== userId) {
           return res.json({success:false, message: 'Unauthorized action'})
            
        }

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


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// online payment using razorpay

const paymentRazorpay = async (req,res) => {

    try {

        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)


        if (!appointmentData || appointmentData.cancelled) {
            return res.json({success:false, message: 'Appointment Cancelled or not found'})
            
        }

        // creating options for razorpay

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order

        const order = await razorpayInstance.orders.create(options)

        res.json({success: true, order})


        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

// api to verify payment of razorpay

const verifyRazorpay = async (req,res)=> {
    try {

        const {razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo);
        
        if (orderInfo.status === 'paid') {
           await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            res.json({success:true, message: 'Payment Successful'})
        }else{
              res.json({success:false, message: 'Payment Failed'})

        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
        
    }
}



export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment, paymentRazorpay, verifyRazorpay}