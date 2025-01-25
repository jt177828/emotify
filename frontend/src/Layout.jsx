import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <h1>Emotify</h1>
      <Outlet />
    </>
  )
};

export default Layout;
