import { useMutation } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordApi } from '../../services/apiAuth';
import { useToast } from '../use-toast';

export const useForgotPassword = () => {
  const { toast } = useToast();

  const { mutate: forgotPassword, isPending: isLoading } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast({
        title: 'Check your email',
        description:
          'We have sent you an email with instructions on how to reset your password.',
      });
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return { forgotPassword, isLoading };
};
