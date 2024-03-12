import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/apiAuth';
import { useToast } from '../use-toast';

export const useResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        title: 'Password changed',
        description: 'Logged in with the new password',
      });
      navigate('/');
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return { resetPassword, isLoading };
};
