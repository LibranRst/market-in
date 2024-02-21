import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast.success('Signed Up');
      navigate('/', { replace: true });
    },
    onError: (err) => {
      toast.error(err.message, {
        duration: 1500,
      });
    },
  });

  return { signup, isLoading };
};
