import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

// background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

const Layout = () => {
  return (
    <div className='min-h-screen bg-gradient-135 from-[#f5f7fa] to-[#c3cfe2]'>
      <Navbar />
      <div className="mt-2 w-full max-w-[1200px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
