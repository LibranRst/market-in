import { useMutation, useQueryClient } from '@tanstack/react-query';
import ordersApi from '../../services/api/ordersApi';
import { toast } from 'sonner';

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: confirm, isPending } = useMutation({
    mutationFn: ordersApi.confirmOrder,
    onSuccess: () => {
      toast('Order Confirmed.');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  return { confirm, isPending };
};
