import axios from "axios";

let baseURL = "";

const jwt = JSON.parse(window.localStorage.getItem("jwt"));
console.log(jwt);

/* 
const config = {
  headers: { Authorization: `Bearer ${jwt}` },
}; */

if (process.env.NODE_ENV === "development") {
  console.log("DEV SERVER DETECTED");
  baseURL = "http://localhost:5000";
}

if (process.env.NODE_ENV === "production") {
  console.log("DEV SERVER DETECTED");
  baseURL = "https://simple-events-feed-node-backen.herokuapp.com";
}

export const API = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${jwt}` },
});
