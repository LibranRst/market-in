import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { useToast } from '../use-toast';

export const useSignup = () => {
  const { toast } = useToast();
  const { mutateAsync: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return { signup, isLoading };
};
