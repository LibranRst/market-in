import supabase from './supabase';

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

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
