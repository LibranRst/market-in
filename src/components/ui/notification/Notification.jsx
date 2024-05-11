import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/helpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../Dropdown-menu';

import { GrNotification } from 'react-icons/gr';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import supabase from '../../../services/supabase';
import Spinner from '../loading/Spinner';
import { Button } from '../Button';
import { toast } from 'sonner';

const Notification = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select(
          '*, order:orders(id, status, quantity,totalPrice, product:products(id, name, image_url, price)), customer:sender_id(*), seller:receiver_id(*)',
        )
        .or(
          `receiver_id.eq.${(await supabase.auth.getUser()).data.user.id},sender_id.eq.${(await supabase.auth.getUser()).data.user.id}`,
        )
        .eq('order.status', 'PENDING');
      if (error) throw new Error(error.message);

      return data;
    },
  });

  useEffect(() => {
    const subscription = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl p-2 transition-colors hover:bg-accent">
        <div className="relative">
          <GrNotification size={20} />
          {data?.length > 0 && (
            <span
              className={`absolute -right-3 -top-2 h-4 w-4 rounded-full bg-destructive text-xs font-semibold text-destructive-foreground`}
            >
              {data?.length}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel className="flex items-center justify-between p-2">
          <p>Notifications</p>
          {/* <Link to="/cart" className={cn(buttonVariants({ size: 'sm' }))}>
            View Cart
          </Link> */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[calc(68px*6)] overflow-auto">
          {!data?.length && !isLoading && (
            <div className="w-[35rem] p-2">No products in cart.</div>
          )}
          {isLoading ? (
            <div className="w-[35rem] p-2">
              <Spinner className="h-10 w-10" />
            </div>
          ) : (
            data?.map(
              ({ order, customer }) =>
                order?.status === 'PENDING' && (
                  <OrdersItem
                    key={order.id}
                    order={order}
                    customer={customer}
                  />
                ),
            )
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const OrdersItem = ({ order, customer }) => {
  const { mutate: confirm, isPending } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status: 'SUCCESS' })
        .eq('id', order.id);

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: () => {
      toast('Order Confirmed.');
    },
    onError: (err) => {
      toast('Error', {
        description: err.message,
      });
    },
  });
  const handleConfirm = () => {
    confirm();
  };
  return (
    <div
      // to={`/orders/${order.id}`}
      className="group flex w-[35rem] cursor-pointer flex-row items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-accent"
    >
      <img
        src={order?.product.image_url}
        alt={order?.product.name}
        className="h-20 w-20 rounded-xl object-cover"
      />
      <div className="flex w-full flex-row justify-between">
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex justify-between">
            <p className=" text-base font-semibold">
              <span className="w-[250px] truncate">{customer?.name}</span>
              <span className="font-normal"> Wants to buy your product.</span>
            </p>
            <p>{formatCurrency(order?.totalPrice)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-normal text-card-foreground/70">
              {order?.product.name}
            </p>
            <p className="text-sm font-normal text-primary">
              {order?.status === 'PENDING'
                ? 'Waiting for confirmation'
                : 'Delivered'}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-normal text-card-foreground/70">
              Qty: {order.quantity}
            </p>
            <div className="flex flex-row gap-2">
              <Button size="sm" variant="outline">
                Cancel
              </Button>
              <Button size="sm" onClick={handleConfirm} disabled={isPending}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end"></div>
      </div>
    </div>
  );
};

export default Notification;
