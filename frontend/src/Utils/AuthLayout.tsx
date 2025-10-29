import { Outlet, Navigate } from "react-router-dom";

// import { useUserContext } from "@/context/AuthContext";

export default function AuthLayout() {
//   const { isAuthenticated } = useUserContext();

  return (
    <>
      
      {/* isAuthenticated ? (
        <Navigate to="/" /> */}
      {/* ) : ( */}
        <>
          <section className="flex flex-1 bg-black justify-center items-center flex-col ">
            <Outlet />
          </section>

          <img
            src="/authphoto2.svg"
            alt="logo"
            className="hidden xl:block h-screen   bg-no-repeat"
          />
        </>
      {/* )} */}
    </>
  );
}
