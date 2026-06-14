import { useState } from "react";
import useFileSystem from "../hooks/useFileSystem";

export default function TerminalApp() {
  const [history, setHistory] =
    useState([
      "Welcome to WebOS Terminal",
      "Type help to begin",
    ]);

  const [command, setCommand] =
    useState("");

  const [
    fileSystem,
    setFileSystem,
  ] = useFileSystem();

  const [
    currentFolder,
    setCurrentFolder,
  ] = useState("Home");

  const executeCommand = () => {
    let output = "";

    const parts =
      command.trim().split(" ");

    const cmd =
      parts[0]?.toLowerCase();

    const arg =
      parts.slice(1).join(" ");

    switch (cmd) {
      case "help":
        output =
          "Commands: help, about, date, clear, ls, pwd, mkdir, touch";
        break;

      case "about":
        output =
          "WebOS v1.0 built with React";
        break;

      case "date":
        output =
          new Date().toString();
        break;

      case "pwd":
        output =
          currentFolder;
        break;

      case "ls":
        output = fileSystem[
          currentFolder
        ]
          ?.map(
            (item) =>
              item.name
          )
          .join(" | ");
        break;

      case "mkdir":
        if (!arg) {
          output =
            "Usage: mkdir <folder>";
          break;
        }

        setFileSystem(
          (prev) => ({
            ...prev,
            [currentFolder]: [
              ...prev[
                currentFolder
              ],
              {
                name: arg,
                type: "folder",
              },
            ],
            [arg]: [],
          })
        );

        output =
          `Folder created: ${arg}`;

        break;

      case "touch":
        if (!arg) {
          output =
            "Usage: touch <filename>";
          break;
        }

        setFileSystem(
          (prev) => ({
            ...prev,
            [currentFolder]: [
              ...prev[
                currentFolder
              ],
              {
                name: arg,
                type: "txt",
              },
            ],
          })
        );

        output =
          `File created: ${arg}`;

        break;

      case "clear":
        setHistory([]);
        setCommand("");
        return;

      default:
        output =
          `Unknown command: ${command}`;
    }

    setHistory((prev) => [
      ...prev,
      `> ${command}`,
      output,
    ]);

    setCommand("");
  };

  return (
    <div
      className="
      h-full
      bg-black
      text-green-400
      font-mono
      p-4
      flex
      flex-col
      "
    >
      <div className="flex-1 overflow-auto">
        {history.map(
          (line, index) => (
            <div key={index}>
              {line}
            </div>
          )
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <span>{">"}</span>

        <input
          autoFocus
          value={command}
          onChange={(e) =>
            setCommand(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              executeCommand();
            }
          }}
          className="
          flex-1
          bg-black
          text-green-400
          outline-none
          px-2
          "
        />
      </div>
    </div>
  );
}