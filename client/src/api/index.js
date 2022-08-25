import axios from "axios";

let baseURL = "";

const jwt = JSON.parse(window.localStorage.getItem("jwt"));
console.log("JWT WITHIN INDEX JS API################");
console.log(jwt);

if (process.env.NODE_ENV === "development") {
  console.log("DEV SERVER DETECTED22222");
  baseURL = "http://localhost:5000";
}

if (process.env.NODE_ENV === "production") {
  console.log("PROD SERVER DETECTED11111");
  baseURL = "https://simple-events-feed-node-backen.herokuapp.com";
}

console.log("JWT AND BASE URL::::");
console.log(jwt);
console.log(baseURL);

export const API = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${jwt}` },
});
