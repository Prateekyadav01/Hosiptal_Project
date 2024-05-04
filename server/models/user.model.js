import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
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
        aadharNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        }
    }, {
        timestamps:true,
    })


 export const User = mongoose.model('User',userSchema);