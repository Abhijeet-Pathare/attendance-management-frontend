import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Batches from "./pages/Batches";
import Attendance from "./pages/Attendance";
import AttendanceReport from "./pages/AttendanceReport";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Show Navbar only if logged in */}
        {localStorage.getItem("token") && <Navbar />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendance-report" element={<AttendanceReport />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
