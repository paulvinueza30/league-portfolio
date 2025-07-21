import "./App.css";
// import RuneSelection from "@/components/runes";
// import SummonerSpells from "./components/summoner-spells";
// import BMSection from "./components/bm-section";
// import QueueInfo from "./components/queueInfo";
// import SocialPanel from "./components/social-panel";
// import MatchIntro from "@/components/match-intro";
import PlayerSection from "./components/player-section";

function App() {
  return (
    <>
      <div className="flex justify-center items-center border-8 h-screen">
        <PlayerSection />
      </div>
    </>
  );
}

export default App;
