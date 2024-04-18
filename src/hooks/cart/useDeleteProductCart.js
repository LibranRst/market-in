import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductFromCart } from '../../services/apiProducts';
import { toast } from 'sonner';

export const useDeleteProductCart = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProductCart,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: deleteProductFromCart,

    onSuccess: () => {
      toast('Product removed from Cart.');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (error) => {
      toast('Error', {
        description: error.message,
      });
    },
  });

  return {
    deleteProductCart,
    isLoading,
    isSuccess,
  };
};
