import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex h-full w-full justify-center px-2">
          <div className="mt-5 w-full max-w-[1200px]">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
