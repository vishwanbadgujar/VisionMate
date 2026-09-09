import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "@/screens/Welcome";
import Permissions from "@/screens/Permissions";
import Home from "@/screens/Home";
import History from "@/screens/History";
import Settings from "@/screens/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
