import express from 'express'
import { addArtist, adminDashboard, adminLogin, allArtists, appointmentCancel, appointmentsAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/artistController.js'


const adminRouter = express.Router()

adminRouter.post('/add-artist',upload.single('image'), addArtist)
adminRouter.post('/login', adminLogin)
adminRouter.post('/all-artist', authAdmin, allArtists)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/appointment-cancel', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)


export default adminRouter