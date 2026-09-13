import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex w-full min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors">
      <section className="flex flex-1 justify-center items-center flex-col p-4">
        <Outlet />
      </section>

      <div className="hidden xl:flex items-center justify-center w-1/2 bg-gradient-to-br from-indigo-900/20 via-zinc-900 to-black p-12 border-l border-slate-200/50 dark:border-zinc-800">
        <img
          src="/authphoto2.svg"
          alt="CozMeet community illustration"
          className="max-h-[80vh] w-auto object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
