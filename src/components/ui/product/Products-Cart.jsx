import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useUser } from '../../../hooks/auth/useUser';
import { formatCurrency } from '../../../utils/helpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../Dropdown-menu';
import Spinner from '../loading/Spinner';
import { cn } from '../../../lib/utils';
import { buttonVariants } from '../Button';

const ProductsCart = () => {
  const { cartProducts, isLoading, isFetching } = useUser();

  const totalQuantity = cartProducts?.reduce(
    (acc, curr) => acc + curr.quantity,
    0,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl p-2 transition-colors hover:bg-accent">
        <div className="relative">
          <FiShoppingCart size={20} />
          {cartProducts?.length > 0 && (
            <span
              className={`absolute -right-3 -top-2 h-4 ${totalQuantity > 99 ? 'w-fit' : 'w-4'} rounded-full bg-destructive text-xs font-semibold text-destructive-foreground`}
            >
              {totalQuantity > 99 ? '99+' : totalQuantity}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel className="flex items-center justify-between p-2">
          <p>Products Cart ({totalQuantity})</p>
          <Link to="/cart" className={cn(buttonVariants({ size: 'sm' }))}>
            View Cart
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[calc(68px*6)] overflow-auto">
          {!cartProducts?.length && !isLoading && !isFetching && (
            <div className="w-[35rem] p-2">No products in cart.</div>
          )}
          {isLoading || isFetching ? (
            <div className="w-[35rem] p-2">
              <Spinner className="h-10 w-10" />
            </div>
          ) : (
            cartProducts?.map((product) => (
              <ProductsItem
                key={product?.id}
                product={product}
                quantity={product?.quantity}
                isFetching={isFetching}
              />
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProductsItem = ({ product, quantity }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex w-[35rem] cursor-pointer flex-row items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-accent"
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="h-14 w-14 rounded-xl object-cover"
      />
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col">
          <p className="w-[250px] truncate text-base">{product.name}</p>
          <p className="text-sm font-normal text-card-foreground/70">
            Qty: {quantity}
          </p>
        </div>
        <p>{formatCurrency(product.price * quantity)}</p>
      </div>
    </Link>
  );
};

export default ProductsCart;
