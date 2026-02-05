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

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId/lessons" element={<Lessons />} />
          <Route path="/lesson/:lessonId" element={<Lesson />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </>
  );
}
