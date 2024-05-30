import supabase from '../supabase';

const cartApi = {
  get: async ({ userId, list }) => {
    const { data, error } = await supabase
      .from('carts')
      .select('*, products(*, profiles(*))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    let cartProductsData = data;

    if (list === 'grouped') {
      const groupedProducts = data.reduce((acc, item) => {
        const seller = item.products.profiles;
        if (!acc[seller.id]) {
          acc[seller.id] = {
            seller,
            products: [],
          };
        }
        const product = {
          ...item.products,
          cart: {
            id: item.id,
            quantity: item.quantity,
          },
        };
        acc[seller.id].products.push(product);
        return acc;
      }, {});

      cartProductsData = Object.values(groupedProducts);
    }

    return cartProductsData;
  },

  add: async ({ product_id, quantity }) => {
    const { data, error } = await supabase
      .from('carts')
      .insert([
        {
          user_id: (await supabase.auth.getUser()).data.user.id,
          product_id,
          quantity,
        },
      ])
      .select();

    if (error) throw new Error(error.message);

    return data;
  },

  update: async ({ cartId, isChecked, quantity }) => {
    let updateData;

    if (isChecked) {
      updateData = {
        isChecked,
      };
    } else {
      updateData = {
        quantity,
      };
    }

    const { data, error } = await supabase
      .from('carts')
      .update(updateData)
      .eq('id', cartId)
      .select('*, products(*)');

    if (error) throw new Error(error.message);

    return data;
  },

  delete: async (cartId) => {
    const { data, error } = await supabase
      .from('carts')
      .delete()
      .eq('id', cartId);

    if (error) throw new Error(error.message);

    return data;
  },
};

export default cartApi;
