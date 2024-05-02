import supabase, { SUPABASE_URL } from './supabase.js';

export const signup = async ({ name, username, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        username,
        avatar: '',
        avatar_filename: '',
        bio: '',
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

  const { data: authData, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('carts(*, products(*, profiles(*)))')
    .eq('id', authData?.user.id)
    .single();

  if (profileError) throw new Error(profileError.message);

  return { ...profileData, ...authData?.user };
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
  name,
  username,
  password,
  avatar,
  bio,
}) => {
  // 1. Update Password OR username
  let updateData = {};
  if (email) updateData = { ...updateData, email };
  if (name || username || bio)
    updateData = { ...updateData, data: { name, username, bio } };
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

  //  2.2 Delete Previous Avatar if it exist
  const isExist = data?.user?.user_metadata?.avatar_filename;

  if (isExist) {
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .remove([isExist]);

    if (uploadError) throw new Error(uploadError.message);
  }

  let fileName = `avatar-${data.user.id}-${Math.random()}`;

  //  2.3 Upload Avatar to storage
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Upload avatar in the user
  const { data: updatedUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
        avatar_filename: fileName,
      },
    });

  if (updateAvatarError) throw new Error(updateAvatarError.message);

  return updatedUser;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
