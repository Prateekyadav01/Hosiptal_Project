import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async (userId) => {
//   try {
    const user = await User.findById(userId);
    console.log(user);
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(
//       500,
//       "Something went wrong while generating referesh and access token"
//     );
//   }
};
const generateAccessAndRefereshTokensDoctor = async (userId) => {
    try {
      const user = await Doctor.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
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

    const doctor = await existingDoctor.create({
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

    return res
      .status(200)
      .json(
        new ApiResponse(200, createdDoctor, "doctor registered successfully")
      );
  }
};

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


    const paswordCheck = await Doctor.isPasswordDoctorConfirm(password);
    if (!paswordCheck) throw new ApiError(400, "Invalid password");
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokensDoctor(
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
};
