import { useState } from "react";
import { APP_META } from "../Constants/appRegisry.jsx";

export default function StartMenu({
  onOpenApp,
}) {
  const [search, setSearch] =
    useState("");

  const filteredApps =
    Object.values(APP_META).filter(
      (app) =>
        app.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div
      className="
      absolute
      bottom-16
      left-4
      w-80
      rounded-2xl
      bg-slate-900
      border
      border-slate-700
      shadow-2xl
      p-4
      "
    >
      <h2
        className="
        text-white
        text-lg
        font-bold
        mb-4
        "
      >
        Applications
      </h2>

      <input
        type="text"
        placeholder="Search apps..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="
        w-full
        mb-4
        p-2
        rounded-lg
        bg-slate-800
        text-white
        outline-none
        border
        border-slate-700
        "
      />

      <div className="grid grid-cols-2 gap-2">
        {filteredApps.map(
          (app) => (
            <button
              key={app.id}
              onClick={() =>
                onOpenApp(app.id)
              }
              className="
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              bg-slate-800
              hover:bg-slate-700
              text-white
              "
            >
              <span>
                {app.icon}
              </span>

              <span>
                {app.title}
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
}