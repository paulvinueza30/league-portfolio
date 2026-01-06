import { Routes, Route } from "react-router-dom";
import "./App.css";
import Portfolio from "./pages/Portfolio";
import BlogHome from "./pages/BlogHome";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={< Portfolio />} />
      <Route path="/blog" element={<BlogHome />} />
    </Routes>
  );
}
