import supabase from './supabase';

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, category, product_image, rating');

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

