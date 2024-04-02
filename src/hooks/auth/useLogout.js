import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../use-toast';

export const useLogout = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast({
        title: 'Logged out',
        variant: 'success',
      });
      navigate('/signin', { replace: true });
    },
  });

  return { logout, isLoading };
};
