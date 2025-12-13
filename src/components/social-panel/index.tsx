// components/social/SocialPanel.tsx

import ProgressDialog from "./Progress";
import MessagePopOver from "./MessageBox";

export default function SocialPanel() {
  return (
    <>
      <div className="select-none flex gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0">
        <MessagePopOver />
        <ProgressDialog />
      </div>
    </>
  );
}
