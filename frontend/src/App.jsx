import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Lessons from "./pages/Lessons";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import Admin from "./pages/Admin";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes - zahtevaju autentifikaciju */}
        <Route element={<ProtectedRoute />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId/lessons" element={<Lessons />} />
          <Route path="/lesson/:lessonId" element={<Lesson />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
        </Route>

        {/* Admin routes - zahtevaju admin ulogu */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<p>404 - Page not found</p>} />
      </Routes>
    </>
  );
}
