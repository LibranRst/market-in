import Spinner from '../../components/ui/loading/Spinner';
import ProductCard from '../../components/ui/product/Product-Card';
import { useProducts } from '../../hooks/products/useProducts';

const HomePage = () => {
  const { products, isLoading, isFetching } = useProducts();

  return (
    <div className="flex w-full gap-5">
      <div className="flex w-[20%] flex-col gap-2">
        <h2 className="font-medium">Filter</h2>
        <div className="rounded-xl border bg-card p-2">
          <h2>Categories</h2>
        </div>
      </div>
      <div className="flex w-[80%] flex-col gap-2">
        <h2 className="font-medium">Product</h2>
        <div className="grid grid-cols-4 gap-5">
          {isLoading ? (
            <Spinner className="h-10 w-10" />
          ) : (
            products?.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                isFetching={isFetching}
              >
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

export default HomePage;
