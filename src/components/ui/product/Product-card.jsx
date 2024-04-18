import { FaStar } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../hooks/auth/useUser';
import { useAddToCart } from '../../../hooks/cart/useAddToCart';
import { useDeleteProductCart } from '../../../hooks/cart/useDeleteProductCart';
import { formatCurrency } from '../../../utils/helpers';
import { Button } from '../Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip';
import Spinner from '../loading/Spinner';
const ProductCard = ({ product, onClick }) => {
  const {
    imageUrl: imgSrc,
    name,
    price,
    rating = 0,
    children,
    $id: id,
  } = product;
  const { user, isLoading: isUserLoading, isFetching } = useUser();
  const { addToCart, isLoading: isAdding } = useAddToCart();
  const { deleteProductCart, isLoading: isDeleting } = useDeleteProductCart();

  const [isInCart, setIsInCart] = useState(product?.cart.length > 0);

  // const isInCart = product?.cart.length > 0;

  const isSeller = user?.$id === product?.seller?.$id;

  const handleAddToCart = () => {
    addToCart({ productId: product.$id, quantity: 1 });
    setIsInCart(true);
  };

  const handleRemoveFromCart = () => {
    if (isFetching) {
      return;
    }
    deleteProductCart(product?.cart[0]?.$id);
    setIsInCart(false);
  };

  // useEffect(() => {
  //   setIsInCart(product?.cart.length > 0);
  // }, [product?.cart]);

  return (
    <TooltipProvider>
      <Tooltip>
        <div className="overflow-hidden rounded-xl border-[1px] bg-card drop-shadow-sm">
          <Link to={`/product/${id}`} onClick={onClick}>
            <img
              src={imgSrc}
              alt="Card 1 image"
              className="max-h-full max-w-full cursor-pointer object-cover"
            />
          </Link>
          <div className="relative flex h-[140px] flex-col gap-[2px] p-2">
            <TooltipTrigger className="text-left">
              <Link
                className="line-clamp-2 cursor-pointer overflow-hidden text-ellipsis"
                to={`/product/${id}`}
                onClick={onClick}
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
                  size="icon"
                  disabled={isAdding || isDeleting || isUserLoading}
                  onClick={handleRemoveFromCart}
                >
                  {isDeleting || isUserLoading || isAdding ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <MdOutlineRemoveShoppingCart />
                  )}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  disabled={isDeleting || isAdding || isUserLoading}
                  className="absolute bottom-2 right-2"
                  onClick={handleAddToCart}
                >
                  {isAdding || isUserLoading || isDeleting ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <MdAddShoppingCart />
                  )}
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
};

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
