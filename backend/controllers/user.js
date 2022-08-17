import Organization from "../models/organization.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  console.log("WORKED");

  const subDomain = "test-sub22";
  const email = "armcburn+17@gmail.com";
  const password = "123";
  const confirmPassword = "123";
  const orgName = "Fenlon Industries";

  //hit this end point with:
  //email
  //password
  //confirmPassword
  //subDomain
  //orgName

  //check and see if a user exists with email, if so - return an error.

  //check and see if the slug chosen exists, if so - return an error.

  //check and see if passwords match, if not - return an error.

  // If all pass, create the Organization in MongoDB
  // be sure to return the data back so we can pass the ID through to the user

  //if all pass, create the User in MongoDB

  //worry about returning JWT later.

  ///////////////////////////////

  //check for existing user by email, return error if found

  const existingUser = await User.findOne({ email });
  console.log("Existing user::::");
  console.log(existingUser);

  if (existingUser) {
    return res.json({
      message: "User already exists with this email",
      error: true,
    });
  }

  //check for existing sub domain, return error if found

  const existingOrgSubDomain = await Organization.findOne({ subDomain });
  console.log("Existing Org Sub domain::::");
  console.log(existingOrgSubDomain);

  if (existingOrgSubDomain) {
    return res.json({
      message: "Sub domain already taken. Please choose a different one.",
      error: true,
    });
  }

  if (password !== confirmPassword) {
    return res.json({
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

  return res.json({
    message: "Sign up successful!",
    error: false,
  });

  //Add later: return a JWT to the front end and log the user in.
};

export const signin = async (req, res) => {
  console.log("WORKED");
};

export const resetPassword = async (req, res) => {
  console.log("WORKED");
};

export const setNewPassword = async (req, res) => {
  console.log("WORKED");
};

export const getUser = async (req, res) => {
  console.log("WORKED");
};
