import React, { useState } from "react";
import { DateTime } from "luxon";
import {
  IoCalendarClearOutline,
  IoTimeOutline,
  IoMapOutline,
} from "react-icons/io5";
import PopupConfirmDeleteEvent from "./PopupConfirmDeleteEvent";
import PopupEditEvent from "./PopupEditEvent";
function EventCard({ user, event, editEvent, deleteEvent }) {
  //console.log(event);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);

  const {
    name,
    startTimeUnixTimestamp,
    timeZone,
    address,
    duration,
    description,
  } = event;

  const closeDeleteEventPopup = () => {
    setShowConfirmDelete(false);
  };

  const showDeleteEventPopup = () => {
    setShowConfirmDelete(true);
  };

  const closeEditEventPopup = () => {
    setShowEditEvent(false);
  };

  const showEditEventPopup = () => {
    setShowEditEvent(true);
  };

  console.log(showConfirmDelete);
  //1660231345
  const myDateTime = DateTime.fromSeconds(parseInt(startTimeUnixTimestamp));

  const humanReadable = myDateTime.toLocaleString(DateTime.DATETIME_MED);

  console.log(humanReadable);
  // const myDateTimeISO = myDateTime.toISO();
  //  console.log(myDateTimeISO);
  <button>DELETE EVENT</button>;

  return (
    <>
      {showConfirmDelete && (
        <PopupConfirmDeleteEvent
          closeModal={closeDeleteEventPopup}
          deleteEvent={deleteEvent}
        />
      )}
      {showEditEvent && (
        <PopupEditEvent
          closeModal={closeEditEventPopup}
          deleteEvent={editEvent}
        />
      )}
      <div className="w-full flex flex-col gap-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
        {user && (
          <div className="flex gap-2">
            <div
              className="hover:underline hover:cursor-pointer"
              onClick={() => showEditEventPopup()}
            >
              Edit Event
            </div>
            <div
              className="hover:underline hover:cursor-pointer"
              onClick={() => showDeleteEventPopup()}
            >
              Delete Event
            </div>
          </div>
        )}
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </div>
        <div>
          <div className="flex gap-2">
            <div className="text-gray-500">
              <IoCalendarClearOutline />
            </div>
            <span className="text-sm text-gray-500 ">{address}</span>
          </div>
          <div className="flex gap-2">
            <div className="text-gray-500">
              <IoMapOutline />
            </div>
            <span className="text-sm text-gray-500 ">{humanReadable}</span>
          </div>
          <div className="flex gap-2">
            <div className="text-gray-500">
              <IoTimeOutline />
            </div>
            <span className="text-sm text-gray-500 ">
              Duration: {duration} minutes
            </span>
          </div>
        </div>
        <div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export default EventCard;
