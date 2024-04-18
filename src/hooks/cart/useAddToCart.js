import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProductToCart } from '../../services/apiProducts';
import { useUser } from '../auth/useUser';
import { toast } from 'sonner';

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: addToCart, isPending: isLoading } = useMutation({
    mutationFn: ({ productId, quantity }) =>
      addProductToCart({ userId: user?.$id, productId, quantity }),
    onSuccess: ({ product }) => {
      toast('Product added to Cart.');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
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

  return { addToCart, isLoading };
};
