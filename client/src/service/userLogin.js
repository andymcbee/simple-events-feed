import { API } from "../api";
//import axios from "axios";

const userLogin = async (email, password) => {
  try {
    console.log("USER LOGIN");
    console.log(email);
    console.log(password);
    const myData = await API.post(`/api/v1/users/signin`, {
      data: {
        email,
        password,
      },
    });

    console.log(myData);

    //console.log(myData.data.token);

    return myData.data.token;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default userLogin;

/* 
try {
    const myData = await axios.post(
      `http://localhost:5000/api/v1/events/update/${data.id}`,
      {
        data: {
          name: data.name,
          startTimeUnixTimestamp: data.startTimeUnix,
          endTimeUnixTimestamp: data.endTimeUnix,
          address: data.address,
          description: data.description,
        },
      }
    );

    return myData.data;
  } catch (error) {
    console.log(error);
 */
