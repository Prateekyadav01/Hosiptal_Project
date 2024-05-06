import { User } from '../models/user.model.js';
import { Doctor } from '../models/doctor.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';



export const userSignup = async (req, res) => {
const {role} = req.body;
console.log(role);

   if(role==='patient'){
    const { name, email, password, aadharNumber, phoneNumber, address } = req.body;
    if (
        [name, email, password, aadharNumber, phoneNumber, address].some((field) => typeof field === 'string' && field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne(
        {
            $or: [
                { email },
                { aadharNumber }
            ]
        }
    )


    if(existingUser){
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        aadharNumber,
        phoneNumber,
        address
    })

    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "User not created something went wrong while creating")
    }

    return res.status(200).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )
   }
   else if(role==='doctor'){
    const{name,email,password,phoneNumber,address,application}= req.body;
    if([name,email,password,phoneNumber,role,application].some((field)=>typeof field === 'string' && field.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }
    const existingDoctor = await Doctor.findOne(
        {
            $or:[
                {email},
                
            ]
        }
    )

    if(existingDoctor){
        throw new ApiError(400,"Doctor already exists")
    }

    const doctor = await Doctor.create({
        name,
        email,
        password,
        phoneNumber,
        application,
        role,
        address : address || "",
    })

    const createdDoctor = await Doctor.findById(doctor._id).select(
        "-password"
    )

    if(!createdDoctor){
        throw new ApiError(500,"Doctor not created something went wrong while creating")
    }

    return res.status(200).json(
        new ApiResponse(200,createdDoctor,"doctor registered successfully")
    )
   }
}

