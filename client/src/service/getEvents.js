import { API } from "../api";

const getEvents = async ({ organizationId, period }) => {
  try {
    const { data } = await API.get(
      `/api/v1/events/${organizationId}/${period}`
    );

    return data.data?.events;
  } catch (error) {
    console.log(error);
  }
};

export default getEvents;
