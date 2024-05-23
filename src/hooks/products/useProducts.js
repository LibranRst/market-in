import { useQuery } from '@tanstack/react-query';
import {
  getCartProducts,
  getProducts,
  getUserProducts,
} from '../../services/apiProducts';
import { useUser } from '../auth/useUser';
import { useSearchParams } from 'react-router-dom';
import supabase from '../../services/supabase';

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
    queryFn: () => getProducts({ searchQuery, categories }),
    gcTime: 0,
  });

  return { isLoading, isFetching, products, error };
};

export const useRelatedProducts = ({ categories, productId }) => {
  const fetchRelatedProducts = async () => {
    let query = supabase.from('products').select('*, profiles(*), carts(*)');

    if (categories)
      query = query.contains('categories', categories).neq('id', productId);

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return data;
  };

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['relatedProducts', { categories, productId }],
    queryFn: fetchRelatedProducts,
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
    queryFn: () => getUserProducts({ id, productId }),
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
