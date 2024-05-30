import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import supabase from '../../services/supabase';
import notificationsApi from '../../services/api/notificationsApi';

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.get,
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
