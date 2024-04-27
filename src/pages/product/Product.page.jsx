// React Imports
import { useRef } from 'react';
import { Link } from 'react-router-dom';

// Third-Party Imports
import { FaStar } from 'react-icons/fa';

// Component Imports
import { Button, buttonVariants } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import DynamicBreadcrumb from '../../components/ui/Dynamic-breadcrumb';
import { Separator } from '../../components/ui/Separator';
import Spinner from '../../components/ui/loading/Spinner';
import ProductCard from '../../components/ui/product/Product-Card';
import ShoppingCart from '../../components/ui/product/Shopping-Cart';

// Hook Imports
import { useUser } from '../../hooks/auth/useUser';
import { useProduct } from '../../hooks/products/useProduct';
import { useProducts } from '../../hooks/products/useProducts';
import { useTruncatedElement } from '../../hooks/useTruncatedElement';

// Utility Imports
import Avatar from '../../components/ui/Avatar';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../utils/helpers';

const ProductPage = () => {
  const { product, isLoading, isFetching } = useProduct();
  const { products } = useProducts();
  const { user } = useUser();

  const ref = useRef(null);
  const { isTruncated, isReadMore, setIsReadMore } = useTruncatedElement({
    ref,
    data: product,
  });

  const isSeller = user?.id === product?.profiles?.id;

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="mt-7 flex flex-col gap-5">
      <DynamicBreadcrumb pageName={product?.name} />
      <div className="grid w-full grid-cols-12 gap-10">
        <div className="col-span-4 h-full rounded-md">
          <img
            src={product?.image_url}
            className="sticky top-[7.688rem] h-[375px] w-[375px] rounded-md object-cover"
          />
        </div>
        <div className="col-span-5 flex flex-col gap-10 py-2">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <div className="text-md flex flex-row gap-2 font-normal">
              <div className="flex flex-wrap gap-1 text-card-foreground/70">
                {/* {product?.categories?.map((category, index, array) => (
                  <p key={category.id}>
                    {category.category}
                    {index !== array.length - 1 && ', '}
                  </p>
                ))} */}
                {product?.category}
              </div>
              |
              <p className="flex gap-1">
                Stock:
                <span
                  className={
                    product?.stock === 0 ? 'text-destructive' : 'text-blue-500'
                  }
                >
                  {product?.stock || 'Sold out'}
                </span>
              </p>
            </div>
            <p className="text-2xl font-normal">
              {formatCurrency(product?.price)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative flex flex-col gap-5 text-lg">
              <div>
                <h2 className="font-medium">Description</h2>
                <div className="mt-0.5 h-[2px] w-[50%] bg-primary" />
              </div>
              <div
                className={`min-h-[220px] overflow-hidden ${!isReadMore && 'line-clamp-[8]'}`}
                ref={ref}
              >
                <div
                  className="page-description break-words"
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
              </div>
            </div>
            {isTruncated && (
              <p
                onClick={() => setIsReadMore((cur) => !cur)}
                className="cursor-pointer font-bold text-primary"
              >
                {isReadMore ? 'read less.' : 'read more.'}
              </p>
            )}
          </div>
          <Separator />
          <Card className="flex flex-row items-center gap-2 p-4">
            {/* <img
              src={product?.seller.imageUrl}
              alt={product?.seller.username}
              className="h-[5rem] w-[5rem] rounded-full"
            /> */}
            <Avatar type="user" className="h-[5rem] w-[5rem]">
              <Avatar.Image
                src={product?.profiles.avatar}
                name={product?.profiles.name}
              />
            </Avatar>
            <div className="flex w-[calc(100%-5.5rem)] flex-row items-center justify-between">
              <h2 className="text-base font-semibold">
                {product?.profiles.username}{' '}
                <span className="flex items-center gap-1 text-sm font-normal">
                  <FaStar size={15} className="text-yellow-400" /> 5.0
                </span>
              </h2>
              <Button>visit store</Button>
            </div>
          </Card>
        </div>
        <div className="col-span-3 h-full">
          {isSeller ? (
            <Card className="sticky top-[7.688rem]">
              <CardHeader className="p-4">
                <CardTitle>You Own This Product</CardTitle>
                <CardDescription>
                  This product belongs to you as a seller. Click "Edit Mode" to
                  update its details or delete this product.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <Link
                  className={cn(
                    buttonVariants({ variant: 'default', className: 'w-full' }),
                  )}
                  to={`/product/edit/${product?.id}`}
                >
                  Edit Mode
                </Link>
              </CardContent>
            </Card>
          ) : (
            <ShoppingCart
              product={product}
              isProductFetching={isFetching}
              isProductLoading={isLoading}
            />
          )}
        </div>
      </div>
      <Separator />
      <div>
        <h1 className="text-2xl font-bold">Related Products.</h1>
        <div className="grid grid-cols-5 gap-5">
          {isLoading ? (
            <Spinner className="h-10 w-10" />
          ) : (
            products?.map((product) => (
              <ProductCard key={product.id} product={product}>
                <ProductCard.Seller sellerLink="/profile">
                  {product.profiles.username}
                </ProductCard.Seller>
              </ProductCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
