import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import getEvents from "../service/getEvents";
import updateEvent from "../service/updateEvent";
import deleteExistingEvent from "../service/deleteEvent";
import createNewEvent from "../service/createEvent";
import PopupCreateEvent from "./PopupCreateEvent";
function EventsFeed({ user }) {
  const [eventArray, setEventArray] = useState([]);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [eventsPeriod, setEventsPeriod] = useState("future");

  const organizationId = "62fe240e050c78355542902f";

  const handleChangePeriod = (period) => {
    setEventsPeriod(period);
  };

  const deleteEvent = async (data) => {
    await deleteExistingEvent(data._id);
    const refreshedData = await getEvents({
      organizationId: data.organizationId,
      period: eventsPeriod,
    });

    setEventArray(refreshedData);
  };

  const createEvent = async ({ data }) => {
    await createNewEvent(data);
    const refreshedData = await getEvents({
      organizationId: data.organizationId,
      period: eventsPeriod,
    });

    setEventArray(refreshedData);
  };

  const editEvent = async (eventData) => {
    const { data } = eventData;

    await updateEvent(data);
    const refreshedData = await getEvents({
      organizationId: data.organizationId,
      period: eventsPeriod,
    });

    setEventArray(refreshedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents({ organizationId, period: eventsPeriod });

      /* const secondsSinceEpoch = Math.round(Date.now() / 1000);

      const upComingEvents = data.filter(
        (event) => event.endTimeUnixTimestamp > secondsSinceEpoch
      );

      console.log(upComingEvents);
      upComingEvents.sort((a, b) => {
        return a.startTimeUnixTimestamp - b.startTimeUnixTimestamp;
      }); */
      setEventArray(data);
    };

    fetchData().catch(console.error);
  }, [eventsPeriod]);

  const closeCreateEventPopup = () => {
    setShowCreateEvent(false);
  };

  const showCreateEventPopup = () => {
    setShowCreateEvent(true);
  };

  return (
    <>
      {showCreateEvent && (
        <PopupCreateEvent
          closeModal={closeCreateEventPopup}
          createEvent={createEvent}
          organizationId={organizationId}
        />
      )}

      <div>
        <div>
          {eventsPeriod === "future" ? (
            <div
              className="hover:cursor-pointer hover:underline"
              onClick={() => handleChangePeriod("past")}
            >
              Show past events
            </div>
          ) : (
            <div
              className="hover:cursor-pointer hover:underline"
              onClick={() => handleChangePeriod("future")}
            >
              Show upcoming events
            </div>
          )}
        </div>

        <div className="border border-indigo-200 flex flex-col gap-2 items-center">
          {user && (
            <div className="flex justify-end border border-indigo-500 w-full">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => showCreateEventPopup()}
              >
                Add New Event
              </button>
            </div>
          )}
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
      </div>
    </>
  );
}

export default EventsFeed;
