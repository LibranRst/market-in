import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import { useToast } from '../use-toast';
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast({
        title: 'Logged in',
        variant: 'success',
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
