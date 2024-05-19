import DynamicBreadcrumb from '@/components/ui/Dynamic-breadcrumb';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { useUpdateUser } from '@/hooks/auth/useUpdateUser';
import { useUser } from '@/hooks/auth/useUser';
import { useForm } from 'react-hook-form';
import Spinner from '@/components/ui/loading/Spinner';
import CenteredContainer from '@/components/ui/layout/Centered-container';

const SettingsPage = () => {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    values: {
      username: user?.user_metadata?.username,
      email: user?.email,
      bio: user?.user_metadata?.bio,
    },
  });

  const onSubmit = ({ email, password, username, bio }) => {
    if (
      email === user?.email &&
      username === user?.user_metadata?.username &&
      password === '' &&
      bio === user?.user_metadata?.bio
    ) {
      return;
    }
    updateUser(
      { email, password, username, bio },
      {
        onSettled: () => reset({ password: '', confirmPassword: '' }),
      },
    );
  };

  return (
    <CenteredContainer className="items-center justify-center gap-4">
      <div className="flex w-full max-w-[600px] flex-col gap-2">
        <DynamicBreadcrumb />
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account account details. The Account Settings
                section allows you to update your basic information and change
                your login credentials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    {...register('username')}
                    placeholder="Username"
                    disabled={isLoading || isUpdating}
                    className={errors?.username ? 'border-red-500' : ''}
                  />
                  {errors?.username && (
                    <p className="text-sm text-red-500">
                      {errors?.username.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register('email', {
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Please provide a valid email address',
                      },
                    })}
                    placeholder="Email"
                    disabled={isLoading || isUpdating}
                    className={errors?.email ? 'border-red-500' : ''}
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors?.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    {...register('bio', {
                      maxLength: {
                        value: 80,
                        message: 'Bio must be less than 80 characters',
                      },
                    })}
                    disabled={isLoading || isUpdating}
                    placeholder="input your bio here..."
                    className={errors?.bio ? 'border-red-500' : ''}
                  />
                  {errors?.bio && (
                    <p className="text-sm text-red-500">
                      {errors?.bio.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register('password', {
                      minLength: {
                        value: 8,
                        message: 'Password needs a minimum of 8 characters',
                      },
                    })}
                    disabled={isLoading || isUpdating}
                    className={errors?.password ? 'border-red-500' : ''}
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors?.password.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    {...register('confirmPassword', {
                      validate: (value) =>
                        getValues().password === value ||
                        'Passwords do not match',
                    })}
                    disabled={isLoading || isUpdating}
                    className={errors?.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors?.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors?.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Update {isUpdating && <Spinner className={'ml-1 w-4 h-4'} />}</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </CenteredContainer>
  );
};

export default SettingsPage;
