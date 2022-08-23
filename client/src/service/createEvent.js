import axios from "axios";

const createEvent = async (data) => {
  console.log("CREATE EVENT FIRED");
  console.log(data.organizationId);
  try {
    const myData = await axios.post(
      `http://localhost:5000/api/v1/events/create`,
      {
        data: {
          name: data.name,
          startTimeUnixTimestamp: data.startTimeUnix,
          endTimeUnixTimestamp: data.endTimeUnix,
          address: data.address,
          description: data.description,
          organizationId: data.organizationId,
        },
      }
    );

    return myData.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default createEvent;
