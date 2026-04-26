import express from 'express'
import { appointmentsArtist, artistDashboard, artistList, artistProfile, cancelAppointment, completeAppointment,loginArtist, updateArtistProfile } from '../controllers/artistController.js'
import authArtist from '../middlewares/authArtist.js'


const artistRouter = express.Router()

artistRouter.get('/list', artistList)
artistRouter.post('/login', loginArtist)
artistRouter.get('/appointments', authArtist, appointmentsArtist)
artistRouter.post('/complete-appointment', authArtist, completeAppointment)
artistRouter.post('/cancel-appointment', authArtist, cancelAppointment)
artistRouter.get('/dashboard', authArtist, artistDashboard)
artistRouter.get('/profile', authArtist, artistProfile)
artistRouter.post('/update-profile', authArtist, updateArtistProfile)

export default artistRouter


