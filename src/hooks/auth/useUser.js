import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

// export const useUser = () => {
//   const [isSessionExist, setIsSessionExist] = useState(false);
//   const {
//     isLoading,
//     data: user,
//     isFetching,
//   } = useQuery({
//     queryKey: ['user'],
//     queryFn: getCurrentUser,
//   });

//   useEffect(() => {
//     if (
//       localStorage.getItem('cookieFallback') === '[]' ||
//       localStorage.getItem('cookieFallback') === null ||
//       localStorage.getItem('cookieFallback') === undefined
//     ) {
//       setIsSessionExist(false);
//     } else {
//       setIsSessionExist(true);
//     }
//   }, []);

//   const isAuthenticated = !!user || isSessionExist;

//   return {
//     isLoading,
//     isFetching,
//     user,
//     isAuthenticated,
//   };
// };

export const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === 'authenticated',
  };
};
