import useLocalStorage
from "../hooks/useLocalstorage";

export default function NotepadApp() {
  const [text, setText] =
    useLocalStorage(
      "webos-notepad",
      ""
    );

  return (
    <div className="h-full p-4">
      <textarea
        value={text}
        onChange={(e) =>
          setText(
            e.target.value
          )
        }
        placeholder="Start typing..."
        className="
        w-full
        h-full
        resize-none
        bg-slate-800
        border
        border-slate-700
        rounded-xl
        p-4
        text-white
        outline-none
        "
      />
    </div>
  );
}