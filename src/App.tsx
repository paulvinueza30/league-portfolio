import "./App.css";
// import RuneSelection from "@/components/runes";
// import SummonerSpells from "./components/summoner-spells";
// import BMSection from "./components/bm-section";
import QueueInfo from "./components/queueInfo";

function App() {
  return (
    <>
      <div className="flex justify-center items-center border-8 h-screen">
        <QueueInfo />
      </div>
    </>
  );
}

export default App;
