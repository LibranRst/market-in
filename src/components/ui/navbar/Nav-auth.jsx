import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { buttonVariants } from '../Button';
import Spinner from '../loading/Spinner';
import ProductsCart from '../product/Products-Cart';

const NavAuth = ({ isLoading }) => {
  return (
    <>
      <div className="flex items-center gap-1">
        {isLoading ? (
          <Spinner padding={2} className="h-4 w-4" />
        ) : (
          <ProductsCart />
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
