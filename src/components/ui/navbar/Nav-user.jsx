import { FiShoppingCart } from 'react-icons/fi';
import { GrNotification } from 'react-icons/gr';
import UserDropdown from './User-dropdown';
import Spinner from '../loading/Spinner';

const NavUser = ({ user, isLoading }) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <button className="rounded-lg p-2 transition-colors hover:bg-accent">
          <FiShoppingCart size={20} />
        </button>
        <button className="rounded-lg p-2 transition-colors hover:bg-accent">
          <GrNotification size={20} />
        </button>
      </div>
      <div className="h-[20px] w-[1px] rounded-lg bg-accent" />
      {isLoading ? (
        <Spinner padding={2} className="h-4 w-4" />
      ) : (
        <UserDropdown user={user} />
      )}
    </>
  );
};

export default NavUser;
