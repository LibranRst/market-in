import { useEffect } from 'react';
import { FaShop } from 'react-icons/fa6';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import StarRating, { Star } from '../../components/ui/StarRating';
import Spinner from '../../components/ui/loading/Spinner';
import { useCancelOrder } from '../../hooks/orders/useCancelOrder';
import { useConfirmOrder } from '../../hooks/orders/useConfirmOrder';
import { useOrders } from '../../hooks/orders/useOrders';
import { useReadOrder } from '../../hooks/orders/useReadOrder';
import { useReviewOrder } from '../../hooks/orders/useReviewOrder';
import { formatCurrency } from '../../utils/helpers';

const Orders = () => {
  const { orders, isLoadingOrders } = useOrders();
  const { markAsRead, isPending } = useReadOrder();
  const [searchParams] = useSearchParams();

  const params = searchParams.get('transactions') || 'purchases';

  useEffect(() => {
    if (isPending) return;
    markAsRead();
  }, [params, markAsRead, orders, isPending]);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold">Transactions</h1>
      <FilterButtons
        filterField="status"
        options={[
          { value: 'ALL', label: 'All' },
          { value: 'PENDING', label: 'Pending' },
          { value: 'SUCCESS', label: 'Success' },
          { value: 'CANCELED', label: 'Cancelled' },
        ]}
      />
      {isLoadingOrders && <Spinner className="h-10 w-10" />}
      {orders?.length === 0 && <h1>No Orders Found</h1>}
      {orders?.map((order) => (
        <div
          key={order.id}
          className="flex flex-col gap-1 rounded-xl border p-3"
        >
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className=" flex flex-row items-center gap-2">
                <FaShop />
                <h2 className="font-medium">{order?.seller.name}</h2>
              </div>
              <h3
                className={`rounded-xl bg-accent px-2 text-xs ${order?.status === 'PENDING' && 'bg-destructive text-destructive-foreground'} ${order?.status === 'SUCCESS' && 'bg-success text-success-foreground'} ${order?.status === 'CANCELED' && 'bg-accent text-accent-foreground'}`}
              >
                {order.status}
              </h3>
              <p className="text-xs">{order.id}</p>
            </div>
            {order?.status === 'SUCCESS' && (
              <Review review={order?.review} order={order} params={params} />
            )}
          </div>
          {params === 'sales' && <SellerOrder order={order} />}
          {params === 'purchases' && <BuyerOrder order={order} />}
        </div>
      ))}
    </div>
  );
};

const Review = ({ review, order, params }) => {
  const { addReview, isPending } = useReviewOrder();

  return (
    <div
      className={`flex items-center gap-1 rounded-full ${review?.length > 0 && 'border'} px-1 py-0.5 drop-shadow-md`}
    >
      <span className="rounded-xl bg-primary px-2 text-sm  font-normal text-primary-foreground ">
        {review?.length > 0
          ? params === 'purchases'
            ? 'Reviewed'
            : 'Review'
          : 'Not Reviewed'}
      </span>
      {review?.length > 0 ? (
        <div className="flex flex-row items-center">
          <span className="transition">{review[0]?.rating}</span>
          <Star size={20} color="#ff8f07" full={true} />
        </div>
      ) : isPending ? (
        <Spinner className="h-5 w-5" />
      ) : params === 'purchases' ? (
        <StarRating
          size={20}
          color="#ff8f07"
          maxRating={5}
          defaultRating={review[0]?.rating}
          onProductRate={(rating) =>
            addReview({
              rating,
              product_id: order?.product_id,
              order_id: order?.id,
              user_id: order?.customer_id,
            })
          }
        />
      ) : null}
    </div>
  );
};

const FilterButtons = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  const handleClick = (value) => {
    if (currentFilter === value) {
      searchParams.delete(filterField);
    } else {
      searchParams.set(filterField, value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-row gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleClick(option.value)}
          variant={option.value === currentFilter ? 'default' : 'outline'}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

const BuyerOrder = ({ order }) => {
  const { cancel, isPending } = useCancelOrder();

  return (
    <>
      <div className="flex flex-row gap-3">
        <img
          src={order?.product.image_url}
          className="h-20 w-20 shrink-0 rounded-xl object-cover"
        />
        <div className="flex w-full flex-col justify-center">
          <h2 className="text-sm font-normal text-gray-500">
            <span className="font-semibold text-card-foreground">Your</span>{' '}
            {order.status === 'CANCELED' && 'Order has been canceled.'}
            {order.status === 'PENDING' && 'Order is waiting for confirmation.'}
            {order.status === 'SUCCESS' &&
              'Order has been delivered successfully.'}
          </h2>
          <div className="flex flex-row justify-between">
            <div>
              <h3 className="font-semibold">{order.product.name}</h3>
              <p>
                {order.quantity} quantity x{' '}
                {formatCurrency(order?.product.price)}
              </p>
            </div>
            <div className="flex flex-col border-l pl-5 font-light">
              <h2>Total Price</h2>
              <p className="items-center font-semibold">
                {formatCurrency(order?.totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {order.status === 'PENDING' && (
        <div className="mt-5 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => cancel({ id: order?.id })}
            disabled={isPending}
          >
            Cancel {isPending && <Spinner className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      )}
    </>
  );
};

const SellerOrder = ({ order }) => {
  const { confirm, isPending: isConfirming } = useConfirmOrder();
  const { cancel, isPending: isCancelling } = useCancelOrder();

  return (
    <>
      <div className="flex flex-row gap-3">
        <img
          src={order?.product.image_url}
          className="h-20 w-20 shrink-0 rounded-xl object-cover"
        />
        <div className="flex w-full flex-col justify-center">
          <h2 className="text-sm font-normal text-gray-500">
            <span className="font-semibold text-card-foreground">
              {order.customer.name}
            </span>{' '}
            {order.status === 'CANCELED' && 'Order has been canceled.'}
            {order.status === 'PENDING' && 'Has placed an order.'}
            {order.status === 'SUCCESS' && 'Order has been confirmed.'}
          </h2>
          <div className="flex flex-row justify-between">
            <div>
              <h3 className="font-semibold">{order.product.name}</h3>
              <p>
                {order.quantity} quantity x{' '}
                {formatCurrency(order?.product.price)}
              </p>
            </div>
            <div className="flex flex-col border-l pl-5 font-light">
              <h2>Total Price</h2>
              <p className="items-center font-semibold">
                {formatCurrency(order?.totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {order.status === 'PENDING' && (
        <div className="mt-5 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => cancel({ id: order?.id })}
            disabled={isCancelling}
          >
            Cancel {isCancelling && <Spinner className="ml-1 h-4 w-4" />}
          </Button>
          <Button
            onClick={() => confirm({ id: order?.id })}
            disabled={isConfirming}
          >
            Confirm {isConfirming && <Spinner className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      )}
    </>
  );
};

export default Orders;
