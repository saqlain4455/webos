import { useState } from "react";

import { ThemeProvider } from "./Context/themeContext";
import useLocalStorage from "./hooks/useLocalstorage";

import LoginScreen from "./components/LoginScreen";
import DesktopIcons from "./components/DesktopIcons";
import Taskbar from "./components/Taskbar";
import StartMenu from "./components/StartMenu";
import WindowManager from "./components/WindowManager";
import AppWindow from "./components/AppWindow";
import ContextMenu from "./components/ContextMenu";
import { WALLPAPERS } from "./Constants/wallpapers.jsx";
export default function WebOS() {
  const [isDark, setIsDark] =
    useLocalStorage("webos-theme", true);

  const [loggedIn] = useState(true);

  const [showStart, setShowStart] =
    useState(false);

  const [contextMenu, setContextMenu] =
    useState(null);

  const [desktopFolders, setDesktopFolders] =
  useLocalStorage(
    "webos-desktop-folders",
    []
  );
const [wallpaper, setWallpaper] =
  useLocalStorage(
    "webos-wallpaper",
    "default"
  );
const {
  windows,
  openApp,
  openFolder,
  closeWindow,
  focusWindow,
  minimizeWindow,
  restoreWindow,
  toggleMaximizeWindow,
} = WindowManager();

  const renameFolder = (
  folderId,
  newName
) => {
  setDesktopFolders((prev) =>
    prev.map((folder) =>
      folder.id === folderId
        ? {
            ...folder,
            name: newName,
          }
        : folder
    )
  );
};

const deleteFolder = (folderId) => {
  setDesktopFolders((prev) =>
    prev.filter(
      (folder) =>
        folder.id !== folderId
    )
  );
};
  if (!loggedIn) {
    return <LoginScreen />;
  }

  return (
   <ThemeProvider
  value={{
    isDark,
    setIsDark,
    textColor: isDark
      ? "text-white"
      : "text-black",
  }}
>
 <div
  onContextMenu={(e) => {
    e.preventDefault();

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
  }}
  onClick={() =>
    setContextMenu(null)
  }
  className={`
  h-screen
  w-screen
  relative
  overflow-hidden
  ${
    isDark
      ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
      : "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-black"
  }
  `}
>
        {/* Desktop */}

  <DesktopIcons
  onOpenApp={openApp}
  folders={desktopFolders}
  onOpenFolder={openFolder}
  onRenameFolder={renameFolder}
  onDeleteFolder={deleteFolder}
/>

        {/* Start Menu */}

        {showStart && (
          <StartMenu
            onOpenApp={openApp}
          />
        )}

        {/* Windows */}

       {/* Windows */}

{/* Windows */}

{windows
  .filter(
    (window) =>
      !window.isMinimized
  )
  .map((window) => {
    const Component =
      window.component;

    return (
      <AppWindow
        key={window.id}
        title={window.title}
        icon={window.icon}
        zIndex={window.zIndex}
        isMaximized={
          window.isMaximized
        }
        onFocus={() =>
          focusWindow(window.id)
        }
        onMinimize={() =>
          minimizeWindow(window.id)
        }
        onMaximize={() =>
          toggleMaximizeWindow(
            window.id
          )
        }
        onClose={() =>
          closeWindow(window.id)
        }
      >
        {Component ? (
          <Component />
        ) : (
          <div className="p-6 text-red-500">
            Component Not Found
          </div>
        )}
      </AppWindow>
    );
  })}

        {/* Context Menu */}

        {contextMenu && (
         <ContextMenu
  x={contextMenu.x}
  y={contextMenu.y}
  onClose={() =>
    setContextMenu(null)
  }
  onWallpaperChange={
    setWallpaper
  }
  onCreateFolder={() => {
    setDesktopFolders(
      (prev) => [
        ...prev,
        {
          id: Date.now(),
          name: `New Folder ${
            prev.length + 1
          }`,
        },
      ]
    );
  }}
/>
        )}

        {/* Taskbar */}

  <Taskbar
  windows={windows}
  onRestoreWindow={
    restoreWindow
  }
  onFocusWindow={
    focusWindow
  }
  onStartClick={() =>
    setShowStart(!showStart)
  }
/>
      </div>
    </ThemeProvider>
  );
}