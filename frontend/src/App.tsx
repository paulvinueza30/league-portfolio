import { Routes, Route } from "react-router-dom";
import "./App.css";

import { BlogListPage } from "./components/runes/BlogListPage";
import { BlogPostPage } from "./components/runes/BlogPostPage";
import InQueue from "./components/in-queue";
import ChampSelectScreen from "./components/champ-select-screen";
import { AudioProvider } from "./context/AudioContext";
import DeclinePage from "./pages/DeclinePage";
import { useLocation } from 'react-router-dom';
import useAckee from 'use-ackee';

export default function App() {
  const location = useLocation();

  useAckee(location.pathname, {
    server: 'https://analytics.paulvinueza.dev',
    domainId: '4a74bed1-45d8-4bf6-b1f9-4aa42581dad7'
  }, {
    detailed: true,
    ignoreLocalhost: false
  });
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
