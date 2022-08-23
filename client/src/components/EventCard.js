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
    endTimeUnixTimestamp,

    address,
    duration,
    description,
    organizationId,
  } = event;
  console.log(startTimeUnixTimestamp);
  console.log(endTimeUnixTimestamp);
  console.log((endTimeUnixTimestamp - startTimeUnixTimestamp) / 60);

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

  const myDateTime = DateTime.fromSeconds(parseInt(startTimeUnixTimestamp));

  const humanReadable = myDateTime.toLocaleString(DateTime.DATETIME_MED);

  return (
    <>
      {showConfirmDelete && (
        <PopupConfirmDeleteEvent
          closeModal={closeDeleteEventPopup}
          deleteEvent={deleteEvent}
          eventData={event}
        />
      )}

      {showEditEvent && (
        <PopupEditEvent
          closeModal={closeEditEventPopup}
          editEvent={editEvent}
          eventData={event}
        />
      )}
      <div className="w-full flex flex-col gap-2 p-6 bg-white rounded-lg border border-gray-200 shadow-md ">
        {user && (
          <div className="flex justify-end gap-2 border border-indigo-200">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => showEditEventPopup()}
            >
              Edit Event
            </button>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => showDeleteEventPopup()}
            >
              Delete Event
            </button>
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
              Duration: {(endTimeUnixTimestamp - startTimeUnixTimestamp) / 60}{" "}
              minutes
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
