import { useMutation, useQueryClient } from '@tanstack/react-query';
import paymentApi from '../../services/api/paymenyApi';

export const useTopUp = () => {
  const queryClient = useQueryClient();

  const { mutate: topup, isPending } = useMutation({
    mutationFn: paymentApi.topup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { topup, isPending };
};
