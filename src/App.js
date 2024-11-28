import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Info from "./pages/Info";

function App() {
  // logic

  // view
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
