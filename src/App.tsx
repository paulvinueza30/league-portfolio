import "./App.css";
// import RuneSelection from "@/components/runes";
// import SummonerSpells from "./components/summoner-spells";
// import BMSection from "./components/bm-section";
// import QueueInfo from "./components/queueInfo";
import SocialPanel from "./components/social-panel";
function App() {
  return (
    <>
      <div className="flex justify-center items-center border-8 h-screen">
        <SocialPanel />
      </div>
    </>
  );
}

export default App;
