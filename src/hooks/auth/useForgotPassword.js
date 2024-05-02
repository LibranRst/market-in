import { toast } from 'sonner';
import { forgotPassword as forgotPasswordApi } from '../../services/apiAuth';
import { useMutation } from '@tanstack/react-query';

export const useForgotPassword = () => {
  const { mutate: forgotPassword, isPending: isLoading } = useMutation({
    mutationFn: forgotPasswordApi,
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
