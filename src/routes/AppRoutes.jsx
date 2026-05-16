import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LanguageProvider } from "../context/LanguageContext";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Schedule from "../pages/Schedule";
import History from "../pages/History";
import Guide from "../pages/Guide";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

export default function AppRoutes() {
    // Global state for user profile
    const [userProfile, setUserProfile] = useState({
        name: 'Budi',
        email: 'budi@solitech.com',
        avatar: 'https://i.pinimg.com/736x/85/38/f4/8538f477fbcdd04031bbcdd7f3dba6be.jpg'
    });

    return (
        <LanguageProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/guide" element={<Guide />} />
                    <Route path="/profile" element={<Profile user={userProfile} onUpdateProfile={setUserProfile} />} />
                    <Route path="/settings" element={<Settings user={userProfile} />} />
                </Routes>
            </BrowserRouter>
        </LanguageProvider>
    );
}