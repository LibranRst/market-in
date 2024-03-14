import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import { useToast } from '@/hooks/use-toast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      console.log(user)
      if (user?.new_email) {
        toast({
          title: 'Account updated',
          description:
            'Your email has been updated. Please check your new email for verification.',
        });
      } else {
        toast({
          title: 'Account updated',
          description: 'Your account has been updated.',
        });
      }

      queryClient.setQueryData(['user'], user);
    },
    onError: (err) =>
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      }),
  });

  return { updateUser, isUpdating };
};
