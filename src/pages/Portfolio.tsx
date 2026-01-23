import "@/App.css";

import ChampSelectScreen from "@/components/champ-select-screen";
import InQueue from "@/components/in-queue";
import { AudioProvider } from "@/context/AudioContext";
import { useEffect } from "react";
import { acceptedAtom } from "@/atoms/queueAtom";
import { userHasInteractedAtom } from "@/atoms/joyrideAtom";
import { useAtom, useSetAtom } from "jotai";
export default function Portfolio() {
  const [accepted] = useAtom(acceptedAtom);
  const setUserHasInteracted = useSetAtom(userHasInteractedAtom);

  useEffect(() => {
    const handleClick = () => {
      setUserHasInteracted(true);
      window.removeEventListener("click", handleClick);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [setUserHasInteracted]);

  return (
    <>
      <AudioProvider>
        {accepted ? <ChampSelectScreen /> : <InQueue />}
      </AudioProvider>
    </>
  );
}
