import { useState } from "react";

export default function BrowserApp() {
  const [url, setUrl] = useState(
    "https://www.google.com"
  );

  const [currentUrl, setCurrentUrl] =
    useState(
      "https://www.google.com"
    );

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}

      <div
        className="
        p-3
        bg-slate-800
        border-b
        border-slate-700
        flex
        gap-2
        "
      >
        <input
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          className="
          flex-1
          px-3
          py-2
          rounded-lg
          bg-slate-700
          text-white
          outline-none
          "
        />

        <button
          onClick={() =>
            setCurrentUrl(url)
          }
          className="
          px-4
          py-2
          bg-cyan-600
          rounded-lg
          text-white
          "
        >
          Go
        </button>
      </div>

      {/* Browser View */}

      <iframe
        title="browser"
        src={currentUrl}
        className="
        flex-1
        w-full
        bg-white
        "
      />
    </div>
  );
}