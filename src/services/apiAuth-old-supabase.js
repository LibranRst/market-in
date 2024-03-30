import supabase, { SUPABASE_URL } from './supabase';

export const signup = async ({ username, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar: '',
        bio: '',
        address: {
          city: '',
          country: '',
          postalCode: '',
          province: '',
          street: '',
          streetNumber: '',
          additionalInfo: '',
          fullAddress: '',
        },
        balance: 0,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const forgotPassword = async ({ email }) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/reset-password',
  });

  if (error) throw new Error(error.message);

  return data;
};

export const changePassword = async ({ password }) => {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) throw new Error(error.message);

  return data;
};

export const updateCurrentUser = async ({
  email,
  username,
  password,
  avatar,
  bio,
}) => {
  // 1. Update Password OR username
  let updateData = {};
  if (email || username || bio)
    updateData = { ...updateData, email, data: { username, bio } };
  if (password) updateData = { ...updateData, password };

  const { data, error } = await supabase.auth.updateUser(updateData, {
    emailRedirectTo: 'http://localhost:5173/settings',
  });

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  //  2.1 check if image is valid
  if (!validImageTypes.includes(avatar.type))
    throw new Error('Invalid image type, must be JPEG, PNG or GIF');

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  //  2.2 Delete previous avatar by checking if it exists
  const { data: avatarList } = await supabase.storage.from('avatars').list();
  const existingAvatar = avatarList.find((item) =>
    item.name.includes(data?.user?.id),
  );

  if (existingAvatar) {
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([existingAvatar.name]);
    if (deleteError) throw new Error(deleteError.message);
  }

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Upload avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
