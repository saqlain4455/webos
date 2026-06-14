import { useState } from "react";

import { APP_META } from "../Constants/appRegisry.jsx";

import NotepadApp from "../Apps/NotepadApp.jsx";
import CalculatorApp from "../Apps/CalculatorApp.jsx";
import FilesApp from "../Apps/FilesApp.jsx";
import SettingsApp from "../Apps/SettingsApp.jsx";
import BrowserApp from "../Apps/BrowserApp.jsx";
import ClockApp from "../Apps/ClockApp.jsx";
import TerminalApp from "../Apps/TerminalApp.jsx";
import FolderApp from "../Apps/FolderApp.jsx";

const APP_COMPONENTS = {
  notepad: NotepadApp,
  calculator: CalculatorApp,
  files: FilesApp,
  settings: SettingsApp,
  browser: BrowserApp,
  clock: ClockApp,
  terminal: TerminalApp,
};

export default function WindowManager() {
  const [windows, setWindows] =
    useState([]);

  const openApp = (appId) => {
    const app = APP_META[appId];

    if (!app) return;

    const Component =
      APP_COMPONENTS[appId];

    if (!Component) return;

    const alreadyOpen =
      windows.find(
        (window) =>
          window.appId === appId
      );

    if (alreadyOpen) return;

    setWindows((prev) => [
      ...prev,
      {
        id: Date.now(),
        appId,
        title: app.title,
        icon: app.icon,
        component: Component,
        zIndex: Date.now(),
        isMinimized: false,
        isMaximized: false,
      },
    ]);
  };

  const openFolder = (
    folder
  ) => {
    setWindows((prev) => [
      ...prev,
      {
        id: Date.now(),
        appId: `folder-${folder.id}`,
        title: folder.name,
        icon: "📁",
        zIndex: Date.now(),
        isMinimized: false,
        isMaximized: false,
        component: () => (
          <FolderApp
            folderName={
              folder.name
            }
          />
        ),
      },
    ]);
  };

  const closeWindow = (
    windowId
  ) => {
    setWindows((prev) =>
      prev.filter(
        (window) =>
          window.id !== windowId
      )
    );
  };

  const focusWindow = (
    windowId
  ) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === windowId
          ? {
              ...window,
              zIndex:
                Date.now(),
            }
          : window
      )
    );
  };

  const minimizeWindow = (
    windowId
  ) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === windowId
          ? {
              ...window,
              isMinimized: true,
            }
          : window
      )
    );
  };

  const restoreWindow = (
    windowId
  ) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === windowId
          ? {
              ...window,
              isMinimized: false,
              zIndex:
                Date.now(),
            }
          : window
      )
    );
  };

  const toggleMaximizeWindow = (
    windowId
  ) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === windowId
          ? {
              ...window,
              isMaximized:
                !window.isMaximized,
            }
          : window
      )
    );
  };

  return {
    windows,
    openApp,
    openFolder,
    closeWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    toggleMaximizeWindow,
  };
}