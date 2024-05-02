import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/apiAuth';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

export const useResetPassword = () => {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: changePassword,
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
