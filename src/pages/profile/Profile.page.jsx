import { useEffect, useState } from 'react';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';
// import Modal from '../../ui/modals/Modal';
// import { FaTrash } from 'react-icons/fa';
// import Confirmation from '../../ui/modals/Confimation';
import Avatar from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useUser } from '../../hooks/auth/useUser';

import DynamicBreadcrumb from '@/components/ui/Dynamic-breadcrumb';
import CenteredContainer from '@/components/ui/layout/Centered-container';
import { useUserProducts } from '@/hooks/products/useProducts';
import Spinner from '../../components/ui/loading/Spinner';
import AddProductDialog from '../../components/ui/profile/Addproduct-dialog';
import ProductUserCard from '../../components/ui/product/Profile-productcard';
import { Separator } from '../../components/ui/Separator';

// import { Form, FormInput } from '@/components/ui/form';

const ProfilePage = () => {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, isLoading } = useUser();
  const { products, isLoading: isProductsLoading } = useUserProducts();

  const [avatar, setAvatar] = useState(null); // console.log(avatar);

  useEffect(() => {
    if (avatar) {
      updateUser({ avatar }, { onSuccess: () => setAvatar(null) });
    }
  }, [avatar, updateUser]);

  return (
    <CenteredContainer className="gap-4">
      <DynamicBreadcrumb />

      <div className="flex w-full gap-2">
        <Avatar
          type="profile"
          className="h-[5rem] w-[5rem] rounded-md"
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
        <div className="flex w-[calc(100%-5rem)] items-center justify-between rounded-md border bg-card px-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              {user?.user_metadata?.username}
            </h2>
            <p className="text-sm text-gray-400">
              {user?.user_metadata?.bio
                ? user?.user_metadata?.bio
                : 'there is no bio for this profile.'}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <h1 className="text-lg font-bold">Rp. 1.000.000.000</h1>
              <h2 className="text-sm font-normal">my Balance</h2>
            </div>
            <Separator className="h-10" orientation='vertical' />
            <Button size="sm">Top Up</Button>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-3 overflow-hidden rounded-md border bg-card p-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">My Products</h1>
          <AddProductDialog />
        </div>
        <hr />
        <div className="relative grid grid-cols-2 gap-2 overflow-auto">
          {isProductsLoading ? (
            <Spinner className="h-10 w-10" />
          ) : products.length > 0 ? (
            products?.map((product) => (
              <ProductUserCard product={product} key={product.id} />
            ))
          ) : (
            <p>There is no product on your shop yet.</p>
          )}
        </div>
      </div>
    </CenteredContainer>
  );
};

export default ProfilePage;
