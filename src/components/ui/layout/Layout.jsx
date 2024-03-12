import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

// background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
// bg-gradient-135 from-[#f5f7fa] to-[#c3cfe2]

const Layout = () => {
  return (
    <div className="min-h-screen bg-background-gradient">
      <Navbar />
      <div className="mx-auto mt-2 w-full max-w-[1200px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
