import "./App.css";

import ChampSelectScreen from "./components/champ-select-screen";
import InQueue from "./components/in-queue";
import { AudioProvider } from "@/context/AudioContext";

import { acceptedAtom } from "./atoms/queueAtom";
import { useAtom } from "jotai";

export default function App() {
  const [accepted] = useAtom(acceptedAtom);
  return (
    <>
      <AudioProvider>
        {accepted ? <ChampSelectScreen /> : <InQueue />}
      </AudioProvider>
    </>
  );
}
