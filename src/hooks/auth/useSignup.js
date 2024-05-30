import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import authApi from '../../services/api/authApi';

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: authApi.signup,
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
