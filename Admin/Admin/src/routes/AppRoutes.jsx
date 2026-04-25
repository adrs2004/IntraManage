import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageManagers from "../pages/users/ManageManagers";
import ManageInterns from "../pages/users/ManageInterns";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/auth/Register";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/managers"
                    element={
                        <ProtectedRoute>
                            <ManageManagers />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interns"
                    element={
                        <ProtectedRoute>
                            <ManageInterns />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;