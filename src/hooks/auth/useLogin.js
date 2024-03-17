import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import { useToast } from '../use-toast';
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast({
        title: 'Logged in',
      });
      navigate('/', { replace: true });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Please check your credentials and try again',
        variant: 'destructive',
      });
    },
  });

  return { login, isLoading };
};
