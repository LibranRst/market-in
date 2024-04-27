import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useUser } from '../../../hooks/auth/useUser';
import { useDeleteProductCart } from '../../../hooks/cart/useDeleteProductCart';
import { formatCurrency } from '../../../utils/helpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../Dropdown-menu';
import Spinner from '../loading/Spinner';
// import { deleteProductFromCart } from '../../../services/apiProducts';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

const ProductsCart = () => {
  // const queryClient = useQueryClient();

  const { user, isLoading, isFetching } = useUser();
  // const { mutate: deleteProductCart, isPending: isDeleting } = useMutation({
  //   mutationFn: deleteProductFromCart,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['user'],
  //     });
  //   },
  // });

  const { deleteProductCart, isLoading: isDeleting } = useDeleteProductCart();

  const cartProducts = user?.carts
    ?.map((cartProduct) => ({
      cartProductId: cartProduct.id,
      ...cartProduct.products,
      quantity: cartProduct.quantity,
    }))
    .reverse();

  // console.log(cartProducts?.at(0).$id)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl p-2 transition-colors hover:bg-accent">
        <FiShoppingCart size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel className="p-2">Products Cart.</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!cartProducts?.length && !isLoading && !isFetching && !isDeleting && (
          <div className="w-[35rem] p-2">No products in cart.</div>
        )}
        {isDeleting || isLoading || isFetching ? (
          <div className="w-[35rem] p-2">
            <Spinner className="h-10 w-10" />
          </div>
        ) : (
          cartProducts?.map((product) => (
            <ProductsItem
              key={product.id}
              product={product}
              isFetching={isFetching}
            />
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProductsItem = ({ product }) => {
  // console.log(product);
  // useEffect(() => {
  //   if (product.id === undefined) {
  //     deleteProductCart(product?.cartProductId);
  //   }
  // }, [product.id, product?.cartProductId, deleteProductCart]);

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
            Qty: {product.quantity}
          </p>
        </div>
        <p>{formatCurrency(product.price * product.quantity)}</p>
      </div>
    </Link>
  );
};

export default ProductsCart;
