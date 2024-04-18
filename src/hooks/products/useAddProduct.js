import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../auth/useUser';
import { addProduct as addProductApi } from '../../services/apiProducts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useUser();

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: ({ name, description, price, category, imageFile, stock }) =>
      addProductApi({
        name,
        description,
        price,
        stock,
        category,
        imageFile,
        user_id: user?.$id,
      }),
    onSuccess: () => {
      toast('Product added', {
        description: 'The product has been added successfully',
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
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
