import { Input } from "@/components/ui/input";
import { chatAtom } from "@/atoms/chatAtom";
import { useAtom, useSetAtom } from "jotai";
import {
  type Chat,
  addChatMessageAtom,
  initialChatScript,
} from "@/atoms/chatAtom";
import { chatSound } from "@/assets/sounds";
import { useRef, useEffect } from "react";

function Chat() {
  const [chat] = useAtom(chatAtom);
  const chatFx = new Audio(chatSound);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const latestMessage = chat[chat.length - 1];

    if (latestMessage && latestMessage.type === "user") {
      try {
        chatFx.currentTime = 0;
        chatFx.play().catch();
      } catch (error) {}
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  function renderChat(c: Chat, idx: number) {
    if (c.type === "system") {
      return (
        <p key={idx} className="text-[#555C63] break-words">
          {c.message.content}
        </p>
      );
    }
    if (c.type === "user") {
      const message = c.message;

      return (
        <div key={idx} className="flex flex-row flex-wrap break-words">
          <span className="text-[#06b5dc]">{c.username + ": "}</span>
          <span className="text-white break-words">
            {"\u00A0" + message.content}
          </span>
          {message.type === "guide" && (
            <a className="text-blue-400">{"\u00A0" + message.highlight}</a>
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="h-full overflow-y-auto px-3 py-2 bg-[#00070F] text-sm leading-relaxed break-words">
      {chat.map((c, idx) => renderChat(c, idx))}
      <div ref={bottomRef} />
    </div>
  );
}

function ChatInput() {
  const addChatMessage = useSetAtom(addChatMessageAtom);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputValue = e.currentTarget.value;
      if (inputValue.trim()) {
        addChatMessage({
          type: "user",
          username: "Interested Party",
          message: { type: "text", content: inputValue },
        });
        e.currentTarget.value = "";
      }
    }
  };

  return (
    <Input
      className="h-full focus:outline-none focus:ring-0 border-[#C8AA6E] bg-[#020d15df] text-[#F0E6D2] rounded-none"
      onKeyDown={handleKeyDown}
    />
  );
}

export default function Chatbox() {
  const addChatMessage = useSetAtom(addChatMessageAtom);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    initialChatScript.forEach(({ delay = 0, ...msg }) => {
      setTimeout(() => {
        addChatMessage(msg);
      }, delay);
    });
  }, [addChatMessage]);
  return (
    <div className="w-lg max-w-lg h-[12em] grid grid-rows-[3.5fr_1fr]">
      <Chat />
      <ChatInput />
    </div>
  );
}
