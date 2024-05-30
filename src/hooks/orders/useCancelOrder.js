import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ordersApi from '../../services/api/ordersApi';

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: cancel, isPending } = useMutation({
    mutationFn: ordersApi.cancelOrder,
    onSuccess: () => {
      toast('Order Canceled.');
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

  return { cancel, isPending };
};
