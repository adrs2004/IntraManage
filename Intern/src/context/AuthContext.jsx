import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Heartbeat mechanism
    useEffect(() => {
        let interval;
        if (user) {
            // Ping heartbeat every 60 seconds
            interval = setInterval(() => {
                API.post("/auth/heartbeat").catch(err => console.log(err));
            }, 60000);
            
            // Also ping immediately on mount if user exists
            API.post("/auth/heartbeat").catch(err => console.log(err));
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [user]);

    const login = async (data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        // We delay the API call slightly to ensure the interceptor picks up the new localStorage token
        setTimeout(() => {
            API.post("/activity", { action: "Logged in", status: "online" }).catch(err => console.log(err));
        }, 100);
    };

    const logout = async () => {
        try {
            await API.post("/activity", { action: "Logged out", status: "offline" });
        } catch (err) {
            console.log("Failed to log logout activity", err);
        }
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};