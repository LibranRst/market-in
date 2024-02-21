import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('Password changed, Logged in with new password');
      navigate('/');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { resetPassword, isLoading };
};
