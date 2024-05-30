import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import authApi from '../../services/api/authApi';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: authApi.updateCurrentUser,
    onSuccess: ({ user }) => {
      if (user?.new_email) {
        toast('Check your email', {
          description:
            'We have sent you an email with instructions on how to verify your new email.',
        });
      } else {
        toast('Account Updated', {
          description: 'Your account has been updated.',
        });
      }

      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) =>
      toast('Error', {
        description: err.message,
      }),
  });

  return { updateUser, isUpdating };
};
