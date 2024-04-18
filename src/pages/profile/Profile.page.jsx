import { useEffect, useState } from 'react';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';
// import Modal from '../../ui/modals/Modal';
// import { FaTrash } from 'react-icons/fa';
// import Confirmation from '../../ui/modals/Confimation';

import { useUser } from '../../hooks/auth/useUser';

import { Link } from 'react-router-dom';
import Avatar from '../../components/ui/Avatar';
import { Button, buttonVariants } from '../../components/ui/Button';
import DynamicBreadcrumb from '../../components/ui/Dynamic-breadcrumb';
import { Separator } from '../../components/ui/Separator';
import CenteredContainer from '../../components/ui/layout/Centered-container';
import Spinner from '../../components/ui/loading/Spinner';
import ProductUserCard from '../../components/ui/profile/Profile-ProductCard';
import { useUserProducts } from '../../hooks/products/useProducts';
import { formatCurrency } from '../../utils/helpers';

// import { Form, FormInput } from '@/components/ui/form';

const ProfilePage = () => {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, isLoading } = useUser();
  const { products, isLoading: isProductsLoading } = useUserProducts();

  const [avatar, setAvatar] = useState(null); // console.log(avatar);

  useEffect(() => {
    if (avatar) {
      updateUser(
        { avatar, id: user?.$id },
        { onSuccess: () => setAvatar(null) },
      );
    }
  }, [avatar, updateUser, user?.$id]);

  return (
    <CenteredContainer className="gap-4">
      <DynamicBreadcrumb />

      <div className="flex w-full gap-2">
        <Avatar
          type="profile"
          className="h-[5rem] w-[5rem] rounded-xl"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
        >
          <Avatar.Image
            src={user?.imageUrl}
            name={user?.name}
            textSize="3xl"
          />
          {isUpdating && <Avatar.Loading />}
          {isLoading && <Avatar.Loading />}
        </Avatar>
        <div className="flex w-[calc(100%-5rem)] items-center justify-between rounded-xl border bg-card px-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-sm text-gray-400">
              {user?.bio ? user?.bio : 'there is no bio for this profile.'}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <h1 className="text-lg font-bold">
                {formatCurrency(user?.balance || 0)}
              </h1>
              <h2 className="text-sm font-normal">my Balance</h2>
            </div>
            <Separator className="h-10" orientation="vertical" />
            <Button size="sm">Top Up</Button>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-3 overflow-hidden rounded-xl border bg-card p-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">My Products</h1>
          {/* <AddProductDialog /> */}
          <Link className={buttonVariants({ size: 'sm' })} to="/product/create">
            Add Product
          </Link>
        </div>
        <hr />
        <div className="relative grid grid-cols-2 gap-2 overflow-auto">
          {isProductsLoading || isLoading ? (
            <Spinner className="h-10 w-10" />
          ) : products?.length > 0 ? (
            products?.map((product) => (
              <ProductUserCard product={product} key={product.$id} />
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
