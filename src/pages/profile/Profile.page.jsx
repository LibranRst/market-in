import { useState } from 'react';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';
import Spinner from '../../ui/loading/Spinner';

const ProfilePage = () => {
  const { updateUser, isUpdating } = useUpdateUser();

  const [avatar, setAvatar] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!avatar) return;
    updateUser(
      { avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      },
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Profile</h1>
        <label htmlFor="avatar">Update Avatar</label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          name="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <button type="submit">{isUpdating ? <Spinner /> : 'Update'}</button>
      </form>
    </div>
  );
};

export default ProfilePage;
