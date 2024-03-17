import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct as deleteProductById } from '../../services/apiProducts';
import { toast } from '../use-toast';

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      toast({
        title: 'Product deleted',
        description: 'The product has been deleted successfully',
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
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
