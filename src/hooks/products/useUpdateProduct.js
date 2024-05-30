import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import productsApi from '../../services/api/productsApi';

export const useUpdateProduct = (id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({
      name,
      description,
      price,
      categories,
      imageFile,
      stock,
      imageUrl,
      imageFileName,
    }) =>
      productsApi.update({
        name,
        description,
        price,
        stock,
        categories,
        imageFile,
        imageUrl,
        imageFileName,
        id,
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
