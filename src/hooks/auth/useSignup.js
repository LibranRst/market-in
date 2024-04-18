import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from 'sonner';

export const useSignup = () => {
  const { mutateAsync: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  return { signup, isLoading };
};
