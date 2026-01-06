import { Routes, Route } from "react-router-dom";
import "./App.css";
import Portfolio from "./pages/Portfolio";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={< Portfolio />} />

    </Routes>
  );
}
