import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import productsApi from '../../services/api/productsApi';

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: productsApi.add,
    onSuccess: () => {
      toast('Product added', {
        description: 'The product has been added successfully',
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      queryClient.invalidateQueries({
        queryKey: ['userProducts'],
      });
      navigate('/');
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  return { addProduct, isAdding };
};
