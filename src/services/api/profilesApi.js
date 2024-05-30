import supabase from '../supabase';

const profilesApi = {
  getProfile: async (id) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, reviews(*)')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

    return data;
  },
};

export default profilesApi;
