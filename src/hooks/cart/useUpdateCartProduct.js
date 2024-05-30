import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import cartApi from '../../services/api/cartApi';

export const useUpdateCartProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCartProduct, isPending: isLoading } = useMutation({
    mutationFn: cartApi.update,
    onSuccess: (data) => {
      toast(`Add More product to cart.`, {
        description: `Total quantity of this product is ${data?.at(0)?.quantity}`,
      });
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['product', data[0].product_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      queryClient.invalidateQueries({
        queryKey: ['cartProducts', data[0].user_id],
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
