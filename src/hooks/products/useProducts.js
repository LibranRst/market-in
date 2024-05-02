import { useQuery } from '@tanstack/react-query';
import {
  getCartProducts,
  getProducts,
  getUserProducts,
} from '../../services/apiProducts';
import { useUser } from '../auth/useUser';

export const useProducts = () => {
  const {
    isLoading,
    isFetching,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return { isLoading, isFetching, products, error };
};

export const useUserProducts = () => {
  const { user } = useUser();
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products', user?.id],
    queryFn: () => getUserProducts(user?.id),
  });

  return { isLoading, products, error };
};

export const useCartProducts = ({ list = 'all' }) => {
  const { user } = useUser();

  const {
    data: cartProducts,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['cartProducts', user?.id, list],
    queryFn: () => getCartProducts({ userId: user?.id, list }),
    gcTime: 0,
  });

  return { cartProducts, isLoading, isFetching };
};
