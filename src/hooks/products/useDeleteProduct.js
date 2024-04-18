import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct as deleteProductById } from '../../services/apiProducts';
import { toast } from 'sonner';

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteProductById,
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
