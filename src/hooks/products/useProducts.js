import { useQuery } from '@tanstack/react-query';
import { getProducts, getUserProducts } from '../../services/apiProducts';
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
    queryKey: ['products', user?.$id],
    queryFn: () => getUserProducts(user?.$id),
  });

  return { isLoading, products, error };
};
