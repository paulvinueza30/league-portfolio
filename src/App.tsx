import "./App.css";

import ChampSelectScreen from "./components/champ-select-screen";
import MatchFound from "@/components/match-found";

function App() {
  return (
    <div className="bg-gray-200 w-screen h-screen">
      <MatchFound />
    </div>
  );
  // return <ChampSelectScreen />;
}

export default App;
