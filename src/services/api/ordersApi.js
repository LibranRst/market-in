import supabase from '../supabase';

const ordersApi = {
  get: async ({ accordionValue, filterValue }) => {
    const userId = (await supabase.auth.getUser()).data.user.id;

    let query = supabase
      .from('orders')
      .select(
        '*, product:product_id(id, name, price, stock, image_url), customer:customer_id(*), seller:seller_id(*), review:reviews(*)',
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
  },

  readOrder: async ({ params }) => {
    const readAs =
      params === 'purchases' ? { read_customer: true } : { read_seller: true };

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

  confirmOrder: async ({ id }) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'SUCCESS' })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw new Error(error.message);

    return data;
  },

  cancelOrder: async ({ id }) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'CANCELED' })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw new Error(error.message);

    return data;
  },

  reviewOrder: async ({ rating, product_id, user_id, order_id }) => {
    const { data, error } = await supabase.from('reviews').insert({
      rating: rating,
      product_id,
      user_id,
      order_id,
    });

    if (error) throw new Error(error.message);

    return data;
  },
};

export default ordersApi;
