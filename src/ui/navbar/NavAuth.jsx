import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Spinner from '../loading/Spinner';

const NavAuth = ({ isLoading }) => {
  return (
    <>
      <div className="flex items-center gap-1">
        {isLoading ? (
          <Spinner padding={2} />
        ) : (
          <button className="rounded-lg p-2 transition-colors hover:bg-gray-200">
            <FiShoppingCart size={20} />
          </button>
        )}
      </div>
      <div className="h-[20px] rounded-lg bg-gray-200 p-[1px]" />
      {isLoading ? (
        <Spinner padding={2} />
      ) : (
        <Link
          to="/signin"
          className="rounded-full border border-transparent bg-black px-4 py-1 text-white transition-all hover:border-black hover:bg-white hover:text-black"
        >
          SignIn
        </Link>
      )}
    </>
  );
};

export default NavAuth;
