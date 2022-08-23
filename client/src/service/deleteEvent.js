import axios from "axios";

const deleteEvent = async (eventId) => {
  console.log("WITHIN DELETE EVENT SERVICE");
  console.log(eventId);
  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/events/delete/${eventId}`
    );

    //  console.log(data.data.events);

    return;
  } catch (error) {
    console.log(error);
  }
};

export default deleteEvent;
