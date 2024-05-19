import supabase from './supabase';

export const topup = async ({ balance, currentBalance }) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ balance: balance + currentBalance })
    .eq('id', (await supabase.auth.getUser()).data.user.id);

  if (error) throw new Error(error.message);

  return data;
};

export const checkout = async ({ carts }) => {
  // const { error: errorUpdateUser } = await supabase.auth.updateUser({
  //   data: {
  //     balance: currentBalance - price,
  //   },
  // });

  // if (errorUpdateUser) throw new Error(errorUpdateUser.message);

  const userId = (await supabase.auth.getUser()).data.user.id;

  const orderedItems = carts?.map((cart) => ({
    customer_id: userId,
    product_id: cart?.id,
    quantity: cart?.quantity,
    totalPrice: cart?.price * cart?.quantity,
    seller_id: cart?.sellerId,
  }));

  const { data, error } = await supabase.from('orders').insert(orderedItems);

  if (error) throw new Error(error.message);

  const { error: cartError } = await supabase
    .from('carts')
    .delete()
    .in(
      'id',
      carts.map((cart) => cart?.cartProductId || cart?.cartId),
    );

  if (cartError) throw new Error(cartError.message);

  localStorage.removeItem('selectedProducts');

  return data;
};
