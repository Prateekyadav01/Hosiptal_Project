import mongoose from 'mongoose';


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
            required: true,
            lowercase: true,
            trim: true,
        },
        role:{
            enum:[]
        }
        // },
        // hospital_id :{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Hospital',
        //     required: true,
        // }
    }
)

export const Doctor = mongoose.model('Doctor',doctorSchema);