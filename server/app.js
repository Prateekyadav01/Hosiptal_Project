import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: [process.env.CORS_ORIGIN ,  'http://localhost:5173'],
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())


//routes import
import authRoutes from './routes/auth.routes.js';
import otpRoutes from './routes/otp.routes.js'
import appointRoute from './routes/appoint.routes.js'
import payment from './routes/payment.routes.js'
import profile from './routes/profile.routes.js'
//routes declaration

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auth', otpRoutes);
app.use('/api/v1/appoint',appointRoute);
app.use('/api/v1/payment',payment);
app.use('/api/v1/profile',profile);

// http://localhost:8000/api/v1/users/register

export { app }