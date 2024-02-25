import React from "react";
import { createRoot } from "react-dom/client"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./global.css";
import HomePage from "./pages/Home";
import ChatPage from "./pages/Chat";
import Dashboard from "./pages/DashBoard";
import KanbanPage from "./pages/Kanban/Kanban";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kanban" element={<KanbanPage />} />
      </Routes>
    </React.StrictMode>
  </Router>
);
