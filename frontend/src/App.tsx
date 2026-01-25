import { Routes, Route } from "react-router-dom";
import "./App.css";

import { BlogListPage } from "./components/runes/BlogListPage";
import { BlogPostPage } from "./components/runes/BlogPostPage";
import InQueue from "./components/in-queue";
import ChampSelectScreen from "./components/champ-select-screen";
import { AudioProvider } from "./context/AudioContext";
import DeclinePage from "./pages/DeclinePage";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if ((window as any).ackeeTracker) {
      (window as any).ackeeTracker.record("4a74bed1-45d8-4bf6-b1f9-4aa42581dad7");
    }
  }, [location.pathname]);

  return null;
};
export default function App() {
  return (
    <AudioProvider>
      <RouteTracker />
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
