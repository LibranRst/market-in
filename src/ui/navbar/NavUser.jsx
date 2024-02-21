import { FiShoppingCart } from 'react-icons/fi';
import { GrNotification } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { useLogout } from '../../hooks/auth/useLogout';

const NavUser = ({ user }) => {
  const { logout } = useLogout();
  return (
    <>
      <div className="flex items-center gap-1">
        <button className="rounded-lg p-2 transition-colors hover:bg-gray-200">
          <FiShoppingCart size={20} />
        </button>
        <button className="rounded-lg p-2 transition-colors hover:bg-gray-200">
          <GrNotification size={20} />
        </button>
        <button
          className="rounded-lg p-2 transition-colors hover:bg-gray-200"
          onClick={logout}
        >
          <IoLogOutOutline size={20} />
        </button>
      </div>
      <div className="h-[20px] rounded-lg bg-gray-200 p-[1px]" />
      <Link
        to="/profile"
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm font-[500] transition-colors hover:bg-gray-100"
      >
        <img src="default-user.jpg" alt="user" className="w-8 rounded-full" />
        <p>{user?.user_metadata?.username}</p>
      </Link>
    </>
  );
};

export default NavUser;
