import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import DynamicBreadcrumb from '../../components/ui/Dynamic-breadcrumb';
import { Separator } from '../../components/ui/Separator';
import QuantityInput from '../../components/ui/cart/QuantityInput';
import Spinner from '../../components/ui/loading/Spinner';
import { useUser } from '../../hooks/auth/useUser';
import { useCartProducts } from '../../hooks/cart/useCartProducts';
import { useDeleteProductCart } from '../../hooks/cart/useDeleteProductCart';
import { useUpdateCartProduct } from '../../hooks/cart/useUpdateCartProduct';
import { useCheckout } from '../../hooks/payment/useCheckout';
import { formatCurrency } from '../../utils/helpers';
import { Skeleton } from '../../components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { user } = useUser();
  const { checkout, isPending } = useCheckout();
  const { cartProducts: products, isLoading } = useCartProducts({
    list: 'all',
  });
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const storedSelectedProducts = localStorage.getItem('selectedProducts');
    return storedSelectedProducts ? JSON.parse(storedSelectedProducts) : [];
  });

  const navigate = useNavigate();

  const cartProducts = products
    ?.map((cartProduct) => ({
      cartProductId: cartProduct.id,
      isChecked: cartProduct.isChecked,
      ...cartProduct.products,
      seller: cartProduct.products.profiles,
      quantity: cartProduct.quantity,
    }))
    .reverse();

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const totalPrice = selectedProducts.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      return;
    }
    if (user?.balance < totalPrice) {
      toast('Insufficient balance', {
        description: 'Please add money to your wallet.',
        action: {
          label: 'Top Up',
          onClick: () => navigate('/top-up'),
        },
      });
      return;
    }
    checkout(
      {
        // price: totalPrice,
        carts: selectedProducts,
      },
      {
        onSuccess: () => {
          toast('Payment Successful.');
          setSelectedProducts([]);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <DynamicBreadcrumb />
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4 flex flex-col gap-5">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <SelectAllCheckbox
                  products={cartProducts}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
                <p className="text-lg">Cart</p>
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-5 p-4">
              {cartProducts?.length === 0 && <div>Your cart is empty.</div>}
              {cartProducts?.map((product) => (
                <CartProduct
                  key={product?.id}
                  product={product}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              ))}
              {isLoading &&
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-20">
                    <div className="flex flex-row items-center gap-2 pl-6">
                      <Skeleton className="h-20 w-20 shrink-0" />
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex h-5 justify-between ">
                          <Skeleton className="w-20" />
                          <Skeleton className="w-40" />
                        </div>
                        <div className="flex h-8 justify-between">
                          <Skeleton className="w-20" />
                          <Skeleton className="w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
          {/* {cartProducts?.map((productsSeller) => (
            <Card key={productsSeller?.seller?.id}>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <SelectAllCheckbox
                    productsSeller={productsSeller}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                  <p className="text-lg">{productsSeller?.seller?.name}</p>
                  <p className="text-xs font-normal text-primary">(Seller)</p>
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-col gap-5 p-4">
                {productsSeller?.products?.map((product) => (
                  <CartProduct
                    key={product?.id}
                    product={product}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                ))}
              </CardContent>
            </Card>
          ))} */}
        </div>
        <div className="col-span-2 h-full">
          <Card className="sticky top-[7rem]">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-4">
              <div className="flex flex-row items-center justify-between">
                <h3>Total</h3>
                <p className="text-lg font-semibold">
                  {formatCurrency(totalPrice)}
                </p>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4">
              <Button
                variant="default"
                size="default"
                className="w-full"
                disabled={isPending || selectedProducts.length === 0}
                onClick={handleCheckout}
              >
                Buy {isPending && <Spinner className={'ml-1 h-4 w-4'} />}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CartCheckbox = ({ checked, onChange }) => {
  return (
    <div className="flex">
      <div
        className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-xl border transition duration-75 active:scale-90 ${
          checked ? 'bg-primary' : 'bg-foreground/20'
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg
            className="h-3 w-3 animate-valid-slide-up text-primary-foreground"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

const SelectAllCheckbox = ({
  products,
  selectedProducts,
  setSelectedProducts,
}) => {
  const handleSelectAll = (products) => {
    const allSelected = products?.every((product) =>
      selectedProducts.some((p) => p.id === product.id),
    );
    if (allSelected) {
      setSelectedProducts((prev) =>
        prev.filter((product) => !products.some((p) => p.id === product.id)),
      );
    } else {
      const newSelectedProducts = products
        ?.filter(
          (product) => !selectedProducts.some((p) => p.id === product.id),
        )
        .map((product) => ({
          id: product?.id,
          name: product?.name,
          quantity: product?.quantity,
          price: product?.price,
          cartId: product?.cartProductId,
          sellerId: product?.seller.id,
        }));
      setSelectedProducts((prev) => [...prev, ...newSelectedProducts]);
    }
  };
  return (
    <CartCheckbox
      checked={products?.every((product) =>
        selectedProducts.some((p) => p.id === product.id),
      )}
      onChange={() => handleSelectAll(products)}
    />
  );
};

const CartProduct = ({ product, selectedProducts, setSelectedProducts }) => {
  const [quantity, setQuantity] = useState(product?.quantity);

  const { updateCartProduct, isLoading: isUpdating } = useUpdateCartProduct();
  const { deleteProductCart, isLoading } = useDeleteProductCart();

  const { user } = useUser();

  const queryClient = useQueryClient();
  const handleSelectProduct = (product) => {
    if (isUpdating) return;

    const isSelected = selectedProducts.some((p) => p.id === product.id);
    if (isSelected) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      const newSelectedProduct = {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        cartId: product.cartProductId,
        sellerId: product.seller.id,
      };
      setSelectedProducts((prev) => [...prev, newSelectedProduct]);
    }
  };

  // const handleSelectProduct = (product) => {
  //   setSelectedProducts((prev) => {
  //     if (prev.some((p) => p.id === product?.id)) {
  //       return prev.filter((p) => p.id !== product?.id);
  //     } else {
  //       return [
  //         ...prev,
  //         {
  //           id: product?.id,
  //           name: product?.name,
  //           quantity: product?.cart?.quantity,
  //           price: product?.price,
  //           cartId: product?.cart?.id,
  //         },
  //       ];
  //     }
  //   });
  // };

  useEffect(() => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, quantity: quantity } : p)),
    );
  }, [quantity, product.id, setSelectedProducts]);

  const handleRemoveFromCart = () => {
    // if (isProductFetching) {
    //   return;
    // }
    deleteProductCart(product?.cartProductId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['cartProducts', user?.id],
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

      // Update the selectedProducts state
      setSelectedProducts(selectedProducts);
    }
  };

  return (
    <div className="flex w-full gap-2">
      <CartCheckbox
        checked={selectedProducts.some((p) => p.id === product.id)}
        onChange={() => handleSelectProduct(product)}
      />
      <div className="flex w-full items-center gap-2">
        <img
          src={product?.image_url}
          className="h-20 w-20 rounded-xl object-cover object-center"
        />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="text-lg">{product?.name}</p>
            <p className="text-xl font-semibold">
              {formatCurrency(product?.price * quantity)}
            </p>
          </div>
          <div className="flex w-full flex-row justify-between">
            <QuantityInput
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              onNegative={() => {
                updateCartProduct({
                  cartId: product?.cartProductId,
                  quantity: quantity - 1,
                });
              }}
              onPositive={() => {
                updateCartProduct({
                  cartId: product?.cartProductId,
                  quantity: quantity + 1,
                });
              }}
              onBlur={() => {
                if (quantity <= 0) {
                  setQuantity(product?.cart?.quantity);
                }
              }}
            />
            <Button
              variant="destructive"
              size="sm"
              className="shrink-0 text-xs"
              disabled={isLoading}
              onClick={handleRemoveFromCart}
            >
              Remove {isLoading && <Spinner className={'ml-1 h-4 w-4'} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
