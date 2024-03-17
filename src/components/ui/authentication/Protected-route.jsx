import { Navigate } from 'react-router-dom';
import { useUser } from '../../../hooks/auth/useUser';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
