import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';
import { useUser } from '../auth/useUser';
import { addProduct as addProductApi } from '../../services/apiProducts';
import { useNavigate } from 'react-router-dom';

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
      toast({
        title: 'Product added',
        description: 'The product has been added successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      navigate('/');
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return { addProduct, isAdding };
};
