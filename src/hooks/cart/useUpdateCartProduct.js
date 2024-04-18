import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductFromCart } from '../../services/apiProducts';
import { toast } from 'sonner';

export const useUpdateCartProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCartProduct, isPending: isLoading } = useMutation({
    mutationFn: updateProductFromCart,
    onSuccess: ({ product }) => {
      toast('Added more product quantity to cart.');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['product', product.$id],
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
