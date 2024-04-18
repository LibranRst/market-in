import { ID, Query } from 'appwrite';
import { account, appwriteConfig, databases, storage } from './appwrite';

export const signup = async ({ name, username, email, password }) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw new Error('Sign up failed. Please try again.');

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: username,
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveUserToDB = async (user) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user,
    );

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const session = await account.createEmailSession(email, password);

    if (!session)
      throw new Error('Something went wrong, Please login your new account.');

    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const cookieFallback = localStorage.getItem('cookieFallback');
    if (
      cookieFallback === '[]' ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      return null;
    }

    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCurrentUser = async ({
  email,
  name,
  username,
  password,
  oldPassword,
  avatar,
  bio,
  id,
}) => {
  try {
    let updateData = {};
    if (name || username || bio) {
      await account.updateName(name);
      updateData = { ...updateData, name, username, bio };
    }

    if (email) {
      try {
        await account.updateEmail(email, password);
        updateData = { ...updateData, email };
      } catch (error) {
        throw new Error('Password is incorrect');
      }
    }

    if (password && oldPassword) {
      try {
        const response = await account.updatePassword(password, oldPassword);
        return response;
      } catch (error) {
        throw new Error('Old password is incorrect');
      }
    }

    const { imageUrl, imageId } = await getCurrentUser();
    if (avatar) {
      // upload file to storage

      const uploadedFile = await uploadFile(avatar);

      if (!uploadedFile) throw Error;

      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id);
        throw Error;
      }

      updateData = {
        ...updateData,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
      };
    }

    const data = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      id,
      updateData,
    );

    if (!data) {
      if (imageUrl && imageId) {
        await storage.deleteFile(appwriteConfig.storageId, updateData.imageId);
      }
      throw Error;
    }

    if (imageUrl && imageId && updateData.imageId !== imageId) {
      await storage.deleteFile(appwriteConfig.storageId, imageId);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadFile = async (file) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
    );

    return uploadedFile;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getFilePreview = (fileId) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      500,
      500,
      'center',
      50,
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    console.log(error);
  }
};

// export const forgotPassword = async ({ email }) => {
//   const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: 'http://localhost:5173/reset-password',
//   });

//   if (error) throw new Error(error.message);

//   return data;
// };

// export const changePassword = async ({ password }) => {
//   const { data, error } = await supabase.auth.updateUser({ password });

//   if (error) throw new Error(error.message);

//   return data;
// };
