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
    <div className="flex flex-col w-[90%] md:w-1/2 items-center justify-center min-h-screen">
      <div className="w-full p-5 md:p-12 space-y-8 rounded-lg">
        <h1 className="text-6xl font-bold text-center mb-3 text-white capitalize">
          Sign up
        </h1>

        <form
          className="space-y-3 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          
          {/* Username */}
          <div>
            <label htmlFor="username" className="block capitalize text-sm font-medium text-white">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className="mt-1 block w-full px-5 py-3 text-white rounded-md outline-none bg-gray-600"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="mt-1 block w-full px-5 py-3 text-white rounded-md outline-none bg-gray-600"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Nickname */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Nickname
            </label>
            <input
              id="name"
              type="text"
              {...register("nickname")}
              className="mt-1 block w-full px-5 py-3 text-white rounded-md outline-none bg-gray-600"
            />
            {errors.nickname && (
              <p className="text-sm text-red-600 mt-1">{errors.nickname.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
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
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full text-white bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] rounded-lg font-bold cursor-pointer py-2"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="mt-2 text-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-red-600 hover:text-red-500 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
