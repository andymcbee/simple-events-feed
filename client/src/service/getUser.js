import axios from "axios";

const getUser = async (jwt) => {
  console.log("WITHIN GET USER SERVICE:::");
  console.log(jwt);

  const config = {
    headers: { Authorization: `Bearer ${jwt}` },
  };

  try {
    const data = await axios.get(
      `http://localhost:5000/api/v1/users/me`,
      config
    );

    console.log(data.data.result);

    return { user: data.data.result };
  } catch (error) {
    console.log(error);
  }
};

export default getUser;

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
