import { createContext, useContext } from "react";
import type { T_currentBrainProps } from "../types/T_currentBrainProps";

type contextType = {
  CurrentBrains: T_currentBrainProps[],
  setCurrentBrains: React.Dispatch<React.SetStateAction<T_currentBrainProps[]>>
}

export const CurrentBrainsContext = createContext<contextType | undefined>(undefined);

export const useCurrentBrainsContext = () => {
  const context = useContext(CurrentBrainsContext);
  if(!context) throw new Error("no context")
  return context
}