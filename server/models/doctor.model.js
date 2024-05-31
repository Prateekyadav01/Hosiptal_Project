import mongoose from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
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
        // },
        // hospital_id :{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Hospital',
        //     required: true,
        // }
    },{
        timestamps:true
    }
)


doctorSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();
    console.log("------------->DOctor")
    this.password = await bcrypt.hash(this.password,10)
     next();
})

doctorSchema.methods.isPasswordDoctorConfirm = async function(password){
    return await bcrypt.compare(password,this.password)
}

doctorSchema.methods.GenerateAccessToken = function(){
   return jwt.sign(
        {
            _id:this._id,
            name:this.name,
            email:this.email,
        },
         process.env.ACCESS_TOKEN_SECRET_DOC,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY_DOC,
        }
    )
}

doctorSchema.methods.GenerateRefreshToken = function(){
  return jwt.sign(
        {
            _id:this._id,
            name:this.name,
            email:this.email
        },
         process.env.REFRESH_TOKEN_SECRET_DOC,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DOC,
        }
    )
}


export const Doctor = mongoose.model('Doctor',doctorSchema);