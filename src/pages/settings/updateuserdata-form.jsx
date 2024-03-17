import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import FormRowVertical from '@/components/ui/Formrow-vertical';
import { Input } from '@/components/ui/Input';
// import { Form, FormInput } from '@/components/ui/form';
import Spinner from '@/components/ui/loading/Spinner';
import { Textarea } from '@/components/ui/Textarea';
import { useUpdateUser } from '@/hooks/auth/useUpdateUser';
import { useUser } from '@/hooks/auth/useUser';
import { useForm } from 'react-hook-form';

const UpdateUserDataForm = () => {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      email: user?.email,
      username: user?.user_metadata?.username,
      bio: user?.user_metadata?.bio,
    },
  });

  const onSubmit = ({ email, username, bio }) => {
    if (
      email === user?.email &&
      username === user?.user_metadata?.username &&
      bio === user?.user_metadata?.bio
    ) {
      return;
    }
    updateUser({ email, username, bio });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account account details. The Account Settings section
            allows you to update your basic information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <FormRowVertical
              label="Username"
              htmlFor={'username'}
              error={errors.username}
            >
              <Input
                id="username"
                disabled={isLoading || isUpdating}
                placeholder="input your username here..."
                className={`focus-visible:ring-0 ${
                  errors.username && 'border-destructive'
                }`}
                {...register('username', { required: 'Username is required' })}
              />
            </FormRowVertical>
            <FormRowVertical
              label="Email"
              htmlFor={'email'}
              error={errors.email}
            >
              <Input
                id="email"
                disabled={isLoading || isUpdating}
                placeholder="input your email here..."
                className={`focus-visible:ring-0 ${
                  errors.email && 'border-destructive'
                }`}
                {...register('email', { required: 'Email is required' })}
              />
            </FormRowVertical>
            <FormRowVertical label="Bio" htmlFor={'bio'} error={errors.bio}>
              <Textarea
                id="bio"
                disabled={isLoading || isUpdating}
                placeholder="input your bio here..."
                className={`focus-visible:ring-0 ${
                  errors.bio && 'border-destructive'
                }`}
                {...register('bio')}
              />
            </FormRowVertical>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            Update {isUpdating && <Spinner className={'ml-1 h-4 w-4'} />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UpdateUserDataForm;
