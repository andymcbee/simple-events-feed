import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import getEvents from "../service/getEvents";
import updateEvent from "../service/updateEvent";
import deleteExistingEvent from "../service/deleteEvent";
import createNewEvent from "../service/createEvent";
import PopupCreateEvent from "./PopupCreateEvent";
import getOrgBySubDomain from "../service/getOrgBySubDomain";
import getOrgByOrgId from "../service/getOrgByOrgId";

function EventsFeed({ user }) {
  const [eventArray, setEventArray] = useState([]);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [eventsPeriod, setEventsPeriod] = useState("future");
  const [loading, setLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState("");
  const [error, setError] = useState(false);

  //Add this logic into the useEffect:
  //check and see if sub domain or not
  //if sub domain, use the sub domain value
  // if no sub domain, search for org with the User's orgId to find sub domain value
  // set orgId
  //Fetch events

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
    const host = window.location.hostname;
    const hostArr = host.split(".");

    if (hostArr.length === 2) {
      //find Org by Sub Domain
      //if Org exists, set orgId state
      //if no org exists, set error true

      const fetchOrgData = async () => {
        const org = await getOrgBySubDomain(hostArr[0]);

        await setOrganizationId(org._id);
        fetchEventsData(org._id, "future");
      };

      fetchOrgData();
    }

    if (hostArr.length === 1) {
      console.log("HOST ARR EQUALS 1");
      const fetchOrgData = async () => {
        const org = await getOrgByOrgId(user?.user?.organizationId);

        await setOrganizationId(org._id);
        fetchEventsData(org._id, "future");
      };

      fetchOrgData();
    }

    if (hostArr.length > 2) {
      setError(true);
    }

    const fetchEventsData = async (organizationId) => {
      const data = await getEvents({ organizationId, period: eventsPeriod });
      console.log("FETCH EVENTS... ");
      console.log(organizationId);
      console.log(data);
      await setEventArray(data);
      setLoading(false);
    };
  }, [eventsPeriod]);

  const closeCreateEventPopup = () => {
    setShowCreateEvent(false);
  };

  const showCreateEventPopup = () => {
    setShowCreateEvent(true);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error. Contact support.</div>;
  }

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
          {eventArray?.map((x) => {
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
