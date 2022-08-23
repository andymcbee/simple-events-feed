import axios from "axios";

const updateEvent = async (data) => {
  console.log(data);
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

    return error;
  }
};

export default updateEvent;
