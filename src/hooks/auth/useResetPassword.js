import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import authApi from '../../services/api/authApi';

export const useResetPassword = () => {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      toast('Password changed', {
        description: 'Logged in with the new password',
      });
      navigate('/');
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  return { resetPassword, isLoading };
};
