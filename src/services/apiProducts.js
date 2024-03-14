import supabase, { SUPABASE_URL } from './supabase';

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, profiles(*)');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUserProducts = async (userId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(id, name, description)')
    .eq('profile_id', userId);

  if (error) throw new Error(error.message);

  return data;
};

export const addProduct = async ({
  name,
  description,
  price,
  categories,
  imageFile: productImage,
  user_id,
}) => {
  const productName = name.split(' ').join('_');
  const fileName = `product-${productName.toLowerCase()}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('products')
    .upload(fileName, productImage);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        name,
        description,
        price,
        product_image: `${SUPABASE_URL}/storage/v1/object/public/products/${fileName}`,
        profile_id: user_id,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  const categoryInserts = categories.map((categoryId) => ({
    product_id: data[0]?.id,
    category_id: categoryId,
  }));

  const { error: categoryError } = await supabase
    .from('products_categories')
    .insert(categoryInserts);

  if (categoryError) throw new Error(categoryError.message);
};
