import { useMutation } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useForgotPassword = () => {
  const { mutate: forgotPassword, isPending: isLoading } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success('Check your email to reset password');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { forgotPassword, isLoading };
};
