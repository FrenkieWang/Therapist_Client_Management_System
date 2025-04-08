import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Session from "./pages/Session";
import Therapist from "./pages/Therapist";
import Client from "./pages/Client";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/therapist" element={<Therapist />} />
        <Route path="/client" element={<Client />} />
      </Routes>
    </Router>
  );
};

export default App;
