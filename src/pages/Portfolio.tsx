import "@/App.css";

import ChampSelectScreen from "@/components/champ-select-screen";
import InQueue from "@/components/in-queue";
import { AudioProvider } from "@/context/AudioContext";
import { skipAnimationsAndQueueAtom } from "@/atoms/queueAtom";
import { useAtom } from "jotai";

export default function Portfolio() {
  const [skipAnimationsAndQueue] = useAtom(skipAnimationsAndQueueAtom);

  return (
    <>
      <AudioProvider>
        {skipAnimationsAndQueue ? <ChampSelectScreen /> : <InQueue />}
      </AudioProvider>
    </>
  );
}
