import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import productsApi from '../../services/api/productsApi';

export const useProduct = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct({ id }),
    gcTime: 0,
  });

  return { product, isLoading, error, isFetching };
};
