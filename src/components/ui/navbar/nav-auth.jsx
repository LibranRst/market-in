import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Spinner from '../loading/Spinner';
import { cn } from '../../../lib/utils';
import { buttonVariants } from '../Button';

const NavAuth = ({ isLoading }) => {
  return (
    <>
      <div className="flex items-center gap-1">
        {isLoading ? (
          <Spinner padding={2} className="h-4 w-4" />
        ) : (
          <button className="rounded-lg p-2 text-popover-foreground transition-colors hover:bg-accent">
            <FiShoppingCart size={20} />
          </button>
        )}
      </div>
      <div className="h-[20px] rounded-lg bg-gray-200 p-[1px]" />
      {isLoading ? (
        <Spinner padding={2} className="h-4 w-4" />
      ) : (
        <Link
          to="/signin"
          className={cn(
            buttonVariants({ size: 'sm' }),
            'border-[1px] border-popover-foreground bg-popover-foreground hover:bg-popover hover:text-popover-foreground',
          )}
        >
          SignIn
        </Link>
      )}
    </>
  );
};

export default NavAuth;
