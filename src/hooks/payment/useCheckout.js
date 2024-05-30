import { useMutation, useQueryClient } from '@tanstack/react-query';
import paymentApi from '../../services/api/paymenyApi';
import { toast } from 'sonner';
import { useUser } from '../auth/useUser';

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: checkout, isPending } = useMutation({
    mutationFn: paymentApi.checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['cartProducts', user?.id],
      });
    },
    onError: (err) => {
      toast(err.message);
    },
  });

  return { checkout, isPending };
};
