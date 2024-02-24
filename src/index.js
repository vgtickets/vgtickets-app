import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importando BrowserRouter como Router, Routes e Route
import "./global.css";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./pages/Home";
import ChatPage from "./pages/Chat";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} /> 
      </Routes> 
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
