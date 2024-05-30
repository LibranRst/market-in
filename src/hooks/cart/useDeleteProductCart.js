import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import cartApi from '../../services/api/cartApi';

export const useDeleteProductCart = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProductCart,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: cartApi.delete,
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
