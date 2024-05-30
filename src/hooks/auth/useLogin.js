import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import authApi from '../../services/api/authApi';
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: login, isPending: isLoading } = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast('Logged In.');
      navigate('/', { replace: true });
    },
    onError: () => {
      toast('Error', {
        description: 'Please check your credentials and try again',
      });
    },
  });

  return { login, isLoading };
};
