import { Doctor } from "../models/doctor.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import otpGenrator from 'otp-generator'
import { OTP } from '../models/otp.model.js';

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log(user);
    const accessToken = user.GenerateAccessToken();
    const refreshToken = user.GenerateRefreshToken();
    console.log(accessToken,refreshToken);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false })

    console.log(refreshToken,accessToken)
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};


const generateAccessAndRefreshTokensDoctor = async (docId) => {
    try {
      const user = await Doctor.findById(docId);
      // console.log(user);
      const accessToken = user.GenerateAccessToken();
      const refreshToken = user.GenerateRefreshToken();
      console.log("acess"+accessToken + "helllooo" +refreshToken);
      user.refreshToken = refreshToken;
      console.log(user);
      await user.save({ validateBeforeSave: false })
      console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new ApiError(
        500,
        "Something went wrong while generating referesh and access token"
      );

    }
  };



export const userSignup = async (req, res) => {
  const { role } = req.body;
  console.log(role);

  if (role === "patient") {
    const { name, email, password, aadharNumber, phoneNumber, address } =
      req.body;
    if (
      [name, email, password, aadharNumber, phoneNumber, address].some(
        (field) => typeof field === "string" && field.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
     
    console.log("path is verified--------")
    const existingUser = await User.findOne({
      $or: [{ email }, { aadharNumber }],
    });

    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      aadharNumber,
      phoneNumber,
      address,
      role
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "User not created something went wrong while creating"
      );
    }
    const otp = otpGenrator.generate(6);
        console.log(otp);
        const createOtp= await OTP.create({
            otp,
            email
        })
        console.log("otp_",otp);

        if(!createOtp){
          throw new ApiError(500,"Something went wrong while creating OTP")
        }

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "user registered successfully"));
  } else if (role === "doctor") {
    const { name, email, password, phoneNumber, address, application } =
      req.body;
    if (
      [name, email, password, phoneNumber, role, application].some(
        (field) => typeof field === "string" && field.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const existingDoctor = await Doctor.findOne({
      $or: [{ email }],
    });

    if (existingDoctor) {
      throw new ApiError(400, "Doctor already exists");
    }

    const doctor = await Doctor.create({
      name,
      email,
      password,
      phoneNumber,
      application,
      role,
      address: address || "",
    });

    const createdDoctor = await Doctor.findById(doctor._id).select("-password");

    if (!createdDoctor) {
      throw new ApiError(
        500,
        "Doctor not created something went wrong while creating"
      );
    }
    const otp = otpGenrator.generate(6);
    console.log(otp);
    const createOtp= await OTP.create({
        otp,
        email
    })
    console.log(otp);
    if(!createOtp){
      throw new ApiError(500,"Something went wrong while creating OTP")
    }
    if(!createOtp){
      throw new ApiError(500,"Something went wrong while creating OTP")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, createdDoctor, "doctor registered successfully")
      );
  }
}

  export const loginUser = async (req, res) => {
    const { role } = req.body;
    if (role === "patient") {
      const { email, password } = req.body;
  
      if ([email, password].some((field) => field.trim() == "")) {
        throw new ApiError(400, "Please fill all the fields");
      }
  
      const user = await User.findOne({ email });
      if (!user) throw new ApiError(400, "Please first signup");
  
      const paswordCheck = await user.isPasswordConfirm(password);
      if (!paswordCheck) throw new ApiError(400, "Invalid password");
      // console.log("User id is" + user._id);
      const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
        user._id
      );
  
      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );
  
      const options = {
        sameSite: 'none',
        secure: true,
        path: '/',
      };
  
      console.log(accessToken,refreshToken)
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              user: loggedInUser,
              accessToken,
              refreshToken,
            },
            "Patient logged In Successfully"
          )
        );
    } else if (role === "doctor") {
      const { email, password } = req.body;
      console.log("getting the email");
      if ([email, password].some((field) => field.trim() == "")) {
        throw new ApiError(400, "Please fill all the fields");
      }
      const doctor = await Doctor.findOne({ email });
      if (!doctor) throw new ApiError(400, "Please first signup");
  
  
      const paswordCheck = await doctor.isPasswordDoctorConfirm(password);
      if (!paswordCheck) throw new ApiError(400, "Invalid password");
  
      console.log(doctor._id);
      const { accessToken, refreshToken } = await generateAccessAndRefreshTokensDoctor(
        doctor._id
      );
      const loggedInDoctor = await Doctor.findById(doctor._id).select(
        "-password -refreshToken"
      );
      const options = {
        httpOnly: true,
        secure: true,
      };
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              user: loggedInDoctor,
              accessToken,
              refreshToken,
            },
            "Doctor logged In Successfully"
          )
        );
    }
  }