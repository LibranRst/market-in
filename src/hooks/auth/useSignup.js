import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// export const useSignup = () => {
//   const { mutateAsync: signup, isPending: isLoading } = useMutation({
//     mutationFn: signupApi,
//     onError: (err) => {
//       toast('Error', {
//         description: err.message,
//       });
//     },
//   });

//   return { signup, isLoading };
// };

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast('Signed Up.');
      navigate('/', { replace: true });
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return { signup, isLoading };
};
