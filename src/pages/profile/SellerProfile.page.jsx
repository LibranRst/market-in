import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '../../components/ui/Avatar';
import DynamicBreadcrumb from '../../components/ui/Dynamic-breadcrumb';
import { Star } from '../../components/ui/StarRating';
import CenteredContainer from '../../components/ui/layout/Centered-container';
import Spinner from '../../components/ui/loading/Spinner';
import ProfileProductCard from '../../components/ui/profile/Profile-ProductCard';
import { useUserProducts } from '../../hooks/products/useProducts';
import { useCalculateReviews } from '../../hooks/reviews/useCalculateReviews';
import profilesApi from '../../services/api/profilesApi';
import { useUser } from '../../hooks/auth/useUser';

const SellerProfilePage = () => {
  const { user: currentUser } = useUser();
  const { id } = useParams();
  const { products, isLoading: isProductsLoading } = useUserProducts({
    id: id,
  });
  const { data: user, isLoading } = useQuery({
    queryKey: ['seller', id],
    queryFn: () => profilesApi.getProfile(id),
  });
  const { calculateRating, rating } = useCalculateReviews();
  const navigate = useNavigate();

  useEffect(() => {
    calculateRating(products?.flatMap((product) => product.reviews));
  }, [calculateRating, products]);

  if (currentUser?.id === id) {
    navigate('/profile');
  }

  return (
    <CenteredContainer className="gap-4">
      <DynamicBreadcrumb pageName={user?.name} />

      <div className="flex w-full gap-2">
        <Avatar
          type="profile"
          className="h-[5rem] w-[5rem] shrink-0 rounded-xl"
        >
          <Avatar.Image src={user?.avatar} name={user?.name} textSize="3xl" />
          {isLoading && <Avatar.Loading />}
        </Avatar>
        <div className="flex w-full items-center justify-between rounded-xl border bg-card px-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              {user?.name}{' '}
              <span className="text-sm font-normal">@{user?.username}</span>
            </h2>
            <p className="text-sm text-gray-400">
              {user?.bio ? user?.bio : 'there is no bio for this profile.'}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1  text-lg">
              {rating}
              <Star size={20} color="#ff8f07" full={true} />
            </div>
            <p className="text-sm">Rating/Reviews</p>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-3 overflow-hidden rounded-xl border bg-card p-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">{user?.name} Products</h1>
        </div>
        <hr />
        <div className="relative grid grid-cols-2 gap-2 overflow-auto">
          {isProductsLoading || isProductsLoading ? (
            <Spinner className="h-10 w-10" />
          ) : products?.length > 0 ? (
            products?.map((product) => (
              <ProfileProductCard product={product} key={product.id} seller />
            ))
          ) : (
            <p>There is no product on your shop yet.</p>
          )}
        </div>
      </div>
    </CenteredContainer>
  );
};

export default SellerProfilePage;
