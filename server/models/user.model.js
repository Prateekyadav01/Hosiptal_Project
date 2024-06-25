import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            // lowercase: true,
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
            required: [true, "password is required"],
        },
        refreshToken: {
            type: String,
        },
        aadharNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            
        },
        address: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        role:{
            type:String,
        }
        // role:{
        //     type:mongoose.Schema.Types._id,
        //     ref:"Doctor",
        //     enum:[ "doctor" , "Patient"]
        // }
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    console.log("------------------------>Password hash")
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordConfirm = async function (password) {
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.GenerateAccessToken = function(){
    console.log("accesssToken--------->access")
   return jwt.sign(
        {
            _id:this._id,
            name:this.name,
            email:this.email,
        },
         process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.GenerateRefreshToken = function(){
    console.log("refreshToken ---------------refresh")
   return jwt.sign(
        {
            _id:this._id,
        },
         process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema);
