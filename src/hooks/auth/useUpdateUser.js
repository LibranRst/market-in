import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import { toast } from 'sonner';

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();

//   const { mutate: updateUser, isPending: isUpdating } = useMutation({
//     mutationFn: updateCurrentUser,
//     onSuccess: (user) => {
//       toast('Account Updated.');

//       if (user?.passwordUpdate) {
//         toast('Password Updated.');
//         return;
//       }

//       queryClient.invalidateQueries({ queryKey: ['user'] });
//     },
//     onError: (err) =>
//       toast('error', {
//         description: err.message,
//       }),
//   });

//   return { updateUser, isUpdating };
// };

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      if (user?.new_email) {
        toast('Account Updated', {
          description:
            'Your email has been updated. Please check your new email for verification.',
        });
      } else {
        toast('Account Updated', {
          description: 'Your account has been updated.',
        });
      }

      queryClient.setQueryData(['user'], user);
    },
    onError: (err) =>
      toast('Error', {
        description: err.message,
      }),
  });

  return { updateUser, isUpdating };
};
