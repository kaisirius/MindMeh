import { createContext, useContext } from "react";
import type { T_contentCardProps } from "../types/T_contentCardProps";

type contextType = {
  CurrentContents: T_contentCardProps[],
  setCurrentContents: React.Dispatch<React.SetStateAction<T_contentCardProps[]>>
}

export const CurrentContentsContext = createContext<contextType | undefined>(undefined);

export const useCurrentContentsContext = () => {
  const context = useContext(CurrentContentsContext);
  if(!context) throw new Error("no context")
  return context
}