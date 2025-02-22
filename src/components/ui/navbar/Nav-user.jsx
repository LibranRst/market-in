import Spinner from '../loading/Spinner';
import Notification from '../notification/Notification';
import ProductsCart from '../product/Products-Cart';
import UserDropdown from './User-dropdown';

const NavUser = ({ user, isLoading }) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <ProductsCart />
        <Notification />
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
