import "./App.css";

import ChampSelectScreen from "./components/champ-select-screen";
import InQueue from "./components/in-queue";
import { AudioProvider } from "@/context/AudioContext";

import { acceptedAtom } from "./atoms/queueAtom";
import { useAtom } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  const [accepted] = useAtom(acceptedAtom);
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AudioProvider>
          <ReactQueryDevtools />
          {accepted ? <ChampSelectScreen /> : <InQueue />}
        </AudioProvider>
      </QueryClientProvider>
    </>
  );
}
