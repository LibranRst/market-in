import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ordersApi from '../../services/api/ordersApi';

export const useReviewOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: addReview, isPending } = useMutation({
    mutationFn: ordersApi.reviewOrder,

    onSuccess: () => {
      toast('Review Submitted');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  return { addReview, isPending };
};
