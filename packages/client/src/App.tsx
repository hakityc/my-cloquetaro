import { useEffect } from "react";
import "./App.css";
import { client } from "./api";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";

const Home = () => (
  <div className="content">
    <h1>Rsbuild with React</h1>
    <p>Start building amazing things with Rsbuild.</p>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
