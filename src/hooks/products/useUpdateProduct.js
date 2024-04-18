import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateProduct as updateProductApi } from '../../services/apiProducts';
import { useUser } from '../auth/useUser';
import { toast } from 'sonner';

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
      toast('Product updated', {
        description: 'The product has been updated successfully',
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      navigate('/');
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  return { updateProduct, isUpdating };
};
