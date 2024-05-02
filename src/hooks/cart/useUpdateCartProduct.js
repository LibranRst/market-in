import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductFromCart } from '../../services/apiProducts';
import { toast } from 'sonner';

export const useUpdateCartProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCartProduct, isPending: isLoading } = useMutation({
    mutationFn: updateProductFromCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['product', data[0].product_id],
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

  return { updateCartProduct, isLoading };
};
