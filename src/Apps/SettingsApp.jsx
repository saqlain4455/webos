import { useTheme } from "../Context/themeContext";

export default function SettingsApp() {
  const {
    isDark,
    setIsDark,
  } = useTheme();

  return (
    <div className="p-6">
      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        ⚙️ Settings
      </h1>

      <div
        className={`
        rounded-xl
        p-6
        ${
          isDark
            ? "bg-slate-800"
            : "bg-slate-200"
        }
        `}
      >
        <h2
          className="
          text-xl
          mb-4
          "
        >
          Theme
        </h2>

        <div
          className="
          flex
          gap-4
          "
        >
          <button
            onClick={() =>
              setIsDark(false)
            }
            className={`
            px-4
            py-2
            rounded-lg
            ${
              !isDark
                ? "bg-cyan-600 text-white"
                : "bg-slate-500 text-white"
            }
            `}
          >
            ☀️ Light
          </button>

          <button
            onClick={() =>
              setIsDark(true)
            }
            className={`
            px-4
            py-2
            rounded-lg
            ${
              isDark
                ? "bg-cyan-600 text-white"
                : "bg-slate-500 text-white"
            }
            `}
          >
            🌙 Dark
          </button>
        </div>

        <div className="mt-6">
          Current Theme:
          <span className="ml-2 font-bold">
            {isDark
              ? "Dark"
              : "Light"}
          </span>
        </div>
      </div>
    </div>
  );
}