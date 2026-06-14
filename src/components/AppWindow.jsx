import { useState } from "react";
import { useTheme } from "../Context/themeContext";

export default function AppWindow({
  title,
  icon,
  children,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  isMaximized,
  zIndex,
}) {
  const [position, setPosition] =
    useState({
      x: 120,
      y: 80,
    });

  const [size, setSize] =
    useState({
      width: 700,
      height: 500,
    });

  const { isDark } =
    useTheme();

  const handleDragStart = (e) => {
    if (isMaximized) return;

    const startX = e.clientX;
    const startY = e.clientY;

    const initialX = position.x;
    const initialY = position.y;

    const handleMouseMove = (
      moveEvent
    ) => {
      setPosition({
        x:
          initialX +
          (moveEvent.clientX -
            startX),
        y:
          initialY +
          (moveEvent.clientY -
            startY),
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();

    if (isMaximized) return;

    const startX = e.clientX;
    const startY = e.clientY;

    const startWidth =
      size.width;

    const startHeight =
      size.height;

    const handleMouseMove = (
      moveEvent
    ) => {
      setSize({
        width: Math.max(
          300,
          startWidth +
            (moveEvent.clientX -
              startX)
        ),
        height: Math.max(
          200,
          startHeight +
            (moveEvent.clientY -
              startY)
        ),
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );
  };

  return (
    <div
      onMouseDown={onFocus}
      style={
        isMaximized
          ? {
              left: 0,
              top: 0,
              width: "100vw",
              height:
                "calc(100vh - 56px)",
              zIndex,
            }
          : {
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
              zIndex,
            }
      }
      className={`
      absolute
      border
      rounded-2xl
      shadow-2xl
      overflow-hidden
      ${
        isDark
          ? "bg-slate-900 border-slate-700"
          : "bg-white border-slate-300"
      }
      `}
    >
      <div
        onMouseDown={
          handleDragStart
        }
        className={`
        h-12
        border-b
        flex
        items-center
        justify-between
        px-4
        cursor-move
        ${
          isDark
            ? "bg-slate-800 border-slate-700"
            : "bg-slate-100 border-slate-300"
        }
        `}
      >
        <div
          className={`
          flex
          items-center
          gap-2
          ${
            isDark
              ? "text-white"
              : "text-black"
          }
          `}
        >
          <span>{icon}</span>
          <span>{title}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onMinimize}
            className="
            w-8
            h-8
            rounded-lg
            bg-yellow-600
            hover:bg-yellow-500
            text-white
            "
          >
            —
          </button>

          <button
            onClick={onMaximize}
            className="
            w-8
            h-8
            rounded-lg
            bg-green-600
            hover:bg-green-500
            text-white
            "
          >
            □
          </button>

          <button
            onClick={onClose}
            className="
            w-8
            h-8
            rounded-lg
            bg-red-600
            hover:bg-red-500
            text-white
            "
          >
            ✕
          </button>
        </div>
      </div>

      <div
        className={`
        h-[calc(100%-48px)]
        overflow-auto
        ${
          isDark
            ? "text-white"
            : "text-black"
        }
        `}
      >
        {children}
      </div>

      <div
        onMouseDown={
          handleResizeStart
        }
        className="
        absolute
        bottom-0
        right-0
        w-5
        h-5
        cursor-se-resize
        flex
        items-center
        justify-center
        text-slate-400
        select-none
        "
      >
        ◢
      </div>
    </div>
  );
}