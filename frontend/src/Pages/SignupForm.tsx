import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../Utils/ZodSchemas";
import { api } from "../Utils/api";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthStates } from "../ZustandStates/AuthStates";

export default function SignupForm() {
  type SignupInput = z.infer<typeof signupSchema>;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });


  const onSubmit = async (data: SignupInput) => {
    try {
      console.log("Sending signup data:", data);
      const res = await api.post("/auth/register", data);
      useAuthStates.getState().setCurrentUser(res.data); // Set user state after successful signup
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Signup failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Signup failed. Try again.");      
    }
  };


  return (
    <div className="flex flex-col w-full max-w-md mx-auto items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-2xl shadow-md mb-3">
            C
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
            Create an Account
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Join CozMeet to connect and share moments
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-700 bg-zinc-800/80 text-zinc-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition placeholder-zinc-500"
              placeholder="e.g. john_doe"
            />
            {errors.username && (
              <p className="text-xs text-rose-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-700 bg-zinc-800/80 text-zinc-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition placeholder-zinc-500"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Nickname */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Display Name
            </label>
            <input
              id="name"
              type="text"
              {...register("nickname")}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-700 bg-zinc-800/80 text-zinc-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition placeholder-zinc-500"
              placeholder="e.g. John Doe"
            />
            {errors.nickname && (
              <p className="text-xs text-rose-500 mt-1">{errors.nickname.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-700 bg-zinc-800/80 text-zinc-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition placeholder-zinc-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
          <p className="text-xs text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
