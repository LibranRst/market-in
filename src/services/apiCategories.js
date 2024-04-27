import supabase from './supabase';

export const getCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) throw new Error(error.message);

  return data;
};
