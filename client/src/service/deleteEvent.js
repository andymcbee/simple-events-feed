import { API } from "../api";

const deleteEvent = async (eventId) => {
  try {
    const { data } = await API.post(`/api/v1/events/delete/${eventId}`);

    //  console.log(data.data.events);

    return;
  } catch (error) {
    console.log(error);
  }
};

export default deleteEvent;
