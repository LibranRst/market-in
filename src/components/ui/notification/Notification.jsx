import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../Dropdown-menu';

import { GrNotification } from 'react-icons/gr';

import {
  CheckCircledIcon,
  ClockIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../../hooks/orders/useOrders';
import Spinner from '../loading/Spinner';
import { useUser } from '../../../hooks/auth/useUser';

const Notification = () => {
  // const queryClient = useQueryClient();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const { notifications, isLoading } = useNotifications({
    as: 'all',
  });

  const customerNotifications = notifications?.filter(
    (notification) =>
      notification.customer_id === user.id && !notification.read_customer,
  );

  const sellerNotifications = notifications?.filter(
    (notification) =>
      notification?.seller_id === user?.id && !notification.read_seller,
  );

  const totalNotifications =
    customerNotifications?.length + sellerNotifications?.length;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="rounded-xl p-2 transition-colors hover:bg-accent">
        <div className="relative">
          <GrNotification size={20} />
          {totalNotifications > 0 && (
            <span
              className={`absolute -right-3 -top-2 h-4 w-4 rounded-full bg-destructive text-xs font-semibold text-destructive-foreground`}
            >
              {totalNotifications}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 w-[20rem]">
        <DropdownMenuLabel className="flex items-center justify-between p-2">
          <p className="text-lg font-semibold">Notifications</p>
          {/* <Link to="/cart" className={cn(buttonVariants({ size: 'sm' }))}>
            View Cart
          </Link> */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[calc(68px*7)] overflow-auto p-2">
          <div className="flex flex-col gap-2 pb-2">
            <Purchases
              notifications={customerNotifications}
              isLoadingNotifications={isLoading}
            />
            <Sales
              notifications={sellerNotifications}
              isLoadingNotifications={isLoading}
            />
            {/* <div className="flex flex-col gap-2">
              <h1 className="font-semibold">For You</h1>
              <div className="flex flex-col gap-2">
                {!data?.length && !isLoading && (
                  <div className="w-[35rem] p-2">
                    There is no notifications yet.
                  </div>
                )}
                {isLoading ? (
                  <div className="w-[35rem] p-2">
                    <Spinner className="h-10 w-10" />
                  </div>
                ) : (
                  data?.map(({ order, customer, seller }) =>
                    customer?.id === user?.id ? (
                      <CustomerOrder
                        key={order?.id}
                        order={order}
                        seller={seller}
                      />
                    ) : (
                      <SellerOrder
                        key={order?.id}
                        order={order}
                        customer={customer}
                      />
                    ),
                  )
                )}
              </div>
            </div> */}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Purchases = ({ notifications, isLoadingNotifications }) => {
  const [canceledNotifications, setCanceledNotifications] = useState(0);
  const [successNotifications, setSuccessNotifications] = useState(0);
  const [pendingNotifications, setPendingNotifications] = useState(0);

  useEffect(() => {
    const canceledCount = notifications?.filter(
      (notification) => notification.order.status === 'CANCELED',
    ).length;
    const successCount = notifications?.filter(
      (notification) => notification.order.status === 'SUCCESS',
    ).length;
    const pendingCount = notifications?.filter(
      (notification) => notification.order.status === 'PENDING',
    ).length;
    setCanceledNotifications(canceledCount);
    setSuccessNotifications(successCount);
    setPendingNotifications(pendingCount);
  }, [notifications]);

  const ordersStatus = [
    {
      status: 'PENDING',
      label: 'Waiting for confirmation',
      count: pendingNotifications,
      to: 'status=PENDING',
      Icon: <ClockIcon />,
    },
    {
      status: 'SUCCESS',
      label: 'Purchased',
      count: successNotifications,
      to: 'status=SUCCESS',
      Icon: <CheckCircledIcon />,
    },
    {
      status: 'CANCELED',
      label: 'Canceled',
      count: canceledNotifications,
      to: 'status=CANCELED',
      Icon: <CrossCircledIcon />,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-medium">Purchases</h1>
      <div className="grid grid-cols-3 gap-2 text-xs">
        {ordersStatus.map(({ status, count, to, Icon, label }) => (
          <Link
            key={status}
            to={`/orders?transactions=purchases&${to}`}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border py-3 text-center transition-colors hover:bg-accent"
          >
            {Icon} <p>{label}</p>
            {count > 0 && (
              <span
                className={`absolute right-1 top-1 h-4 ${count > 99 ? 'w-fit' : 'w-4'} rounded-full ${status !== 'SUCCESS' ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'} text-xs `}
              >
                {count}
                {isLoadingNotifications && <Spinner className="h-4 w-4" />}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Sales = ({ notifications, isLoadingNotifications }) => {
  const [canceledNotifications, setCanceledNotifications] = useState(0);
  const [successNotifications, setSuccessNotifications] = useState(0);
  const [pendingNotifications, setPendingNotifications] = useState(0);

  useEffect(() => {
    const canceledCount = notifications?.filter(
      (notification) => notification.order.status === 'CANCELED',
    ).length;
    const successCount = notifications?.filter(
      (notification) => notification.order.status === 'SUCCESS',
    ).length;
    const pendingCount = notifications?.filter(
      (notification) => notification.order.status === 'PENDING',
    ).length;
    setCanceledNotifications(canceledCount);
    setSuccessNotifications(successCount);
    setPendingNotifications(pendingCount);
  }, [notifications]);

  const ordersStatus = [
    {
      status: 'PENDING',
      label: 'Need confirmation',
      count: pendingNotifications,
      to: 'status=PENDING',
      Icon: <ClockIcon />,
    },
    {
      status: 'SUCCESS',
      label: 'Sold',
      count: successNotifications,
      to: 'status=SUCCESS',
      Icon: <CheckCircledIcon />,
    },
    {
      status: 'CANCELED',
      label: 'Canceled',
      count: canceledNotifications,
      to: 'status=CANCELED',
      Icon: <CrossCircledIcon />,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-medium">Sales</h1>
      <div className="relative grid grid-cols-3 gap-2 text-xs">
        {ordersStatus.map(({ status, count, to, Icon, label }) => (
          <Link
            key={status}
            to={`/orders?transactions=sales&${to}`}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border py-3 text-center transition-colors hover:bg-accent"
          >
            {Icon} <p>{label}</p>
            {count > 0 && (
              <span
                className={`absolute right-1 top-1 h-4 ${count > 99 ? 'w-fit' : 'w-4'} rounded-full ${status !== 'SUCCESS' ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'} items-center text-xs font-semibold`}
              >
                {count}
                {isLoadingNotifications && <Spinner className="h-4 w-4" />}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Notification;
