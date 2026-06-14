import { useState } from "react";

export default function LoginScreen() {
  const [password, setPassword] =
    useState("");

  return (
    <div
      className="
      h-screen
      w-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-slate-800
      flex
      items-center
      justify-center
    "
    >
      <div
        className="
        w-96
        bg-slate-900/80
        backdrop-blur-lg
        border
        border-slate-700
        rounded-3xl
        p-8
        shadow-2xl
      "
      >
        <div className="flex justify-center mb-6">
          <div
            className="
            h-20
            w-20
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-purple-500
            flex
            items-center
            justify-center
            text-3xl
          "
          >
            👤
          </div>
        </div>

        <h1
          className="
          text-center
          text-white
          text-3xl
          font-bold
          mb-2
        "
        >
          WebOS
        </h1>

        <p
          className="
          text-center
          text-slate-400
          mb-6
        "
        >
          Welcome Back
        </p>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          px-4
          py-3
          rounded-xl
          bg-slate-800
          border
          border-slate-700
          text-white
          outline-none
          mb-4
        "
        />

        <button
          className="
          w-full
          py-3
          rounded-xl
          bg-cyan-600
          hover:bg-cyan-500
          transition
          text-white
          font-semibold
        "
        >
          Sign In
        </button>
      </div>
    </div>
  );
}