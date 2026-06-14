import useClock from "../hooks/useClock";

export default function ClockApp() {
  const time = useClock();

  return (
    <div
      className="
      h-full
      flex
      flex-col
      items-center
      justify-center
      text-white
      "
    >
      <div className="text-7xl mb-4">
        🕒
      </div>

      <div
        className="
        text-5xl
        font-bold
        "
      >
        {time.toLocaleTimeString()}
      </div>

      <div
        className="
        mt-4
        text-slate-400
        text-xl
        "
      >
        {time.toDateString()}
      </div>
    </div>
  );
}