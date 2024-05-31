import supabase, { SUPABASE_URL } from '../supabase';

const productsApi = {
  getProducts: async ({ searchQuery, categories }) => {
    let query = supabase
      .from('products')
      .select('*, profiles(*), carts(*), reviews(*)');

    if (searchQuery) {
      query = query
        .ilike('name', `%${searchQuery}%`)
        .ilike('description', `%${searchQuery}%`);
    }

    if (categories) {
      query = query.contains('categories', categories);
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) throw new Error(error.message);

    return data;
  },
  getProduct: async ({ id }) => {
    const { data, error } = await supabase
      .from('products')
      .select('*, profiles(*), carts(*), reviews(*), orders(*)')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

    return data;
  },
  getUserProducts: async ({ id, productId }) => {
    let query = supabase
      .from('products')
      .select('*, profiles(*), carts(*), reviews(*)')
      .eq('user_id', id);

    if (productId) query = query.neq('id', productId);

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) throw new Error(error.message);

    return data;
  },

  getRelatedProducts: async ({ categories, productId }) => {
    let query = supabase.from('products').select('*, profiles(*), carts(*)');

    if (categories)
      query = query.contains('categories', categories).neq('id', productId);

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return data;
  },

  add: async ({
    name,
    description,
    price,
    stock,
    categories,
    imageFile: productImage,
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
        categories,
        image_url: `${SUPABASE_URL}/storage/v1/object/public/products/${fileName}`,
        image_filename: fileName,
        isActive: true,
        user_id: (await supabase.auth.getUser()).data.user.id,
      },
    ]);

    if (error) throw new Error(error.message);

    return data;
  },

  update: async ({
    name,
    description,
    price,
    stock,
    categories,
    imageFile,
    imageUrl,
    imageFileName,
    id,
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
        categories,
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
  },

  delete: async ({ id }) => {
    if (!id) return;

    const { data, error: deleteProductError } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select();

    if (deleteProductError) throw new Error(deleteProductError.message);

    // delete product image/file from storage
    const { error: storageError } = await supabase.storage
      .from('products')
      .remove([data[0]?.image_filename]);

    if (storageError) throw new Error(storageError.message);

    return data;
  },
};

export default productsApi;
