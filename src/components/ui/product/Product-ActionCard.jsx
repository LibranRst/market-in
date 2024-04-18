// Third-Party Libraries
import { TrashIcon } from '@radix-ui/react-icons';

// Components
import { Button, buttonVariants } from '../Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../Card';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import Spinner from '../loading/Spinner';

// Hooks
import { useNavigate } from 'react-router-dom';
import { useDeleteProduct } from '../../../hooks/products/useDeleteProduct.js';

// Utils
import { cn } from '../../../lib/utils';

const ProductActionCard = ({ mode, isAdding, isUpdating, product }) => {
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const navigate = useNavigate();

  return (
    <Card className="sticky top-[7.688rem]">
      <CardHeader className="p-4">
        <CardTitle>
          {mode === 'edit' ? 'Edit Product Details' : 'Add New Product'}
        </CardTitle>
        <CardDescription>
          {mode === 'edit'
            ? 'Make changes to your product'
            : 'Start selling by adding a product'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-1 px-4">
        <Button
          className={`${mode === 'edit' ? 'w-[calc(100%-2.25rem)]' : 'w-full'}`}
          type="submit"
          disabled={isAdding || isUpdating || isDeleting}
        >
          {mode === 'edit' ? 'Save Changes' : 'Add Product'}{' '}
          {isAdding || isUpdating ? <Spinner className="ml-1 h-4 w-4" /> : null}
        </Button>
        {mode === 'edit' && (
          <Popover>
            <PopoverTrigger
              className={cn(
                buttonVariants({
                  variant: 'destructive',
                  size: 'icon',
                }),
              )}
              disabled={isDeleting || isUpdating}
            >
              <TrashIcon />
            </PopoverTrigger>
            <PopoverContent className="rounded-xl">
              <p className="text-sm">
                Are you sure you want to delete this product?
              </p>
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={() =>
                    deleteProduct(
                      {
                        productId: product.$id,
                        imageId: product.imageId,
                      },
                      {
                        onSuccess: () => {
                          navigate('/profile');
                        },
                      },
                    )
                  }
                >
                  {isDeleting ? (
                    <span>
                      Deleting
                      <Spinner className={'ml-1 h-4 w-4'} />{' '}
                    </span>
                  ) : (
                    'Confirm'
                  )}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductActionCard;
