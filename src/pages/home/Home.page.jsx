import { useProducts } from '../../hooks/products/useProducts';
import Spinner from '../../ui/loading/Spinner';
import ProductCard from '../../ui/product/ProductCard';
import { formatCurrency } from '../../utils/helpers';

const HomePage = () => {
  const { products, isLoading } = useProducts();

  return (
    <div className="mt-5 flex w-full gap-5">
      <div className="flex w-[20%] flex-col gap-2">
        <h2 className="font-medium">Filter</h2>
        <div className="rounded-md bg-white p-2">
          <h2>Category</h2>
        </div>
      </div>
      <div className="flex w-[80%] flex-col gap-2">
        <h2 className="font-medium">Product</h2>
        <div className="grid grid-cols-4 gap-5">
          {isLoading ? (
            <Spinner />
          ) : (
            products?.map((product) => (
              <ProductCard
                key={product.id}
                imgSrc={product.product_image}
                name={product.name}
                price={formatCurrency(product.price)}
                rating={product.rating.toFixed(1)}
              >
                <ProductCard.Seller sellerLink="/profile">
                  Hyuzin
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
