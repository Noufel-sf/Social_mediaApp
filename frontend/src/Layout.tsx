import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Homepage";
import AuthLayout from "./Utils/AuthLayout";
import LoginForm from "./Pages/LoginForm";
import SignupForm from "./Pages/SignupForm";
import UserProfilePage from "./Pages/UserProfilepage";
import MessagingPage from "./Pages/MessagingPage";
import { useAuthStates } from "./ZustandStates/AuthStates";
import { useLocation, useNavigate } from "react-router-dom";




export default function Layout() {
  const { CurrentUser, loading, FetchCurrentUserData } = useAuthStates();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    FetchCurrentUserData();
  }, [FetchCurrentUserData]);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    if (!CurrentUser && !isAuthPage) {
      navigate("/login", { replace: true });
    }

    if (CurrentUser && isAuthPage) {
      navigate("/", { replace: true });
    }
  }, [CurrentUser, loading, location.pathname, navigate]);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  if (loading && !isAuthPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-zinc-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-2xl shadow-lg animate-pulse">
            C
          </div>
          <p className="text-xs font-semibold tracking-wide text-zinc-400">
            Entering CozMeet...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#09090b] text-zinc-100">
      <Routes>
        {/* authentication routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/userprofile/:id" element={<UserProfilePage />} />
        <Route path="/messages" element={<MessagingPage />} />
      </Routes>
      <Toaster position="top-center" />
    </main>
  );
}
