import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../../hooks/auth/useUser';
import Spinner from '../loading/Spinner';

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="flex h-screen w-screen place-items-center justify-center">
        <Spinner className="h-10 w-10" />
      </div>
    );

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
