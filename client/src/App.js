import react, { useState, useEffect } from "react";
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
import userSignup from "./service/userSignup";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const myJwt = JSON.parse(window.localStorage.getItem("jwt"));
      const user = await getUser(myJwt);
      await setUser(user);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogin = async (email, password) => {
    const jwt = await userLogin(email, password);
    await window.localStorage.setItem("jwt", JSON.stringify(jwt));
    const myJwt = JSON.parse(window.localStorage.getItem("jwt"));
    const user = await getUser(myJwt);
    await setUser(user);
    setLoading(false);
  };

  const handleSignup = async (
    email,
    password,
    confirmPassword,
    orgName,
    subDomain
  ) => {
    const jwt = await userSignup(
      email,
      password,
      confirmPassword,
      orgName,
      subDomain
    );
    console.log(jwt);
    await window.localStorage.setItem("jwt", JSON.stringify(jwt));
    const myJwt = JSON.parse(window.localStorage.getItem("jwt"));
    const user = await getUser(myJwt);
    await setUser(user);
    setLoading(false);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("jwt");
    setUser(null);
  };

  //let user = false;

  if (loading) {
    return <div>Loading...</div>;
  }
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
              element={
                user ? <CreateEvent /> : <Signin handleLogin={handleLogin} />
              }
            />
            <Route
              path="/update-event/:eventId"
              element={
                user ? <UpdateEvent /> : <Signin handleLogin={handleLogin} />
              }
            />
            <Route path="/feed" element={<EventFeed />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route
              path="/request-password-reset"
              element={<RequestPasswordReset />}
            />
            <Route
              path="/signin"
              element={user ? <Home /> : <Signin handleLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={user ? <Home /> : <Signup handleSignup={handleSignup} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
