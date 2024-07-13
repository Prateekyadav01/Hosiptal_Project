import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import otpGenrator from "otp-generator";
import { OTP } from "../models/otp.model.js";

const generateTokens = async (user, isDoctor = false) => {
  try {
    const accessToken = user.GenerateAccessToken();
    const refreshToken = user.GenerateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const validateFields = (fields) => {
  return fields.some(
    (field) => typeof field === "string" && field.trim() === ""
  );
};

const generateOtp = async (email) => {
  const otp = otpGenrator.generate(6);
  const createOtp = await OTP.create({ otp, email });
  if (!createOtp) {
    throw new ApiError(500, "Something went wrong while creating OTP");
  }
  return otp;
};

export const userSignup = async (req, res) => {
  const {
    role,
    name,
    email,
    password,
    aadharNumber,
    phoneNumber,
    address,
    application,
  } = req.body;

  if (validateFields([name, email, password, phoneNumber, address])) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  try {
    if (role === "patient") {
      const existingUser = await User.findOne({
        $or: [{ email }, { aadharNumber }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "User already exists"));
      }

      const user = await User.create({
        name,
        email,
        password,
        aadharNumber,
        phoneNumber,
        address,
      });
      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );

      if (!createdUser) {
        return res
          .status(500)
          .json(
            new ApiResponse(
              500,
              null,
              "User not created something went wrong while creating"
            )
          );
      }

      await generateOtp(email);
      return res
        .status(200)
        .json(
          new ApiResponse(200, createdUser, "User registered successfully")
        );
    } else if (role === "doctor") {
      const existingDoctor = await Doctor.findOne({ email });
      if (existingDoctor) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Doctor already exists"));
      }

      const doctor = await Doctor.create({
        name,
        email,
        password,
        phoneNumber,
        address,
        application,
      });
      const createdDoctor = await Doctor.findById(doctor._id).select(
        "-password"
      );

      if (!createdDoctor) {
        return res
          .status(500)
          .json(
            new ApiResponse(
              500,
              null,
              "Doctor not created something went wrong while creating"
            )
          );
      }

      await generateOtp(email);
      return res
        .status(200)
        .json(
          new ApiResponse(200, createdDoctor, "Doctor registered successfully")
        );
    }
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiResponse(error.status || 500, null, error.message));
  }
};

export const loginUser = async (req, res) => {
  const { role, email, password } = req.body;

  if (validateFields([email, password])) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Please fill all the fields"));
  }

  try {
    if (role === "patient") {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Please first signup"));

      const passwordCheck = await user.isPasswordConfirm(password);
      if (!passwordCheck)
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Invalid password"));

      const { accessToken, refreshToken } = await generateTokens(user);
      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );

      return res
        .status(200)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
        .json(
          new ApiResponse(
            200,
            { user: loggedInUser, accessToken, refreshToken },
            "Patient logged in successfully"
          )
        );
    } else if (role === "doctor") {
      const doctor = await Doctor.findOne({ email });
      if (!doctor)
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Please first signup"));

      const passwordCheck = await doctor.isPasswordDoctorConfirm(password);
      if (!passwordCheck)
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Invalid password"));

      const { accessToken, refreshToken } = await generateTokens(doctor, true);
      const loggedInDoctor = await Doctor.findById(doctor._id).select(
        "-password -refreshToken"
      );

      return res
        .status(200)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
        .json(
          new ApiResponse(
            200,
            { user: loggedInDoctor, accessToken, refreshToken },
            "Doctor logged in successfully"
          )
        );
    }
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiResponse(error.status || 500, null, error.message));
  }
};
