import Organization from "../models/organization.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { subDomain, email, password, confirmPassword, orgName } = req.body;
  console.log("WORKED");
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    console.log("Existing user::::");
    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        error: true,
      });
    }

    //check for existing sub domain, return error if found

    const existingOrgSubDomain = await Organization.findOne({ subDomain });
    console.log("Existing Org Sub domain::::");
    console.log(existingOrgSubDomain);

    if (existingOrgSubDomain) {
      return res.status(400).json({
        message: "Sub domain already taken. Please choose a different one.",
        error: true,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
        error: true,
      });
    }

    //create org
    const organization = await Organization.create({
      subDomain,
      name: orgName,
    });

    console.log(organization);

    // create user

    //hash password

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      organizationId: organization._id.toString(),
      email,
      password: hashedPassword,
    });

    console.log(user);

    //Create JWToken for user so we can sign them in after sign up
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWTSECRET,
      { expiresIn: "12h" }
    );

    return res.json({
      message: "Sign up successful!",
      error: false,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error signing up user",
      error: true,
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  console.log("SIGN IN WORKED");

  try {
    //attempt to find a user in the DB that matches the req.body.email
    const existingUser = await User.findOne({ email });

    //If user not found, return an error message
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User does not exist", error: true });

    //check to see if password provided matches hashed password in DB

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    //logic if password is not correct

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Invalid credentials.", error: true });

    //If user exists, and password is correct, get a JWT to send to front end

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWTSECRET,
      { expiresIn: "12h" }
    );

    //res.status(200).json({ result: existingUser, token });

    return res.status(200).json({
      message: "Sign in successful!",
      error: false,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Error signing user in" });
  }
};

export const resetPassword = async (req, res) => {
  console.log("WORKED");
};

export const setNewPassword = async (req, res) => {
  console.log("WORKED");
};

export const getUser = async (req, res) => {
  const { userId: _id } = req.params;

  // const _id = "62fd60aa19e803d1b5ff2110";

  const user = await User.findOne({ _id });
  console.log("Existing Org::::");
  console.log(user);

  if (!user) {
    return res.json({
      message: "No user exists with this id.",
      error: true,
    });
  }

  return res.status(200).json({
    message: "Sign up successful!",
    error: false,
    token,
  });
};
