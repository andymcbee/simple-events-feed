import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import getEvents from "../service/getEvents";
import updateEvent from "../service/updateEvent";
import deleteExistingEvent from "../service/deleteEvent";
import createNewEvent from "../service/createEvent";
function EventsFeed({ user }) {
  const [eventArray, setEventArray] = useState([]);

  const organizationId = "62fe240e050c78355542902f";

  const deleteEvent = async (data) => {
    console.log("delete event clicked23232");
    console.log(data);
    console.log("CREATE EVENT FIRED IN EVENTS FEED");
    console.log(data);
    await deleteExistingEvent(data._id);
    const refreshedData = await getEvents(data.organizationId);

    setEventArray(refreshedData);
  };

  const createEvent = async ({ data }) => {
    console.log("CREATE EVENT FIRED IN EVENTS FEED");
    console.log(data);
    await createNewEvent(data);
    const refreshedData = await getEvents(data.organizationId);

    setEventArray(refreshedData);
  };

  const editEvent = async (eventData) => {
    const { data } = eventData;

    await updateEvent(data);
    const refreshedData = await getEvents(data.organizationId);

    setEventArray(refreshedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents(organizationId);
      setEventArray(data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <div className="border border-indigo-500 flex flex-col gap-2 items-center">
        {eventArray.map((x) => {
          return (
            <EventCard
              key={x._id}
              event={x}
              editEvent={editEvent}
              deleteEvent={deleteEvent}
              user={user}
              createEvent={createEvent}
            />
          );
        })}
      </div>
    </>
  );
}

export default EventsFeed;
