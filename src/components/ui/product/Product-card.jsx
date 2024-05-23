import { FaStar } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { MdAddShoppingCart, MdPlusOne } from 'react-icons/md';

import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../hooks/auth/useUser';
import { useAddToCart } from '../../../hooks/cart/useAddToCart';
import { useUpdateCartProduct } from '../../../hooks/cart/useUpdateCartProduct';
import { formatCurrency } from '../../../utils/helpers';
import { Button } from '../Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip';
import { toast } from 'sonner';

const ProductCard = memo(({ product }) => {
  const {
    image_url: imgSrc,
    name,
    price,
    rating = 0,
    children,
    id: id,
  } = product;

  const { user, isLoading: isUserLoading, isFetching } = useUser();
  const { addToCart, isLoading: isAdding } = useAddToCart();
  const { updateCartProduct, isLoading: isCartUpdateLoading } =
    useUpdateCartProduct();

  const [isInCart, setIsInCart] = useState(product?.carts?.length > 0);

  // const isInCart = product?.cart.length > 0;

  const isSeller = user?.id === product?.profiles.id;

  const handleAddToCart = () => {
    addToCart({ product_id: product.id, quantity: 1 });
    setIsInCart(true);
  };

  const handleUpdateCart = () => {
    // Check if the user is fetching data
    if (isFetching) return;

    // Get the first cart item for the current product
    const cartItem = product?.carts[0];

    // If there is no cart item, return
    if (!cartItem) return;

    // Calculate the maximum quantity that can be added to the cart
    const maxQuantity = product?.stock - cartItem.quantity;

    // If the maximum quantity is 0, show a toast message and return
    if (maxQuantity === 0) {
      toast('Product quantity limit reached.', {
        description:
          'You have reached the maximum quantity of this product that can be added to your cart',
      });
      return;
    }

    // Update the cart product with the new quantity
    updateCartProduct({
      cartId: cartItem.id,
      quantity: cartItem.quantity + 1,
    });
  };

  // useEffect(() => {
  //   setIsInCart(product?.cart.length > 0);
  // }, [product?.cart]);

  return (
    <TooltipProvider>
      <Tooltip>
        <div className="overflow-hidden rounded-xl border-[1px] bg-card drop-shadow-sm">
          <Link to={`/product/${id}`}>
            <img
              src={imgSrc}
              alt={name}
              className="h-full max-h-[13.688rem] w-full cursor-pointe object-cover"
            />
          </Link>
          <div className="relative flex h-[140px] flex-col gap-[2px] p-2">
            <TooltipTrigger className="text-left">
              <Link
                className="line-clamp-2 cursor-pointer overflow-hidden text-ellipsis"
                to={`/product/${id}`}
              >
                {name}
              </Link>
            </TooltipTrigger>
            <p className="mb-1 text-lg font-semibold">
              {formatCurrency(price)}
            </p>
            {children}
            <div className="flex items-center gap-1">
              <FaStar size={15} className="text-yellow-400" />
              <span className="text-sm">{rating}</span>
            </div>
            {/* <button className="absolute bottom-2 right-2 flex items-center rounded-md border border-black bg-white p-2 text-black transition-colors hover:bg-black hover:text-white">
          <MdAddShoppingCart />
        </button> */}
            {!isSeller ? (
              isInCart ? (
                <Button
                  className="absolute bottom-2 right-2"
                  variant="default"
                  size="icon"
                  disabled={isAdding || isCartUpdateLoading || isUserLoading}
                  onClick={handleUpdateCart}
                >
                  <MdPlusOne size={20} />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  disabled={isCartUpdateLoading || isAdding || isUserLoading}
                  className="absolute bottom-2 right-2"
                  onClick={handleAddToCart}
                >
                  <MdAddShoppingCart />
                </Button>
              )
            ) : (
              <Button
                variant="outline"
                disabled={isSeller || isUserLoading}
                className="absolute bottom-2 right-2 text-xs"
              >
                Your Product.
              </Button>
            )}
          </div>
        </div>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

ProductCard.displayName = 'ProductCard';

const Seller = ({ sellerLink, children }) => {
  return (
    <Link className="flex gap-1" to={sellerLink}>
      <FaShop className="text-blue-600" />
      <p className="line-clamp-1 w-[100px] text-xs font-medium hover:underline">
        {children}
      </p>
    </Link>
  );
};

ProductCard.Seller = Seller;

export default ProductCard;
