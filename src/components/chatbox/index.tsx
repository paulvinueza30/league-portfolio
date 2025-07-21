import { Input } from "@/components/ui/input";

function Chat() {
  let chat: string[] = [
    "Paul Vinueza joined the lobby",
    "Interested Party joined the lobby",
  ];
  return (
    <div className="bg-[#00070F] justify-items-start">
      {chat.map((c, idx) => (
        <p key={idx} className="text-[#555C63] text-sm mx-4">
          {c}
        </p>
      ))}
    </div>
  );
}

function ChatInput() {
  return (
    <Input className="h-full focus:outline-none focus:ring-0 border-[#C8AA6E] bg-[#020d15df] text-[#F0E6D2] rounded-none" />
  );
}

export default function Chatbox() {
  return (
    <div className="min-w-md h-full grid grid-rows-[3.5fr_1fr]">
      <Chat />
      <ChatInput />
    </div>
  );
}
