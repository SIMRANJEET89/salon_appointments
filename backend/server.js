import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
import artistRouter from './routes/artistRoute.js'

// app config
const app = express()
const port = process.env.PORT || 3000
connectDB()
connectCloudinary()


// middleware
app.use(express.json())
app.use(cors())


// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/artist', artistRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('api working')
})

app.listen(port, ()=> console.log('server started here on port', port)
)