import { Outlet} from "react-router-dom";

export default function AuthLayout() {
  

  return (
 
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
  );
}
