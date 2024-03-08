import { useEffect, useState } from 'react';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';
// import Modal from '../../ui/modals/Modal';
// import { FaTrash } from 'react-icons/fa';
// import Confirmation from '../../ui/modals/Confimation';
import { useUser } from '../../hooks/auth/useUser';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, isLoading } = useUser();

  const [avatar, setAvatar] = useState(null);
  // console.log(avatar);

  useEffect(() => {
    if (avatar) {
      updateUser({ avatar }, { onSuccess: () => setAvatar(null) });
    }
  }, [avatar, updateUser]);

  return (
    <div className="mt-5 flex h-[calc(100dvh-7rem)] flex-col gap-4">
      <div className="flex w-full gap-3">
        <Avatar
          type="profile"
          className="h-[10rem] w-[10rem] rounded-3xl"
          onChange={(e) => setAvatar(e.target.files[0])}
        >
          <Avatar.Image
            src={user?.user_metadata?.avatar}
            name={user?.user_metadata?.username}
            textSize="3xl"
          />
          {isUpdating && <Avatar.Loading />}
          {isLoading && <Avatar.Loading />}
        </Avatar>
        <div className="flex w-[calc(100%-10rem)] items-center justify-between rounded-3xl bg-white px-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">
              {user?.user_metadata?.username}
            </h2>
            {user?.user_metadata?.bio ? (
              <p className="text-md font-medium">{user?.user_metadata?.bio}</p>
            ) : (
              <p className="text-md font-medium text-gray-400">
                there is no bio for this profile.
              </p>
            )}
          </div>
          <div className="flex items-center gap-5">
            <div className="text-center">
              <h1 className="text-xl font-bold">Rp. 1.000.000</h1>
              <h2 className="text-sm font-normal">my Balance</h2>
            </div>
            <div className="h-10 w-[2px] bg-gray-300" />
            <Button>Top Up</Button>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-3 overflow-hidden rounded-3xl bg-white p-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">My Products</h1>
          <Button>Add Product</Button>
        </div>
        <hr />
        <div className="h-full overflow-auto">
          There is no product on your shop yet.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
