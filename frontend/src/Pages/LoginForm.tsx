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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

const onSubmit = async (data: LoginInput) => {
  try {
    setGeneralError(null);
    const res = await api.post("/auth/login", data, { withCredentials: true });

    const user = res.data.user; // ✅ The backend must send this
    toast.success("Login successful!");

    useAuthStates.getState().setCurrentUser(user);

    queryClient.setQueryData(["CurrentUser"], user);

    setTimeout(() => navigate("/"), 1100);
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    toast.error(err.response?.data?.message || "Login failed. Try again.");
  }
};


  return (
    <div className="flex flex-col w-[90%] lg:w-1/2 items-center justify-center min-h-screen">
      <div className="w-full p-5 md:p-12 space-y-8 rounded-lg">
        <h1 className="text-6xl font-bold text-center mb-4 text-white">Login</h1>

        {/* General error from backend */}
        {generalError && (
          <p className="mb-4 text-red-600 text-sm text-center">{generalError}</p>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              id="email"
              type="text"
              autoComplete="email"
              {...register("username")}
              className="mt-1 w-full px-5 py-3 text-xl text-white bg-gray-600 rounded-md outline-none shadow-sm"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">
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
              className="mt-1 block w-full px-5 py-3 text-white rounded-md outline-none bg-gray-600"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 flex justify-center bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] px-4 border border-transparent cursor-pointer rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-2 text-center">
          <p className="text-sm text-white">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-red-600 hover:text-red-500 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
