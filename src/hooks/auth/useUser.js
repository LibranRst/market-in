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

  const cartProducts = user?.carts
    ?.map((cartProduct) => ({
      cartProductId: cartProduct.id,
      isChecked: cartProduct.isChecked,
      ...cartProduct.products,
      seller: cartProduct.products.profiles,
      quantity: cartProduct.quantity,
    }))
    .reverse();

  return {
    isLoading,
    user,
    cartProducts,
    isAuthenticated: user?.role === 'authenticated',
  };
};
