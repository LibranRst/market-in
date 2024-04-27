import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProductToCart } from '../../services/apiProducts';
import { useUser } from '../auth/useUser';
import { toast } from 'sonner';

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: addToCart, isPending: isLoading } = useMutation({
    mutationFn: ({ product_id, quantity }) =>
      addProductToCart({ user_id: user?.id, product_id, quantity }),
    onSuccess: (data) => {
      toast('Product added to Cart.');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      queryClient.invalidateQueries({
        queryKey: ['product', data[0].product_id],
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
