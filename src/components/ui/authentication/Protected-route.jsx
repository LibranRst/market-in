import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../../hooks/auth/useUser';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
