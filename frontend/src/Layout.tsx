import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Homepage";
import AuthLayout from "./Utils/AuthLayout";
import LoginForm from "./Pages/LoginForm";
import SignupForm from "./Pages/SignupForm";
import UserProfilePage from "./Pages/UserProfilepage";
import MessagingPage from "./Pages/MessagingPage";
import { useTheme } from "./Contexts/DarkModeContext";
import { useAuthStates } from "./ZustandStates/AuthStates";
import { useLocation, useNavigate } from "react-router-dom";




export default function Layout() {
  const { theme } = useTheme();
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
      navigate("/login");
    }

    if (CurrentUser && isAuthPage) {
      navigate("/");
    }
  }, [CurrentUser, loading, location.pathname, navigate]);

  return (
    <main
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-[var(--dark-bg)]" : "bg-[#fafafa]"
      }`}
    >
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
