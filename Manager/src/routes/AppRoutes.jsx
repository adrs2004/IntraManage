import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateProject from "../pages/projects/CreateProject";
import Projects from "../pages/projects/Projects";
import FileManager from "../pages/projects/FileManager";
import ActivityTimeline from "../pages/activity/ActivityTimeline";
import Analytics from "../pages/dashboard/Analytics";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
                <Route path="/files" element={<ProtectedRoute><FileManager /></ProtectedRoute>} />
                <Route path="/activity" element={<ProtectedRoute><ActivityTimeline /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;