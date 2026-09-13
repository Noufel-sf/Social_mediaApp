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
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
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
      toast.success(`Welcome back, ${user.username}!`);

      useAuthStates.getState().setCurrentUser(user);
      queryClient.setQueryData(["CurrentUser"], user);

      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleQuickLogin = (username: string) => {
    setValue("username", username);
    setValue("password", "password123");
    onSubmit({ username, password: "password123" });
  };

  return (
    <div className="flex flex-col w-[90%] lg:w-1/2 items-center justify-center min-h-screen">
      <div className="w-full p-5 md:p-12 space-y-6 rounded-lg">
        <div>
          <h1 className="text-5xl font-bold text-center mb-2 text-white">Login</h1>
          <div className="flex items-center justify-center">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 text-xs rounded-full font-medium">
              ✨ 100% Client-Side Mock Active
            </span>
          </div>
        </div>

        {generalError && (
          <p className="mb-4 text-red-500 text-sm text-center">{generalError}</p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email / Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              {...register("username")}
              className="mt-1 w-full px-4 py-2.5 text-lg text-white bg-gray-700/80 border border-gray-600 rounded-lg outline-none shadow-sm focus:border-blue-500 transition"
            />
            {errors.username && (
              <p className="text-sm text-red-400 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="mt-1 block w-full px-4 py-2.5 text-lg text-white rounded-lg outline-none bg-gray-700/80 border border-gray-600 focus:border-blue-500 transition"
            />
            {errors.password && (
              <p className="text-sm text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 flex justify-center bg-[var(--primary-color)] hover:opacity-90 px-4 border border-transparent cursor-pointer rounded-lg shadow-sm text-base font-semibold text-white transition disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Quick Demo Accounts */}
        <div className="pt-2 border-t border-gray-700/60">
          <p className="text-xs text-gray-400 mb-2.5 text-center">
            Click to test with demo accounts:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={() => handleQuickLogin("Noufel")}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-xs text-gray-200 rounded-full border border-gray-600 transition cursor-pointer"
            >
              👤 Noufel (Main)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("Edem Quist")}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-xs text-gray-200 rounded-full border border-gray-600 transition cursor-pointer"
            >
              👤 Edem Quist
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("Franca Delia")}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-xs text-gray-200 rounded-full border border-gray-600 transition cursor-pointer"
            >
              👤 Franca Delia
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-red-400 hover:text-red-300 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
