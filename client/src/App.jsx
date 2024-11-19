import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegsiterForm from "./components/RegsiterForm";
import TrackStatus from "./components/TrackStatus";

const App = () => {
  return (
    <>
      <Router>
        <nav className="w-full p-2 bg-blue-300 flex gap-5">
          <Link to="/register" className="text-xl">
            Register
          </Link>
          <Link to="/track-status" className="text-xl">
            Track Status
          </Link>
        </nav>
        <Routes>
          <Route path="/register" element={<RegsiterForm />} />
          <Route path="/track-status" element={<TrackStatus />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
