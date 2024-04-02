import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { Toaster } from '../Toaster';

const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto mt-5 w-full max-w-[1200px]">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default RootLayout;
