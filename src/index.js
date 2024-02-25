import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./global.css";
import HomePage from "./pages/Home";
import ChatPage from "./pages/Chat";
import Dashboard from "./pages/DashBoard";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
