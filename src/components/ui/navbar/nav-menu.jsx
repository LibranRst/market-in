import { useUser } from '../../../hooks/auth/useUser';
import NavAuth from './nav-auth';
import NavUser from './nav-user';

const NavMenu = () => {
  const { user, isAuthenticated, isLoading } = useUser();

  return (
    <div className="flex items-center gap-5">
      {isAuthenticated ? (
        <NavUser user={user} />
      ) : (
        <NavAuth isLoading={isLoading} />
      )}
    </div>
  );
};

export default NavMenu;
