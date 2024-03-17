import { TrashIcon } from '@radix-ui/react-icons';
import { MdModeEditOutline } from 'react-icons/md';
import { Separator } from '../Separator';
import { useDeleteProduct } from '../../../hooks/products/useDeleteProduct';
import { formatCurrency } from '../../../utils/helpers';

import Spinner from '../loading/Spinner';
import { useState } from 'react';
import { Button } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

const ProfileProductCard = ({ product }) => {
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex w-full flex-row items-center gap-2 rounded-md border border-border bg-card px-2 py-2"
      key={product.id}
    >
      <img
        src={product.product_image}
        className="h-20 w-20 rounded-md object-cover"
      />
      <div className="flex w-[calc(100%-120px)] flex-col overflow-hidden">
        <p className="truncate text-sm">{product.name}</p>
        <p className="font-semibold">{formatCurrency(product.price)}</p>
        <p className="text-sm text-gray-400">
          Stock: <span className="text-xs">{product?.stock}</span>
        </p>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-2">
        <Button size="icon" variant="outline" className="h-6 w-6">
          <MdModeEditOutline />
        </Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <Button size="icon" variant="destructive" className="h-6 w-6">
              <TrashIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="">
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
                onClick={() => deleteProduct(product.id)}
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
