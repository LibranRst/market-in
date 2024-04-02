import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/auth/useUser';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import FormRowVertical from '../../components/ui/Formrow-vertical';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import Spinner from '../../components/ui/loading/Spinner';

const UpdateUserDataForm = () => {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: user?.name,
      username: user?.username,
      bio: user?.bio,
    },
  });

  const onSubmit = ({ name, username, bio }) => {
    if (
      username === user?.username &&
      name === user?.name &&
      bio === user?.bio
    ) {
      return;
    }
    updateUser({ name, username, bio, id: user?.$id }, {});
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
          <CardDescription>
            Manage your user information. The User Settings section allows you
            to update your basic information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <FormRowVertical label="Name" htmlFor={'name'} error={errors.name}>
              <Input
                id="name"
                disabled={isLoading || isUpdating}
                placeholder="input your name here..."
                className={`focus-visible:ring-0 ${
                  errors.name && 'border-destructive'
                }`}
                {...register('name', { required: 'Name is required' })}
              />
            </FormRowVertical>
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
                {...register('username', {
                  required: 'Username is required',
                  pattern: {
                    value: /^[a-z0-9_]+$/,
                    message:
                      'Username cannot contain spaces or uppercase characters',
                  },
                })}
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
          <Button disabled={isLoading || isUpdating}>
            Update {isUpdating && <Spinner className={'ml-1 h-4 w-4'} />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UpdateUserDataForm;
