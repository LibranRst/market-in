import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const Footer = () => {
  return (
    <div className="mt-40 flex justify-center border-t bg-background p-10">
      <div className="w-full max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="mb-5">
              <Logo />
            </h3>
            <p className="text-sm text-gray-500">
              marketIn is a cutting-edge e-commerce platform designed to
              revolutionize the online shopping experience. Our website offers a
              vast and diverse range of products, catering to the ever-evolving
              needs of modern consumers.
            </p>
          </div>
          <div>
            <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>
            <ul className="text-sm text-gray-500">
              <li className="mb-2 transition-colors hover:text-primary">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2 transition-colors hover:text-primary">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="mb-2 transition-colors hover:text-primary">
                <Link to="/account">Account</Link>
              </li>
              <li className="mb-2 transition-colors hover:text-primary">
                <Link to="/orders">Orders</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-lg font-semibold">Contact</h3>
            <p className="text-sm text-gray-500">
              Email: libran.dev7@gmail.com
              <br />
              Phone: 0851 - 6176 - 0847
            </p>
            <div className="mt-5 flex space-x-4">
              <Link
                to="https://www.facebook.com/HyuzinKyle"
                className="text-gray-500 transition-colors hover:text-primary"
              >
                <FaFacebook />
              </Link>
              <Link
                to="https://x.com/librandev_"
                className="text-gray-500 transition-colors hover:text-primary"
              >
                <FaTwitter />
              </Link>
              <Link
                to="https://www.instagram.com/libranrst/"
                className="text-gray-500 transition-colors hover:text-primary"
              >
                <FaInstagram />
              </Link>
              <Link
                to="https://www.linkedin.com/in/m-libran-restu-wibawa-1a0505273/"
                className="text-gray-500 transition-colors hover:text-primary"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-5 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Market-In. All rights reserved.
            Developed by LibranDev.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
