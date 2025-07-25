import { atom } from "jotai";

type MessageContent =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "guide";
      content: string;
      highlight?: string;
    };

type SystemMessage = {
  type: "system";
};

type UserMessage = {
  type: "user";
  username: string;
};

export type Chat = (SystemMessage | UserMessage) & {
  message: MessageContent;
};

export type ScriptedChat = Chat & { delay?: number };

export const initialChatScript: ScriptedChat[] = [
  {
    type: "system",
    message: { type: "text", content: "Paul Vinueza joined the lobby" },
    delay: 500,
  },
  {
    type: "system",
    message: { type: "text", content: "Interested Party joined the lobby" },
    delay: 1500,
  },
  {
    type: "user",
    username: "Paul Vinueza",
    message: { type: "text", content: "Hello, welcome to my portfolio!" },
    delay: 3000,
  },
  {
    type: "user",
    username: "Paul Vinueza",
    message: {
      type: "guide",
      content: "If you never played the game or its been a minute click",
      highlight: "here!",
    },
    delay: 5000,
  },
];

export const chatAtom = atom<Chat[]>([]);

export const addChatMessageAtom = atom(null, (get, set, newMessage: Chat) => {
  const currentChat = get(chatAtom);

  set(chatAtom, [...currentChat, newMessage]);
});
