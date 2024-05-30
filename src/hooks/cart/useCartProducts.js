import { useQuery } from '@tanstack/react-query';
import cartApi from '../../services/api/cartApi';
import { useUser } from '../auth/useUser';

export const useCartProducts = ({ list = 'all' }) => {
  const { user } = useUser();

  const {
    data: cartProducts,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['cartProducts', user?.id, list],
    queryFn: () => cartApi.get({ userId: user?.id, list }),
    gcTime: 0,
  });

  return { cartProducts, isLoading, isFetching };
};
