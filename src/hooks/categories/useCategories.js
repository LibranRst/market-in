import { getCategories } from '@/services/apiCategories';
import { useQuery } from '@tanstack/react-query';

const useCategories = () => {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return {
    isLoading,
    categories,
    error,
  };
};

export { useCategories };
