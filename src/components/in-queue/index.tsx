import { useAtom } from "jotai";
import { AudioSetupModal } from "./AudioSetupModal";
import QueuePop from "./QueuePop";
import { audioModalAtom } from "@/atoms/queueAtom";

import { inQueueuBackground } from "@/assets/client";

export default function InQueue() {
  const [audioConfigured] = useAtom(audioModalAtom);
  return (
    <div
      className="bg-gray-200 w-screen h-screen"
      style={{
        backgroundImage: `url(${inQueueuBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AudioSetupModal />
      {audioConfigured && <QueuePop />}
    </div>
  );
}
