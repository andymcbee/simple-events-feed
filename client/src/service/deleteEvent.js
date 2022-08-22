import axios from "axios";

const deleteEvent = async (eventId) => {
  console.log(eventId);
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/events/${eventId}`
    );

    //  console.log(data.data.events);

    return data.data.events;
  } catch (error) {
    console.log(error);
  }
};

export default deleteEvent;
