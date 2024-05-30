import supabase from '../supabase';

const notificationsApi = {
  get: async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*, order:order_id(*)')
      .or(
        `customer_id.eq.${(await supabase.auth.getUser()).data.user.id},seller_id.eq.${(await supabase.auth.getUser()).data.user.id}`,
      )
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return data;
  },
};

export default notificationsApi;
