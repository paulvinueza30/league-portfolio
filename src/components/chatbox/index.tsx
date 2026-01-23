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
import { joyrideAtom, userHasInteractedAtom } from "@/atoms/joyrideAtom";
import { gsapAtom } from "@/atoms/gsapAtom";

import { useAudio } from "@/context/AudioContext";

// Shared ref across all Chatbox instances to prevent duplicate initialization
const chatInitialized = { current: false };

function Chat() {
  const [chat] = useAtom(chatAtom);
  const chatFx = new Audio(chatSound);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [_, setRunTour] = useAtom(joyrideAtom);
  const { volume } = useAudio();
  useEffect(() => {
    if (chat.length === 0) return; // ⛔ No message to react to
    const latestMessage = chat[chat.length - 1];

    if (latestMessage && latestMessage.type === "user") {
      try {
        chatFx.currentTime = 0;
        chatFx.volume = volume;
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
            <button
              onClick={() => setRunTour(true)}
              className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              {"\u00A0" + message.highlight}
            </button>
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="h-full overflow-y-auto px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 bg-[#00070F] text-[10px] sm:text-xs md:text-sm leading-relaxed break-words">
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
  const [isAnimationComplete] = useAtom(gsapAtom);
  const [chat] = useAtom(chatAtom);
  const [userHasInteracted] = useAtom(userHasInteractedAtom);

  useEffect(() => {
    if (chatInitialized.current || !isAnimationComplete || !userHasInteracted) return;
    if (chat.length > 0) {
      chatInitialized.current = true;
      return;
    }

    chatInitialized.current = true;

    initialChatScript.forEach(({ delay = 0, ...msg }) => {
      setTimeout(() => {
        addChatMessage(msg);
      }, delay);
    });
  }, [addChatMessage, isAnimationComplete, chat.length, userHasInteracted]);
  return (
    <div className="w-full max-w-[85vw] sm:w-52 sm:max-w-52 md:w-full md:max-w-[90vw] lg:w-64 lg:max-w-64 xl:w-lg xl:max-w-lg h-[6em] sm:h-[6.5em] md:h-[12em] lg:h-[9em] xl:h-[12em] grid grid-rows-[3.5fr_1fr]">
      <Chat />
      <ChatInput />
    </div>
  );
}
