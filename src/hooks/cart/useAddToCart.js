import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import cartApi from '../../services/api/cartApi';

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const { mutate: addToCart, isPending: isLoading } = useMutation({
    mutationFn: cartApi.add,
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
