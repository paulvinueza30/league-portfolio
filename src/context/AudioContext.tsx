import { createContext, useContext, useState } from "react";

type AudioContextType = {
  volume: number;
  setVolume: (v: number) => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [volume, setVolume] = useState(0.5);
  return (
    <AudioContext.Provider value={{ volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
