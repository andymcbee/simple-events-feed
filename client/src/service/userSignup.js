import { API } from "../api";

const userSignup = async (
  email,
  password,
  confirmPassword,
  orgName,
  subDomain
) => {
  try {
    const myData = await API.post(`/api/v1/users/signup`, {
      data: {
        email,
        password,
        confirmPassword,
        orgName,
        subDomain,
      },
    });

    return myData.data.token;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default userSignup;
