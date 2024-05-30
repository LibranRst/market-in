import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import supabase from '../../services/supabase';
import ordersApi from '../../services/api/ordersApi';

export const useOrders = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const accordionValue = searchParams.get('transactions') || 'purchases';
  const filterValue = searchParams.get('status') || 'ALL';

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', accordionValue, filterValue],
    queryFn: () => ordersApi.get({ accordionValue, filterValue }),
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
