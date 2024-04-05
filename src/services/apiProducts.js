import { ID, Query } from 'appwrite';
import { getFilePreview, uploadFile } from './apiAuth';
import { appwriteConfig, databases, storage } from './appwrite';

export const getProducts = async () => {
  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
    );

    if (!products) throw Error;

    return products.documents;
  } catch (error) {
    throw new Error(error.message);
  }
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*, profiles(*), categories(id, name, description)');

  // if (error) {
  //   throw new Error(error.message);
  // }

  // return data;
};

export const getProduct = async (id) => {
  try {
    const product = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      id,
    );

    if (!product) throw Error;

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*, profiles(*), categories(id, name, description)')
  //   .eq('id', id)
  //   .single();

  // if (error) throw new Error(error.message);

  // return data;
};
export const getUserProducts = async (userId) => {
  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [Query.equal('seller', userId), Query.orderDesc('$createdAt')],
    );

    if (!products) throw Error;

    return products.documents;
  } catch (error) {
    throw new Error(error.message);
  }
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*, categories(id, name, description)')
  //   .eq('profile_id', userId);

  // if (error) throw new Error(error.message);

  // return data;
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
  try {
    // if (categories.length > 2)
    //   throw new Error('You can only add up to 2 categories');

    const uploadedFile = await uploadFile(productImage);

    if (!uploadedFile) throw Error;

    // Get File Url
    const fileUrl = await getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id);
      throw Error;
    }

    const newProduct = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      ID.unique(),
      {
        seller: user_id,
        category,
        name,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        description,
        price,
        isActive: true,
        stock,
      },
    );

    if (!newProduct) {
      await storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id);
      throw Error;
    }

    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async ({
  name,
  description,
  price,
  stock,
  category,
  imageFile,
  imageUrl,
  imageId,
  id,
  user_id,
}) => {
  const hasFileToUpdate = imageFile !== undefined;
  console.log(id)

  try {
    let image = {
      imageUrl: imageUrl,
      imageId: imageId,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(imageFile);

      if (!uploadedFile) throw Error;

      // Get File Url
      const fileUrl = await getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    const updatedProduct = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      id,
      {
        category,
        name,
        ...image,
        description,
        price,
        stock,
      },
    );

    if (!updatedProduct) {
      if(hasFileToUpdate) {
        await storage.deleteFile(appwriteConfig.storageId, image.imageId);
      }
      throw Error;
    }

    if(hasFileToUpdate) {
      await storage.deleteFile(appwriteConfig.storageId, imageId)
    }

    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async ({ productId, imageId }) => {
  if (!productId || !imageId) return;
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      productId,
    );

    if (!statusCode) throw Error;

    await storage.deleteFile(appwriteConfig.storageId, imageId);

    return { status: 'Ok' };
  } catch (error) {
    throw new Error(error.message);
  }
  // Delete product categories
  // const { error: productCategoriesError } = await supabase
  //   .from('products_categories')
  //   .delete()
  //   .eq('product_id', id);

  // if (productCategoriesError) throw new Error(productCategoriesError.message);

  // // Delete product
  // const { data, error } = await supabase
  //   .from('products')
  //   .delete()
  //   .eq('id', id)
  //   .select();

  // if (error) throw new Error(error.message);

  // // Delete product image from storage
  // const { data: productListImage } = await supabase.storage
  //   .from('products')
  //   .list();
  // const productName = data[0]?.name?.split(' ').join('_');
  // const existingProductImage = productListImage.find((item) =>
  //   item.name.includes(productName.toLowerCase()),
  // );

  // if (existingProductImage) {
  //   const { error: deleteError } = await supabase.storage
  //     .from('products')
  //     .remove([existingProductImage.name]);
  //   if (deleteError) throw new Error(deleteError.message);
  // }

  // return data;
};
