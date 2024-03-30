import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import { useToast } from '../use-toast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      console.log(user);
      toast({
        title: 'Account updated',
        description: 'Your account has been updated.',
      });

      if (user?.passwordUpdate) {
        toast({
          title: 'Password updated',
          description: 'Your password has been updated.',
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['user'] });
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
