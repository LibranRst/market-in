import { useUser } from '../../../hooks/auth/useUser';
import NavAuth from './Nav-auth';
import NavUser from './Nav-user';

const NavMenu = () => {
  const { user, isAuthenticated, isLoading } = useUser();

  return (
    <div className="flex items-center gap-5">
      {isAuthenticated ? (
        <NavUser user={user} isLoading={isLoading} />
      ) : (
        <NavAuth isLoading={isLoading} />
      )}
    </div>
  );
};

export default NavMenu;
