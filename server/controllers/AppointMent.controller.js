import { ApiError } from "../utils/ApiError.js";
import { Appoint } from "../models/appointment.model.js";



export const appointDetails = async(req,res)=>{
    try {
        const {department ,patientName,date,time} = req.body;
    
        if([department,patientName,date,time].some((field)=>field.trim()==='')){
            throw new ApiError(400,"Please fill all the fields");
        }
    
        const exisitingAppointment = await Appoint.findOne({
            $or:[{date, time}],
        })
        
        if(exisitingAppointment){
            throw new ApiError(400,"Appointment not available at this slot");
        }
    
        const newAppointment = await Appoint.create({
            department,
            patientName,
            date,
            time,
        })
        res.status(201).json({
            success:true,
            data:newAppointment,
        })
        
    } catch (error) {
        console.log("appointment error :in try block",error);
    }
}