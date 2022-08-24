import { API } from "../api";

const createEvent = async (data) => {
  try {
    /*     const jwt = JSON.parse(window.localStorage.getItem("jwt"));
    console.log(jwt); */

    /*     const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }; */

    const myData = await API.post(`/api/v1/events/create`, {
      data: {
        name: data.name,
        startTimeUnixTimestamp: data.startTimeUnix,
        endTimeUnixTimestamp: data.endTimeUnix,
        address: data.address,
        description: data.description,
        organizationId: data.organizationId,
      },
      /*       config,
       */
    });

    return myData.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default createEvent;
