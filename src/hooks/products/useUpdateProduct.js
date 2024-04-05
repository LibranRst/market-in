import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';
import { useUser } from '../auth/useUser';
import { useNavigate } from 'react-router-dom';
import { updateProduct as updateProductApi } from '../../services/apiProducts';

export const useUpdateProduct = (id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useUser();

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({
      name,
      description,
      price,
      category,
      imageFile,
      stock,
      imageUrl,
      imageId,
    }) =>
      updateProductApi({
        name,
        description,
        price,
        stock,
        category,
        imageFile,
        imageUrl,
        imageId,
        id,
        user_id: user?.$id,
      }),
    onSuccess: () => {
      toast({
        title: 'Product updated',
        description: 'The product has been updated successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
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

  return { updateProduct, isUpdating };
};
