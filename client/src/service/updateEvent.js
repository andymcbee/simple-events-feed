import { API } from "../api";

const updateEvent = async (data) => {
  console.log("UPDATE EVENT IN SERVICE:::::::");
  console.log(data);
  try {
    const myData = await API.post(`/api/v1/events/update/${data.id}`, {
      data: {
        name: data.name,
        startTimeUnixTimestamp: data.startTimeUnix,
        endTimeUnixTimestamp: data.endTimeUnix,
        address: data.address,
        description: data.description,
      },
    });

    return myData.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default updateEvent;
