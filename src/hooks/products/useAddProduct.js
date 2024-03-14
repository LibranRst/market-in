import { addProduct as addProductApi } from '@/services/apiProducts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';
import { useUser } from '../auth/useUser';

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: ({ name, description, price, categories, imageFile }) =>
      addProductApi({
        name,
        description,
        price,
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
