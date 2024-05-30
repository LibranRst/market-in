import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import productsApi from '../../services/api/productsApi';

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      toast('Product deleted', {
        description: 'The product has been deleted successfully',
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  return {
    deleteProduct,
    isDeleting,
    error,
  };
};

export { useDeleteProduct };
