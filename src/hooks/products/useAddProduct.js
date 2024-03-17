import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';
import { useUser } from '../auth/useUser';
import { addProduct as addProductApi } from '../../services/apiProducts';

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: ({ name, description, price, categories, imageFile, stock }) =>
      addProductApi({
        name,
        description,
        price,
        stock,
        categories,
        imageFile,
        user_id: user?.id,
      }),
    onSuccess: () => {
      toast({
        title: 'Product added',
        description: 'The product has been added successfully',
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      queryClient.invalidateQueries({
        queryKey: ['products_categories'],
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

  return { addProduct, isAdding };
};
