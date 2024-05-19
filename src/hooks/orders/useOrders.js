import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import supabase from '../../services/supabase';

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const notificationsFetch = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*, order:order_id(*)')
      .or(
        `customer_id.eq.${(await supabase.auth.getUser()).data.user.id},seller_id.eq.${(await supabase.auth.getUser()).data.user.id}`,
      )
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return data;
  };

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsFetch,
  });

  useEffect(() => {
    const subscription = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return {
    notifications,
    isLoading,
  };
};

export const useOrders = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const accordionValue = searchParams.get('transactions') || 'purchases';
  const filterValue = searchParams.get('status') || 'ALL';

  const fetchOrders = async () => {
    const userId = (await supabase.auth.getUser()).data.user.id;

    let query = supabase
      .from('orders')
      .select(
        '*, product:product_id(id, name, price, stock, image_url), customer:customer_id(*), seller:seller_id(*)',
      );

    if (accordionValue === 'all')
      query = query.or(`customer_id.eq.${userId},seller_id.eq.${userId}`);

    if (accordionValue === 'purchases') query = query.eq('customer_id', userId);

    if (accordionValue === 'sales') query = query.eq('seller_id', userId);

    if (filterValue !== 'ALL') query = query.eq('status', filterValue);

    const { data, error } = await query
      .order('status', { ascending: true })
      .order('created_at', {
        ascending: false,
      });

    if (error) throw new Error(error.message);
    return data;
  };

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', accordionValue, filterValue],
    queryFn: fetchOrders,
    gcTime: 0,
  });

  useEffect(() => {
    const subscription = supabase
      .channel('public:orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['orders'] });
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return { orders, isLoadingOrders };
};

// export const useOrdersAs = ({ as }) => {
//   const queryClient = useQueryClient();

//   const { data: orders, isLoading: isLoadingOrders } = useQuery({
//     queryKey: ['orders', as],
//     queryFn: async () => {
//       //   const asA = as === 'seller' ? 'seller_id' : 'customer_id';

//       const { data, error } = await supabase
//         .from('orders')
//         .select('*')
//         .eq(`${as}_id`, (await supabase.auth.getUser()).data.user.id);
//       if (error) throw new Error(error.message);
//       return data;
//     },
//   });

//   useEffect(() => {
//     const subscription = supabase
//       .channel('public:orders')
//       .on(
//         'postgres_changes',
//         { event: '*', schema: 'public', table: 'orders' },
//         () => {
//           queryClient.invalidateQueries({ queryKey: ['orders', 'seller'] });
//           queryClient.invalidateQueries({ queryKey: ['orders', 'customer'] });
//         },
//       )
//       .subscribe();

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [queryClient, as]);

//   return { orders, isLoadingOrders };
// };
