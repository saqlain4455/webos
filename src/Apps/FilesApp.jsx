import { useState } from "react";

import useFileSystem
from "../hooks/useFileSystem";

import {
  FILE_ICONS,
} from "../Constants/Filesysystem.jsx";

export default function FilesApp() {
  const [
    fileSystem,
    setFileSystem,
  ] = useFileSystem();

  const [
    currentFolder,
    setCurrentFolder,
  ] = useState("Home");

  const files =
    fileSystem[
      currentFolder
    ] || [];

  const createFile = () => {
    const name = prompt(
      "File name"
    );

    if (!name) return;
setFileSystem((prev) => ({
  ...prev,
  [currentFolder]:
    prev[currentFolder].filter(
      (item) =>
        item.name !== file.name
    ),
}));
  };

  const createFolder = () => {
    const name = prompt(
      "Folder name"
    );

    if (!name) return;

    setFileSystem((prev) => ({
      ...prev,
      [currentFolder]: [
        ...prev[currentFolder],
        {
          name,
          type: "folder",
        },
      ],
      [name]: [],
    }));
  };

  return (
    <div className="p-4">
      <div
        className="
        flex
        items-center
        justify-between
        mb-4
        "
      >
        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          {currentFolder !==
            "Home" && (
            <button
              onClick={() =>
                setCurrentFolder(
                  "Home"
                )
              }
              className="
              px-3
              py-1
              bg-slate-700
              rounded-lg
              "
            >
              ← Back
            </button>
          )}

          <h2
            className="
            text-2xl
            font-bold
            "
          >
            {currentFolder}
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={
              createFile
            }
            className="
            px-3
            py-2
            bg-green-600
            rounded-lg
            hover:bg-green-500
            "
          >
            + File
          </button>

          <button
            onClick={
              createFolder
            }
            className="
            px-3
            py-2
            bg-blue-600
            rounded-lg
            hover:bg-blue-500
            "
          >
            + Folder
          </button>
        </div>
      </div>

      <div
        className="
        grid
        grid-cols-4
        gap-4
        "
      >
        {files.map((file) => (
          <div
            key={file.name}
            onDoubleClick={() => {
              if (
                file.type ===
                  "folder" &&
                fileSystem[
                  file.name
                ]
              ) {
                setCurrentFolder(
                  file.name
                );
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault();

              const confirmed =
                window.confirm(
                  `Delete ${file.name}?`
                );

              if (
                !confirmed
              )
                return;

              setFileSystem(
                (prev) => ({
                  ...prev,
                  [currentFolder]:
                    prev[
                      currentFolder
                    ].filter(
                      (
                        item
                      ) =>
                        item.name !==
                        file.name
                    ),
                })
              );
            }}
            className="
            bg-slate-800
            rounded-xl
            p-4
            text-center
            hover:bg-slate-700
            cursor-pointer
            "
          >
            <div className="text-4xl">
              {
                FILE_ICONS[
                  file.type
                ]
              }
            </div>

            <div className="mt-2">
              {file.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}