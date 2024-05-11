import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { useAddToCart } from '../../../hooks/cart/useAddToCart';
import { useDeleteProductCart } from '../../../hooks/cart/useDeleteProductCart';
import { useUpdateCartProduct } from '../../../hooks/cart/useUpdateCartProduct';
import { formatCurrency } from '../../../utils/helpers';
import { Button } from '../Button';
import { Card } from '../Card';
import { Separator } from '../Separator';
import QuantityInput from '../cart/QuantityInput';

const ShoppingCart = ({ product, isProductLoading, isProductFetching }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(product?.carts[0]?.quantity);
  const [error, setError] = useState('');
  const [isInCart, setIsInCart] = useState(product?.carts?.length > 0);

  const queryClient = useQueryClient();

  const { addToCart, isLoading: isAdding } = useAddToCart();
  const { deleteProductCart, isLoading: isDeleting } = useDeleteProductCart();
  const { updateCartProduct, isLoading: isUpdating } = useUpdateCartProduct();

  const handleAddToCart = () => {
    setError('');

    if (!isProductFetching) {
      // const maxQuantity = product?.stock - product?.carts[0]?.quantity;
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
        { product_id: product.id, quantity },
        {
          onSuccess: (data) => {
            setCartQuantity(data.quantity);
          },
        },
      );
      setIsInCart(true);
    } else {
      if (product?.carts[0] == undefined) {
        return;
      }
      // if (isProductFetching) {
      //   return;
      // }

      updateCartProduct(
        {
          cartId: product?.carts[0]?.id,
          quantity: Number(quantity) + Number(cartQuantity),
        },
        {
          onSuccess: (data) => {
            setCartQuantity(data[0]?.quantity);
          },
        },
      );
    }
  };

  const handleRemoveFromCart = () => {
    if (isProductFetching) {
      return;
    }
    deleteProductCart(product?.carts[0]?.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['product', product.id],
        });
      },
    });

    // Get the existing selectedProducts from localStorage
    const selectedProducts =
      JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Find the index of the product being removed from the cart
    const productIndex = selectedProducts.findIndex((p) => p.id === product.id);

    // If the product is found in the selectedProducts array
    if (productIndex !== -1) {
      // Remove the product from the selectedProducts array
      selectedProducts.splice(productIndex, 1);

      // Update the localStorage with the updated selectedProducts array
      localStorage.setItem(
        'selectedProducts',
        JSON.stringify(selectedProducts),
      );
    }

    setIsInCart(false);
  };

  useEffect(() => {
    setCartQuantity(product?.carts[0]?.quantity);
  }, [product?.carts]);

  return (
    <Card className="sticky top-[7.688rem] flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <Separator />
      </div>
      <div className="flex items-center gap-3">
        <QuantityInput
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          onBlur={() => {
            if (quantity <= 0) {
              setQuantity(1);
            }
          }}
          setError={setError}
        />
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
          {isInCart ? '+ Cart' : 'Add To Cart'}
          {/* {isAdding && <Spinner className={'h-5 w-5'} />} */}
        </Button>
        {isInCart && (
          <Button
            size="icon"
            variant="destructive"
            className='shrink-0'
            disabled={isAdding || isDeleting || isProductLoading || isUpdating}
            onClick={handleRemoveFromCart}
          >
            <FaTrashAlt />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ShoppingCart;
