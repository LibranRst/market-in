import { useEffect, useState } from 'react';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';
// import Modal from '../../ui/modals/Modal';
// import { FaTrash } from 'react-icons/fa';
// import Confirmation from '../../ui/modals/Confimation';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUser } from '../../hooks/auth/useUser';

import DynamicBreadcrumb from '@/components/ui/dynamic-breadcrumb';
import CenteredContainer from '@/components/ui/layout/centered-container';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormInput } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const ProfilePage = () => {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, isLoading } = useUser();
  const methods = useForm({
    defaultValues: {
      price: 0,
    },
  });

  const [avatar, setAvatar] = useState(null);
  // console.log(avatar);

  useEffect(() => {
    if (avatar) {
      updateUser({ avatar }, { onSuccess: () => setAvatar(null) });
    }
  }, [avatar, updateUser]);

  const onSubmit = (data) => {
    console.log(data);
  };

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
            <div className="h-10 w-[1px] bg-accent" />
            <Button size="sm">Top Up</Button>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-3 overflow-hidden rounded-md border bg-card p-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">My Products</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <Form methods={methods} onSubmit={onSubmit}>
                <DialogHeader>
                  <DialogTitle>Product</DialogTitle>
                  <DialogDescription>
                    Add a new product to your shop.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <FormInput
                    name={'name'}
                    labelPosition="left"
                    label={'Name'}
                    placeholder="Name of your product..."
                    validation={{ required: 'Name of the product is required' }}
                  />
                  <FormInput
                    inputType="textarea"
                    name="description"
                    label="Description"
                    type="text"
                    className="min-h-[100px]"
                    labelPosition="left"
                    placeholder="Description of your product..."
                    validation={{
                      required: 'Description of the product is required',
                    }}
                  />
                  <FormInput
                    name="price"
                    label="Price"
                    type="text"
                    labelPosition="left"
                    setValue
                    onChange={(e) =>
                      methods.setValue(
                        'price',
                        isNaN(Number(e.target.value))
                          ? methods.getValues().price
                          : Number(e.target.value),
                      )
                    }
                    placeholder="$0"
                    validation={{
                      required: 'Price of the product is required',
                    }}
                  />
                  <div className="flex flex-col">
                    <div className="grid grid-cols-5 gap-4">
                      <Label htmlFor="category" className="m-2 text-right">
                        Category
                      </Label>
                      <Select
                        name="category"
                        id="category"
                        onValueChange={(value) =>
                          methods
                            .register('category')
                            .onChange({ target: { name: 'category', value } })
                        }
                      >
                        <SelectTrigger className="col-span- w-[200px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronic">Electronic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <hr />
        <div className="h-full overflow-auto">
          There is no product on your shop yet.
        </div>
      </div>
    </CenteredContainer>
  );
};

export default ProfilePage;
