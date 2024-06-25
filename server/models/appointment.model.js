import mongoose from "mongoose"


const appointSchema = new mongoose.Schema({
    department:{
        type:String,
        required:true
    },
    patientName:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


export const Appoint = mongoose.model('AppointMent', appointSchema);