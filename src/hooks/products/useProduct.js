import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/apiProducts';

export const useProduct = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    gcTime: 0,
  });

  return { product, isLoading, error, isFetching };
};
