import axios from "axios";

const userSignup = async (
  email,
  password,
  confirmPassword,
  orgName,
  subDomain
) => {
  console.log("WITHIN SIGNUP SERVICE::::");
  console.log("SUB DOMAIN");
  console.log(subDomain);
  console.log("EMAIL");
  console.log(email);
  console.log("PASSWORD");
  console.log(password);
  console.log("CONF PASSWORD");
  console.log(confirmPassword);
  console.log("ORG NAME");
  console.log(orgName);

  console.log("WITHIN LOGIN SERVICE:::");
  console.log(email);
  console.log(password);
  try {
    const myData = await axios.post(
      `http://localhost:5000/api/v1/users/signup`,
      {
        data: {
          email,
          password,
          confirmPassword,
          orgName,
          subDomain,
        },
      }
    );

    //console.log(myData.data.token);

    return myData.data.token;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default userSignup;
