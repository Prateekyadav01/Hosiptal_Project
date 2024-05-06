import mongoose from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        refreshToken: {
            type: String
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        address: {
            type: String,
        
            lowercase: true,
            trim: true,
        },
        application:{
            type:Number
        },
        role:{
            type:String,
        },
        refreshToken: {
            type: String
        }
        // },
        // hospital_id :{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Hospital',
        //     required: true,
        // }
    }
)


doctorSchema.pre('save', async function(req,res,next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
})

doctorSchema.methods.isPasswordDoctorConfirm = async function(password){
    return await bcrypt.compare(password,this.password)
}

doctorSchema.methods.GenerateAccessToken = function(){
    jwt.sign(
        {
            _id:this._id,
            name:this.name,
            email:this.email,
            phoneNumber:this.phoneNumber,
        },
         process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

doctorSchema.methods.GenerateRefreshToken = function(){
    jwt.sign(
        {
            _id:this._id,
        },
         process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}


export const Doctor = mongoose.model('Doctor',doctorSchema);