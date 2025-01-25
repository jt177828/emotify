import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className='bg-black flex flex-col justify-center items-center'>
      <h1 className='text-white justify-center text-7xl'>Emotify</h1>
        <Outlet />
    </div>
  )
};

export default Layout;