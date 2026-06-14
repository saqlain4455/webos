import { useState } from "react";
import { useTheme } from "../Context/themeContext";
import { APP_META } from "../Constants/appRegisry.jsx";

export default function DesktopIcons({
  onOpenApp,
  folders = [],
  onOpenFolder,
  onRenameFolder,
  onDeleteFolder,
}) {
  const [folderMenu, setFolderMenu] =
    useState(null);

  const [editingFolder, setEditingFolder] =
    useState(null);

  const [editValue, setEditValue] =
    useState("");

  const { isDark } =
    useTheme();

  return (
    <>
      <div
        className="
        absolute
        top-5
        left-5
        grid
        grid-cols-2
        gap-6
        z-50
        "
      >
        {/* Apps */}

        {Object.values(APP_META).map(
          (app) => (
            <button
              key={app.id}
              onDoubleClick={() =>
                onOpenApp(app.id)
              }
              className="
              flex
              flex-col
              items-center
              gap-2
              p-2
              rounded-xl
              hover:bg-white/10
              transition
              w-24
              "
            >
              <span className="text-5xl">
                {app.icon}
              </span>

              <span
                className={`
                text-xs
                text-center
                ${
                  isDark
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                {app.title}
              </span>
            </button>
          )
        )}

        {/* Folders */}

        {folders.map((folder) => (
          <button
            key={folder.id}
            onDoubleClick={() =>
              onOpenFolder(folder)
            }
            onContextMenu={(e) => {
              e.preventDefault();

              setFolderMenu({
                x: e.clientX,
                y: e.clientY,
                folder,
              });
            }}
            className="
            flex
            flex-col
            items-center
            gap-2
            p-2
            rounded-xl
            hover:bg-white/10
            transition
            w-24
            "
          >
            <span className="text-5xl">
              📁
            </span>

            {editingFolder ===
            folder.id ? (
              <input
                value={editValue}
                autoFocus
                onChange={(e) =>
                  setEditValue(
                    e.target.value
                  )
                }
                onBlur={() => {
                  if (
                    editValue.trim()
                  ) {
                    onRenameFolder(
                      folder.id,
                      editValue
                    );
                  }

                  setEditingFolder(
                    null
                  );
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    if (
                      editValue.trim()
                    ) {
                      onRenameFolder(
                        folder.id,
                        editValue
                      );
                    }

                    setEditingFolder(
                      null
                    );
                  }
                }}
                className={`
                text-xs
                text-center
                rounded
                px-1
                w-full
                outline-none
                ${
                  isDark
                    ? "bg-slate-800 text-white"
                    : "bg-white text-black border border-slate-300"
                }
                `}
              />
            ) : (
              <span
                className={`
                text-xs
                text-center
                ${
                  isDark
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                {folder.name}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Folder Context Menu */}

      {folderMenu && (
        <div
          style={{
            left: folderMenu.x,
            top: folderMenu.y,
          }}
          className={`
          absolute
          z-[999]
          rounded-lg
          overflow-hidden
          shadow-xl
          border
          ${
            isDark
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-300"
          }
          `}
        >
          <button
            onClick={() => {
              setEditingFolder(
                folderMenu.folder.id
              );

              setEditValue(
                folderMenu.folder.name
              );

              setFolderMenu(null);
            }}
            className={`
            block
            w-full
            px-4
            py-2
            text-left
            ${
              isDark
                ? "text-white hover:bg-slate-800"
                : "text-black hover:bg-slate-100"
            }
            `}
          >
            ✏️ Rename
          </button>

          <button
            onClick={() => {
              const confirmed =
                window.confirm(
                  `Delete ${folderMenu.folder.name}?`
                );

              if (confirmed) {
                onDeleteFolder(
                  folderMenu.folder.id
                );
              }

              setFolderMenu(null);
            }}
            className="
            block
            w-full
            px-4
            py-2
            text-left
            text-red-500
            hover:bg-slate-100
            "
          >
            🗑 Delete
          </button>
        </div>
      )}
    </>
  );
}