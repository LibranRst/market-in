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
  // user_id,
}) => {
  const hasFileToUpdate = imageFile !== undefined;
  console.log(id);

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
      if (hasFileToUpdate) {
        await storage.deleteFile(appwriteConfig.storageId, image.imageId);
      }
      throw Error;
    }

    if (hasFileToUpdate) {
      await storage.deleteFile(appwriteConfig.storageId, imageId);
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
};

// Products Cart

export const addProductToCart = async ({ userId, productId, quantity }) => {
  try {
    const newCart = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      ID.unique(),
      {
        user: userId,
        product: productId,
        quantity,
      },
    );

    if (!newCart) throw Error;

    return newCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductFromCart = async ({ cartId, quantity }) => {
  try {
    const updatedCart = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      cartId,
      {
        quantity,
      },
    );

    if (!updatedCart) throw Error;

    return updatedCart;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteProductFromCart = async (cartId) => {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      cartId,
    );

    if (!statusCode) throw Error;

    return { status: 'Ok' };
  } catch (err) {
    throw new Error(err.message);
  }
};
