export default function ContextMenu({
  x,
  y,
  onClose,
  onCreateFolder,
  onWallpaperChange,
}) {
  return (
    <div
      style={{
        left: x,
        top: y,
      }}
      className="
      absolute
      z-50
      w-56
      bg-slate-900
      border
      border-slate-700
      rounded-xl
      shadow-2xl
      overflow-hidden
      "
    >
      <button
        className="
        w-full
        px-4
        py-3
        text-left
        text-white
        hover:bg-slate-800
        "
      >
        🔄 Refresh
      </button>

      <button
        onClick={() => {
          onCreateFolder();
          onClose();
        }}
        className="
        w-full
        px-4
        py-3
        text-left
        text-white
        hover:bg-slate-800
        "
      >
        📁 New Folder
      </button>

      <button
        onClick={() => {
          const choice = prompt(
            "default, ocean, sunset, forest, purple"
          );

          if (choice) {
            onWallpaperChange(
              choice
            );
          }

          onClose();
        }}
        className="
        w-full
        px-4
        py-3
        text-left
        text-white
        hover:bg-slate-800
        "
      >
        🖼 Change Wallpaper
      </button>

      <button
        onClick={onClose}
        className="
        w-full
        px-4
        py-3
        text-left
        text-white
        hover:bg-slate-800
        "
      >
        ❌ Close Menu
      </button>
    </div>
  );
}