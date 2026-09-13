import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Utils/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../Utils/ZodSchemas";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Lock, User as UserIcon } from "lucide-react";

type LoginInput = z.infer<typeof loginSchema>;

const DEMO_USERS = [
  {
    name: "Noufel",
    handle: "@noufel_dev",
    role: "Full-Stack Dev",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
  },
  {
    name: "Kenji Sato",
    handle: "@kenji_anime",
    role: "Deku / Manga Artist",
    avatar: "/midoriya.jpg",
  },
  {
    name: "Daniella Jackson",
    handle: "@dani_creative",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
  {
    name: "Aoi Tanaka",
    handle: "@aoi_tokyo",
    role: "Mobile Dev",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
  },
];

export default function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "Noufel",
      password: "password123",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setGeneralError(null);
      const res = await api.post("/auth/login", data, { withCredentials: true });
      const user = res.data.user;

      useAuthStates.getState().setCurrentUser(user);
      queryClient.setQueryData(["CurrentUser"], user);
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      toast.success(`Welcome back, ${user.username}! 🎉`);
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const msg = err.response?.data?.message || "Login failed. Try again.";
      setGeneralError(msg);
      toast.error(msg);
    }
  };

  const handleQuickLogin = (username: string) => {
    setValue("username", username);
    setValue("password", "password123");
    onSubmit({ username, password: "password123" });
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-all">
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-2xl shadow-md mb-3">
            C
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
            Welcome to CozMeet
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Sign in to explore the community & mock database
          </p>

       
        </div>

        {generalError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-medium text-center">
            {generalError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400"
            >
              Username / Email
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500 pointer-events-none" />
              <input
                id="username"
                type="text"
                autoComplete="username"
                {...register("username")}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-slate-900 dark:text-zinc-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                placeholder="Noufel"
              />
            </div>
            {errors.username && (
              <p className="text-xs text-rose-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500 pointer-events-none" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-slate-900 dark:text-zinc-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                placeholder="password123"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Entering app...</span>
            ) : (
              <>
                <span>Enter CozMeet</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick 1-Click Demo Accounts */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-zinc-800">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 text-center mb-3">
            Or Click to Enter as:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_USERS.map((user) => (
              <button
                key={user.name}
                type="button"
                onClick={() => handleQuickLogin(user.name)}
                className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50/70 dark:bg-zinc-800/40 hover:bg-indigo-50/50 dark:hover:bg-zinc-800 transition text-left cursor-pointer group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-zinc-700 flex-shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate text-slate-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-500 truncate">
                    {user.role}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-6 text-center text-xs text-slate-500 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Create an account
          </Link>
        </div> */}
      </div>
    </div>
  );
}
