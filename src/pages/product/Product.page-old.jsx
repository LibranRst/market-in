import { Button } from '../../components/ui/Button';
import DynamicBreadcrumb from '../../components/ui/Dynamic-breadcrumb';
import { Separator } from '../../components/ui/Separator';
import { useProduct } from '../../hooks/products/useProduct';
import { formatCurrency } from '../../utils/helpers';

const ProductPage = () => {
  const { product, isLoading } = useProduct();

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="mt-7 flex flex-col gap-5">
      <DynamicBreadcrumb pageName={product?.name} />
      <div className="relative z-[30] flex gap-5 rounded-md border border-border">
        <img
          src={product?.product_image}
          alt={product?.name}
          className="m-10 h-80 w-80 rounded-md object-cover"
        />
        <div className="flex w-full flex-col justify-center gap-7 overflow-hidden py-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <div className="flex flex-row gap-2">
              {product?.categories?.map((category, index, array) => (
                <p key={category.id} className="text-sm">
                  {category.name}
                  {index !== array.length - 1 && ', '}
                </p>
              ))}
              <Separator className="w-[2px]" orientation="vertical" />
              <p className="text-sm font-medium ">
                Stock:{' '}
                <span
                  className={
                    product?.stock === 0 ? 'text-destructive' : 'text-green-500'
                  }
                >
                  {product?.stock || 'Sold out'}
                </span>
              </p>
            </div>
            <p className="text-lg">{formatCurrency(product?.price)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Description</h2>
            <p className="max-h-[96px] w-[calc(100%-40px)] overflow-auto  text-[1rem]">
              {product?.description}
            </p>
          </div>
          <Button
            size="lg"
            variant="outline"
            className="absolute -bottom-5 right-20 z-[40] h-[3rem] w-[10rem] cursor-pointer rounded-md p-3 text-center shadow-md transition-all active:scale-90"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
