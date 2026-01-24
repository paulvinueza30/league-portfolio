import { Routes, Route } from "react-router-dom";
import "./App.css";

import { BlogListPage } from "./components/runes/BlogListPage";
import { BlogPostPage } from "./components/runes/BlogPostPage";
import InQueue from "./components/in-queue";
import ChampSelectScreen from "./components/champ-select-screen";
import { AudioProvider } from "./context/AudioContext";
import DeclinePage from "./pages/DeclinePage";

export default function App() {
  return (
    <AudioProvider>
      <Routes>
        <Route path="/" element={<InQueue />} />
        <Route path="/champ-select" element={<ChampSelectScreen />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/decline" element={<DeclinePage />} />
      </Routes>
    </AudioProvider>
  );
}
