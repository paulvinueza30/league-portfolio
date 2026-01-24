import { createContext, useContext, useState, useEffect, useCallback } from "react";

type AudioContextType = {
  volume: number;
  setVolume: (v: number) => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

const LOCAL_STORAGE_VOLUME_KEY = "audio_volume";

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [volume, setVolumeState] = useState(() => {
    try {
      const storedVolume = localStorage.getItem(LOCAL_STORAGE_VOLUME_KEY);
      return storedVolume ? parseFloat(storedVolume) : 0.5;
    } catch (error) {
      console.error("Failed to read volume from localStorage", error);
      return 0.5;
    }
  });

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    try {
      localStorage.setItem(LOCAL_STORAGE_VOLUME_KEY, newVolume.toString());
    } catch (error) {
      console.error("Failed to write volume to localStorage", error);
    }
  }, []);

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
