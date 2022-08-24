import axios from "axios";

const getEvents = async ({ organizationId, period }) => {
  console.log("GET EVENTS SERVICE");
  console.log(organizationId);
  console.log(period);

  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/events/${organizationId}/${period}`
    );

    //  console.log(data.data.events);

    return data.data?.events;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default getEvents;
