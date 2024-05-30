import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import productsApi from '../../services/api/productsApi';

export const useProducts = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('q');
  const filterByCategories = searchParams.get('categories')?.toLowerCase();

  const categories = filterByCategories?.split(',') || [];

  const {
    isLoading,
    isFetching,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products', { searchQuery, categories }],
    queryFn: () => productsApi.getProducts({ searchQuery, categories }),
    gcTime: 0,
  });

  return { isLoading, isFetching, products, error };
};

export const useRelatedProducts = ({ categories, productId }) => {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['relatedProducts', { categories, productId }],
    queryFn: () => productsApi.getRelatedProducts({ categories, productId }),
  });

  return { isLoading, products, error };
};

export const useUserProducts = ({ id, productId }) => {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['userProducts', { id, productId }],
    queryFn: () => productsApi.getUserProducts({ id, productId }),
  });

  return { isLoading, products, error };
};
