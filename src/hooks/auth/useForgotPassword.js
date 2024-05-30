import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import authApi from '../../services/api/authApi';

export const useForgotPassword = () => {
  const { mutate: forgotPassword, isPending: isLoading } = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast('Check your email', {
        description:
          'We have sent you an email with instructions on how to reset your password.',
      });
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  return { forgotPassword, isLoading };
};
