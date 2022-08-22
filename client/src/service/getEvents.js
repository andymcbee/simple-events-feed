import axios from "axios";

const getEvents = async (organizationId) => {
  console.log(organizationId);
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/events/${organizationId}`
    );

    //  console.log(data.data.events);

    return data.data.events;
  } catch (error) {
    console.log(error);
  }
};

export default getEvents;
