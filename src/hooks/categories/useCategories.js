import { useQuery } from '@tanstack/react-query';
import categoriesApi from '../../services/api/categoriesApi';

const useCategories = () => {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.get,
  });

  return {
    isLoading,
    categories,
    error,
  };
};

export { useCategories };
