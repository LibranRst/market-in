import { useEffect, useState } from 'react';
import { useUpdateCartProduct } from '../../../hooks/cart/useUpdateCartProduct';
import { useAddToCart } from '../../../hooks/cart/useAddToCart';
import { useDeleteProduct } from '../../../hooks/products/useDeleteProduct';
import { useCalculateReviews } from '../../../hooks/reviews/useCalculateReviews';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../utils/helpers';
import { Star } from '../StarRating';
import { Separator } from '../Separator';
import { Button, buttonVariants } from '../Button';
import {
  MdAddShoppingCart,
  MdModeEditOutline,
  MdPlusOne,
} from 'react-icons/md';
import { cn } from '../../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { TrashIcon } from '@radix-ui/react-icons';
import Spinner from '../loading/Spinner';
import { useUser } from '../../../hooks/auth/useUser';

const ProfileProductCard = ({ product, seller = false }) => {
  const [open, setOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(product?.carts?.length > 0);

  const { isAuthenticated } = useUser();
  const { updateCartProduct, isLoading: isCartUpdateLoading } =
    useUpdateCartProduct();
  const { addToCart, isLoading: isAdding } = useAddToCart();
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const { calculateRating, rating } = useCalculateReviews();

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/signin');
      toast('Please login to add products to your cart');
      return;
    }
    addToCart({ product_id: product.id, quantity: 1 });
    setIsInCart(true);
  };

  const handleUpdateCart = () => {
    if (!isAuthenticated) {
      navigate('/signin');
      toast('Please login to add products to your cart');
      return;
    }
    const cartItem = product?.carts[0];

    if (!cartItem) return;

    const maxQuantity = product?.stock - cartItem.quantity;

    if (maxQuantity === 0) {
      toast('Product quantity limit reached.', {
        description:
          'You have reached the maximum quantity of this product that can be added to your cart',
      });
      return;
    }

    updateCartProduct({
      cartId: cartItem.id,
      quantity: cartItem.quantity + 1,
    });
  };

  useEffect(() => {
    calculateRating(product.reviews);
  }, [product.reviews, calculateRating]);

  return (
    <div
      className="flex w-full flex-row items-center gap-2 rounded-xl border border-border bg-card px-2 py-2"
      key={product.id}
    >
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <img
          src={product.image_url}
          className="h-20 w-20 flex-shrink-0 rounded-md object-cover"
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
      <div className="flex flex-row items-center gap-2">
        <div className="flex items-center gap-1">
          {rating}
          <Star size={20} color={'#ff8f07'} full={true} />
        </div>
        {seller ? (
          isInCart ? (
            <Button
              variant="default"
              size="icon"
              disabled={isAdding || isCartUpdateLoading}
              onClick={handleUpdateCart}
            >
              <MdPlusOne size={20} />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              disabled={isCartUpdateLoading || isAdding}
              onClick={handleAddToCart}
            >
              <MdAddShoppingCart size={20} />
            </Button>
          )
        ) : (
          <>
            <Separator orientation="vertical" className="h-14" />
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
                          id: product.id,
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileProductCard;
