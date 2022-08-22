import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import getEvents from "../service/getEvents";

function EventsFeed({ user }) {
  const [eventArray, setEventArray] = useState([]);

  const organizationId = "62fe240e050c78355542902f";

  const deleteEvent = () => {
    console.log("delete event clicked");
  };

  const editEvent = () => {
    console.log("EDIT CLICKED");
  };

  useEffect(() => {
    const fetchData = async () => {
      //pass org ID in dynamically
      const data = await getEvents(organizationId);
      // console.log(data);
      setEventArray(data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  //console.log("EVENT ARRAY:::");
  // console.log(eventArray);
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
            />
          );
        })}
      </div>
    </>
  );
}

export default EventsFeed;
