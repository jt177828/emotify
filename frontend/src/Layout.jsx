import { Outlet, Link } from "react-router-dom";
import Logo from "./assets/Logo.svg";

const Layout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link to="/" className="flex justify-center items-center">
        <button className='text-white px-4 py-4'>Login with Spotify</button>
        <img src={Logo} alt="logo" className="w-20 h-20" />
        <h1 className="text-white justify-center text-7xl">EmoTify.</h1>
      </Link>
      <Outlet />
    </div>
  );
};

export default Layout;
