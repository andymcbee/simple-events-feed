import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import CreateEvent from "./views/CreateEvent";
import UpdateEvent from "./views/UpdateEvent";
import EventFeed from "./views/EventFeed";
import PasswordReset from "./views/PasswordReset";
import RequestPasswordReset from "./views/RequestPasswordReset";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-event" element={<CreateEvent />} />
          <Route path="/update-event/:eventId" element={<UpdateEvent />} />
          <Route path="/subdomain-route" element={<EventFeed />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route
            path="/request-password-reset"
            element={<RequestPasswordReset />}
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
