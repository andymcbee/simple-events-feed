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
function App() {
  let user = true;

  return (
    <>
      <Router>
        {user && <Navbar user={user} />}
        <div className="flex justify-center border border-indigo-500 p-5">
          <Routes>
            <Route
              path="/"
              element={user ? <Home user={user} /> : <Home user={user} />}
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
