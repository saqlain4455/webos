import {
  createContext,
  useContext,
} from "react";

const WindowManagerContext =
  createContext();

export function WindowManagerProvider({
  children,
  value,
}) {
  return (
    <WindowManagerContext.Provider
      value={value}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWM() {
  return useContext(
    WindowManagerContext
  );
}