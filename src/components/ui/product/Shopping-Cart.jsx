import { useState } from 'react';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { formatCurrency } from '../../../utils/helpers';
import { Button } from '../Button';
import { Card } from '../Card';
import { Separator } from '../Separator';
import { useAddToCart } from '../../../hooks/cart/useAddToCart';
import Spinner from '../loading/Spinner';
import { useDeleteProductCart } from '../../../hooks/cart/useDeleteProductCart';
import { useUpdateCartProduct } from '../../../hooks/cart/useUpdateCartProduct';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const ShoppingCart = ({ product, isProductLoading, isProductFetching }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(product?.cart[0]?.quantity);
  const [error, setError] = useState('');
  const [isInCart, setIsInCart] = useState(product?.cart?.length > 0);

  const queryClient = useQueryClient();

  const { addToCart, isLoading: isAdding } = useAddToCart();
  const { deleteProductCart, isLoading: isDeleting } = useDeleteProductCart();
  const { updateCartProduct, isLoading: isUpdating } = useUpdateCartProduct();

  const handleNegative = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((cur) => cur - 1);
  };

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value).toFixed(0) || '';

    if (isNaN(newQuantity) || newQuantity < 1) {
      setQuantity('');
      setError('Quantity must be a valid number and greater than 0');
      return;
    }

    if (newQuantity > product?.stock) {
      setQuantity(product?.stock);
      setError(`Maximum quantity is ${product?.stock}`);
      return;
    }

    setQuantity(newQuantity);
    setError('');
  };

  const handlePositive = () => {
    if (quantity >= product?.stock) {
      return;
    }
    setQuantity((cur) => cur + 1);
  };

  const handleAddToCart = () => {
    setError('');

    if (!isProductFetching) {
      // const maxQuantity = product?.stock - product?.cart[0]?.quantity;
      const maxQuantity = product?.stock - cartQuantity;
      if (quantity > maxQuantity) {
        if (maxQuantity == 0) {
          toast('Product quantity limit reached.', {
            description: `You have reached the maximum quantity of this product that can be added to your cart`,
          });
        } else {
          toast('Product quantity limit reached.', {
            description: `You can only add up to ${maxQuantity} of this product to your cart.`,
          });
        }
        return;
      }
    }
    if (!isInCart) {
      if (quantity <= 0) {
        setQuantity(1);
      }
      addToCart(
        { productId: product.$id, quantity },
        {
          onSuccess: (data) => {
            setCartQuantity(data.quantity)
          },
        },
      );
      setIsInCart(true);
    } else {
      if (product?.cart[0] == undefined) {
        return;
      }
      // if (isProductFetching) {
      //   return;
      // }
      updateCartProduct(
        {
          cartId: product?.cart[0]?.$id,
          quantity: quantity + cartQuantity,
        },
        {
          onSuccess: (data) => {
            setCartQuantity(data.quantity)
          },
        },
      );
    }
  };

  const handleRemoveFromCart = () => {
    if (isProductFetching) {
      return;
    }
    deleteProductCart(product?.cart[0]?.$id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['product', product.$id],
        });
      },
    });
    setIsInCart(false);
  };

  const handleKeyDown = (e) => {
    const keysToPreventDefault = new Set(['e', '-', '+', '.']);
    // Prevent the default behavior of the these buttons
    if (keysToPreventDefault.has(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Card className="sticky top-[7.688rem] flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <Separator />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex w-[40%] items-center">
          <Button
            className="absolute left-1 flex h-[25px] w-[25px] rounded-full  transition-colors "
            onClick={handleNegative}
            disabled={quantity <= 1}
            size="icon"
            variant="ghost"
          >
            -
          </Button>
          <input
            type="number"
            className="h-[2.125rem] w-full rounded-md border border-border bg-card p-2 text-center text-card-foreground [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            onChange={handleChange}
            value={quantity}
            onBlur={() => {
              if (quantity <= 0) {
                setQuantity(1);
                setError('');
              }
            }}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="absolute right-1 flex h-[25px] w-[25px] rounded-full  transition-colors "
            onClick={handlePositive}
            disabled={quantity >= product?.stock}
            size="icon"
            variant="ghost"
          >
            +
          </Button>
        </div>
        <h2 className="text-sm">Quantity</h2>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex flex-row items-center justify-between">
        <h2 className="font-light">Subtotal</h2>
        <h2 className="text-xl font-bold ">
          {formatCurrency(product.price * quantity)}
        </h2>
      </div>
      <div className="flex w-full items-center gap-1">
        <Button
          className={`${isInCart ? 'w-[calc(100%-2.25rem)]' : 'w-full'}`}
          disabled={isAdding || isDeleting || isProductLoading || isUpdating}
          onClick={handleAddToCart}
        >
          {isInCart ? (
            isAdding || isDeleting || isProductLoading || isUpdating ? (
              <Spinner className={'h-4 w-4'} />
            ) : (
              '+ Cart'
            )
          ) : isAdding || isDeleting || isProductLoading || isUpdating ? (
            <Spinner className={'h-4 w-4'} />
          ) : (
            'Add To Cart'
          )}
          {/* {isAdding && <Spinner className={'h-5 w-5'} />} */}
        </Button>
        {isInCart && (
          <Button
            size="icon"
            variant="destructive"
            disabled={isAdding || isDeleting || isProductLoading || isUpdating}
            onClick={handleRemoveFromCart}
          >
            {isAdding || isDeleting || isProductLoading || isUpdating ? (
              <Spinner className={'h-4 w-4'} />
            ) : (
              <MdOutlineRemoveShoppingCart />
            )}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ShoppingCart;
