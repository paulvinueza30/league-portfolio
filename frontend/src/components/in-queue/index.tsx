import { ConfigSetupModal } from "./ConfigSetupModal";
import QueuePop from "./QueuePop";

import { inQueueuBackground } from "@/assets/client";

export default function InQueue() {
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
      <ConfigSetupModal />
      <QueuePop />
    </div>
  );
}
