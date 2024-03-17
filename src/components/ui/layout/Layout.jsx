import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto mt-5 w-full max-w-[1200px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
