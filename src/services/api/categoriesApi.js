import supabase from '../supabase';

const categoriesApi = {
  get: async () => {
    const { data, error } = await supabase.from('categories').select('*');

    if (error) throw new Error(error.message);

    return data;
  },
};

export default categoriesApi;
