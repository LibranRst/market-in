import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/apiCategories';

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
