import react, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import CreateEvent from "./views/CreateEvent";
import UpdateEvent from "./views/UpdateEvent";
import EventFeed from "./views/EventFeed";
import PasswordReset from "./views/PasswordReset";
import RequestPasswordReset from "./views/RequestPasswordReset";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Navbar from "./components/Navbar";
import userLogin from "./service/userLogin";
import getUser from "./service/getUser";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    console.log("LOGIN CLICKED - inside of appjs");
    console.log(email);
    console.log(password);
    const jwt = await userLogin(email, password);
    console.log(jwt);
    await window.localStorage.setItem("jwt", JSON.stringify(jwt));
    const myJwt = JSON.parse(window.localStorage.getItem("jwt"));
    console.log(myJwt);
    const user = await getUser(myJwt);
    console.log(user);
    setUser(user);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("jwt");
    setUser(null);
  };

  //let user = false;

  return (
    <>
      <Router>
        {user && <Navbar user={user} handleLogout={handleLogout} />}
        <div className="flex justify-center border border-indigo-500 p-5">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Home user={user} />
                ) : (
                  <Signin handleLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/new-event"
              element={user ? <CreateEvent /> : <Signin />}
            />
            <Route
              path="/update-event/:eventId"
              element={user ? <UpdateEvent /> : <Signin />}
            />
            <Route path="/feed" element={<EventFeed />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route
              path="/request-password-reset"
              element={<RequestPasswordReset />}
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
