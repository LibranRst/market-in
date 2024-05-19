import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaShop } from 'react-icons/fa6';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import Spinner from '../../components/ui/loading/Spinner';
import { useOrders } from '../../hooks/orders/useOrders';
import supabase from '../../services/supabase';
import { formatCurrency } from '../../utils/helpers';
import { useEffect } from 'react';

const Orders = () => {
  const { orders, isLoadingOrders } = useOrders();
  const [searchParams] = useSearchParams();

  const params = searchParams.get('transactions') || 'purchases';

  const queryClient = useQueryClient();
  const { mutate: markAsRead } = useMutation({
    mutationFn: async () => {
      const readAs =
        params === 'purchases'
          ? { read_customer: true }
          : { read_seller: true };

      const { data, error } = await supabase
        .from('notifications')
        .update(readAs)
        .eq(
          params === 'purchases' ? 'customer_id' : 'seller_id',
          (await supabase.auth.getUser()).data.user.id,
        )
        .neq('status', 'PENDING');

      if (error) throw new Error(error.message);

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  useEffect(() => {
    markAsRead();
  }, [params, markAsRead, orders]);

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
          {params === 'sales' && <SellerOrder order={order} />}
          {params === 'purchases' && <BuyerOrder order={order} />}
        </div>
      ))}
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
  const queryClient = useQueryClient();
  const { mutate: cancel, isPending } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status: 'CANCELED' })
        .eq('id', order?.id)
        .select('*')
        .single();

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: () => {
      toast('Order Canceled.');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

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
          <Button variant="outline" onClick={cancel} disabled={isPending}>
            Cancel {isPending && <Spinner className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      )}
    </>
  );
};

const SellerOrder = ({ order }) => {
  const queryClient = useQueryClient();
  const { mutate: confirm, isPending } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status: 'SUCCESS' })
        .eq('id', order?.id)
        .select('*')
        .single();

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: () => {
      toast('Order Confirmed.');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

  const { mutate: cancel, isPending: cancelPending } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status: 'CANCELED' })
        .eq('id', order?.id)
        .select('*')
        .single();

      console.log(data);

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: () => {
      toast('Order Cancelled.');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });

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
          <Button variant="outline" onClick={cancel} disabled={cancelPending}>
            Cancel {cancelPending && <Spinner className="ml-1 h-4 w-4" />}
          </Button>
          <Button onClick={confirm} disabled={isPending}>
            Confirm {cancelPending && <Spinner className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      )}
    </>
  );
};

export default Orders;
