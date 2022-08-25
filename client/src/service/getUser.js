import { API } from "../api";

const getUser = async (jwt) => {
  console.log("JWT::::");
  console.log(jwt);
  const config = {
    headers: { Authorization: `Bearer ${jwt}` },
  };

  try {
    const data = await API.get(`/api/v1/users/me`, config);

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
