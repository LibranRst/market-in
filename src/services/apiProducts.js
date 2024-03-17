import supabase, { SUPABASE_URL } from './supabase';

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, profiles(*), categories(id, name, description)');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getProduct = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, profiles(*), categories(id, name, description)')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

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
  stock,
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
        stock,
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

export const deleteProduct = async (id) => {
  // Delete product categories
  const { error: productCategoriesError } = await supabase
    .from('products_categories')
    .delete()
    .eq('product_id', id);

  if (productCategoriesError) throw new Error(productCategoriesError.message);

  // Delete product
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  // Delete product image from storage
  const { data: productListImage } = await supabase.storage
    .from('products')
    .list();
  const productName = data[0]?.name?.split(' ').join('_');
  const existingProductImage = productListImage.find((item) =>
    item.name.includes(productName.toLowerCase()),
  );

  if (existingProductImage) {
    const { error: deleteError } = await supabase.storage
      .from('products')
      .remove([existingProductImage.name]);
    if (deleteError) throw new Error(deleteError.message);
  }

  return data;
};
