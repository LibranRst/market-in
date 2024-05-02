import supabase, { SUPABASE_URL } from './supabase';

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, profiles(*), carts(*)');

  if (error) throw new Error(error.message);

  return data;
};

export const getProduct = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, profiles(*), carts(*)')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
export const getUserProducts = async (userId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  return data;
};

export const getCartProducts = async ({ userId, list }) => {
  const { data, error } = await supabase
    .from('carts')
    .select('*, products(*, profiles(*))')
    .eq('user_id', userId)

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
};

export const addProduct = async ({
  name,
  description,
  price,
  stock,
  category,
  imageFile: productImage,
  user_id,
}) => {
  const productName = name.split(' ').join('-').toLowerCase();
  const fileName = `product-${productName}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('products')
    .upload(fileName, productImage);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.from('products').insert([
    {
      name,
      description,
      price,
      stock,
      category,
      image_url: `${SUPABASE_URL}/storage/v1/object/public/products/${fileName}`,
      image_filename: fileName,
      isActive: true,
      user_id,
    },
  ]);

  if (error) throw new Error(error.message);

  return data;
};

export const updateProduct = async ({
  name,
  description,
  price,
  stock,
  category,
  imageFile,
  imageUrl,
  imageFileName,
  id,
  // user_id,
}) => {
  const hasFileToUpdate = imageFile !== undefined;

  let image = {
    image_url: imageUrl,
    image_filename: imageFileName,
  };

  if (hasFileToUpdate) {
    const productName = name.split(' ').join('-').toLowerCase();
    const fileName = `product-${productName}-${Math.random()}`;

    const { error } = await supabase.storage
      .from('products')
      .upload(fileName, imageFile);
    if (error) throw new Error(error.message);

    image = {
      ...image,
      image_url: `${SUPABASE_URL}/storage/v1/object/public/products/${fileName}`,
      image_filename: fileName,
    };
  }

  const { data, error } = await supabase
    .from('products')
    .update({
      name,
      description,
      price,
      stock,
      category,
      ...image,
      isActive: true,
      // user_id,
    })
    .eq('id', id)
    .select();

  if (error) {
    if (hasFileToUpdate) {
      const { error } = await supabase.storage
        .from('products')
        .remove([image.image_filename]);

      if (error) throw new Error(error.message);
    }
    throw new Error(error.message);
  }

  if (hasFileToUpdate) {
    const { error } = await supabase.storage
      .from('products')
      .remove([imageFileName]);

    if (error) throw new Error(error.message);
  }

  return data;
};

export const deleteProduct = async ({ productId }) => {
  if (!productId) return;

  const { data, error: deleteProductError } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .select();

  if (deleteProductError) throw new Error(deleteProductError.message);

  // delete product image/file from storage
  const { error: storageError } = await supabase.storage
    .from('products')
    .remove([data[0]?.image_filename]);

  if (storageError) throw new Error(storageError.message);

  return data;
};

// Products Cart

export const addProductToCart = async ({ user_id, product_id, quantity }) => {
  const { data, error } = await supabase
    .from('carts')
    .insert([
      {
        user_id,
        product_id,
        quantity,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
};

export const updateProductFromCart = async ({
  cartId,
  isChecked,
  quantity,
}) => {
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
};

export const deleteProductFromCart = async (cartId) => {
  const { data, error } = await supabase
    .from('carts')
    .delete()
    .eq('id', cartId);

  if (error) throw new Error(error.message);

  return data;
};
