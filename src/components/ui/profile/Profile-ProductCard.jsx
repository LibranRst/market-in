import { TrashIcon } from '@radix-ui/react-icons';
import { MdModeEditOutline } from 'react-icons/md';
import { useDeleteProduct } from '../../../hooks/products/useDeleteProduct';
import { formatCurrency } from '../../../utils/helpers';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { Button, buttonVariants } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import Spinner from '../loading/Spinner';

const ProfileProductCard = ({ product }) => {
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex w-full flex-row items-center gap-2 rounded-xl border border-border bg-card px-2 py-2"
      key={product.id}
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image_url}
          className="h-20 w-20 rounded-md object-cover"
        />
      </Link>
      <div className="flex w-[calc(100%-120px)] flex-col overflow-hidden">
        <Link className="truncate text-sm" to={`/product/${product.id}`}>
          {product.name}
        </Link>
        <p className="font-semibold">{formatCurrency(product.price)}</p>
        <p className="text-sm text-gray-400">
          Stock: <span className="text-xs">{product?.stock}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Link
          to={`/product/edit/${product.id}`}
          size="icon"
          variant="outline"
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'icon',
              className: 'h-6 w-6',
            }),
          )}
        >
          <MdModeEditOutline />
        </Link>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className={cn(
              buttonVariants({
                variant: 'destructive',
                size: 'icon',
                className: 'h-6 w-6',
              }),
            )}
          >
            <TrashIcon />
          </PopoverTrigger>
          <PopoverContent className="rounded-xl">
            <p className="text-sm">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeleting}
                onClick={() =>
                  deleteProduct({
                    productId: product.id,
                  })
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
      </div>
    </div>
  );
};

export default ProfileProductCard;
