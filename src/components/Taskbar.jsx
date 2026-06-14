import useClock from "../hooks/useClock";
import { useTheme } from "../Context/themeContext";

export default function Taskbar({
  onStartClick,
  windows,
  onRestoreWindow,
  onFocusWindow,
}) {
  const now = useClock();

  const { isDark } =
    useTheme();

  return (
    <div
      className={`
      absolute
      bottom-0
      left-0
      right-0
      h-14
      backdrop-blur-lg
      border-t
      flex
      items-center
      justify-between
      px-4
      ${
        isDark
          ? "bg-slate-950/80 border-slate-700"
          : "bg-white/80 border-slate-300"
      }
      `}
    >
      {/* Left Side */}

      <div className="flex items-center gap-2">
        <button
          onClick={onStartClick}
          className="
          h-10
          px-4
          rounded-lg
          bg-cyan-600
          text-white
          hover:bg-cyan-500
          "
        >
          Start
        </button>

        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() => {
              if (
                window.isMinimized
              ) {
                onRestoreWindow(
                  window.id
                );
              }

              onFocusWindow(
                window.id
              );
            }}
            className={`
            h-10
            px-3
            rounded-lg
            flex
            items-center
            gap-2
            ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700 text-white"
                : "bg-slate-200 hover:bg-slate-300 text-black"
            }
            `}
          >
            <span>
              {window.icon}
            </span>

            <span>
              {window.title}
            </span>
          </button>
        ))}
      </div>

      {/* Clock */}

      <div
        className={`
        text-sm
        ${
          isDark
            ? "text-white"
            : "text-black"
        }
        `}
      >
        {now.toLocaleTimeString()}
      </div>
    </div>
  );
}