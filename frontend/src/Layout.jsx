import { Outlet, Link } from "react-router-dom";
import Logo from "./assets/Logo.svg";

const Layout = () => {
  return (
    <div className="bg-black flex flex-col justify-center items-center">
      <Link to="/" className="flex justify-center items-center">
        <img src={Logo} alt="logo" className="w-10 h-10" />
        <h1 className="text-white justify-center text-7xl">Emotify</h1>
      </Link>
      <Outlet />
    </div>
  );
};

export default Layout;
