import { Input } from "@/components/ui/input";

function Chat() {
  let chat: string[] = [
    "Paul Vinueza joined the lobby",
    "Interested Party joined the lobby",
  ];
  return (
    <div className="bg-[#00070F] p-4  justify-items-start">
      {chat.map((c, idx) => (
        <p key={idx} className="text-[#555C63] text-sm">
          {c}
        </p>
      ))}
    </div>
  );
}

function ChatInput() {
  return (
    <Input className="focus:outline-none focus:ring-0 border-[#C8AA6E] bg-[#00070F] text-[#F0E6D2] rounded-none" />
  );
}

export default function Chatbox() {
  return (
    <div className="w-1/2">
      <Chat />
      <ChatInput />
    </div>
  );
}
