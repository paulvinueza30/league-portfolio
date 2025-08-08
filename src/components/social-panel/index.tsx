// components/social/SocialPanel.tsx

import ProgressDialog from "./Progress";
import MessagePopOver from "./MessageBox";

export default function SocialPanel() {
  return (
    <>
      <div className="select-none flex gap-2">
        <MessagePopOver />
        <ProgressDialog />
      </div>
    </>
  );
}
