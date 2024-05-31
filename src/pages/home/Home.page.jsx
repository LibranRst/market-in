import FilterAccordion from '../../components/ui/product/Product-FilterAccordion';
import ProductCard from '../../components/ui/product/Product-Card';
import { Skeleton } from '../../components/ui/skeleton';
import { useProducts } from '../../hooks/products/useProducts';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex w-full gap-5">
      <div className="flex w-[20%] flex-col gap-2">
        <h2 className="font-medium">Filter</h2>
        <div className="rounded-xl border bg-card px-2">
          <FilterAccordion />
        </div>
      </div>
      <div className="flex w-[80%] flex-col gap-2">
        <h2 className="font-medium">Product</h2>
        <ProductsList />
      </div>
    </div>
  );
};

const ProductsList = () => {
  const [searchParams] = useSearchParams();
  const { products, isLoading, isFetching } = useProducts();

  const searchQuery = searchParams.get('q') || '';

  return (
    <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
      {isLoading || isFetching ? (
        Array.from({ length: 8 }).map((_, index) => (
          <Skeleton className="h-[360px] w-full rounded-xl" key={index}>
            <Skeleton className="h-[13.688rem] w-full" />
            <div className="relative h-[140px] p-2">
              <Skeleton className="h-[24px] w-[70%]" />
              <Skeleton className="mt-2 h-[28px] w-[50%]" />
              <Skeleton className="mt-2 h-[28px] w-[20%]" />
              <Skeleton className="absolute bottom-2 right-2 h-[24px] w-[20%]" />
            </div>
          </Skeleton>
        ))
      ) : products?.length > 0 ? (
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
      ) : (
        <p className="font-normal">
          {searchQuery ? 'No results found' : 'No products found'}
        </p>
      )}
    </div>
  );
};
export default HomePage;
