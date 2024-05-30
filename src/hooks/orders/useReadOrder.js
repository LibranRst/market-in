import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import ordersApi from '../../services/api/ordersApi';

export const useReadOrder = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const params = searchParams.get('transactions') || 'purchases';

  const { mutate: markAsRead, isPending } = useMutation({
    mutationFn: () => ordersApi.readOrder({ params }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  return { markAsRead, isPending };
};
