import { Routes, Route } from "react-router-dom";
import "./App.css";
import Portfolio from "./pages/Portfolio";
import { BlogListPage } from "./components/runes/BlogListPage";
import { BlogPostPage } from "./components/runes/BlogPostPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={< Portfolio />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
    </Routes>
  );
}
