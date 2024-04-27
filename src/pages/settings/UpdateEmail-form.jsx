import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
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
import Spinner from '../../components/ui/loading/Spinner';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';
import { useUser } from '../../hooks/auth/useUser';

const UpdateEmailForm = () => {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      email: user?.email,
    },
  });

  // const onSubmit = ({ email, password }) => {
  //   if (email === user?.email) {
  //     return;
  //   }
  //   updateUser(
  //     { email, password, id: user?.$id },
  //     { onSuccess: () => reset({ password: '' }) },
  //   );
  // };

  const onSubmit = ({ email }) => {
    if (email === user?.email) {
      return;
    }

    updateUser({ email });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
          <CardDescription>You can change your email here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
            {/* <FormRowVertical
              label="Password"
              htmlFor={'password'}
              error={errors.password}
            >
              <Input
                id="password"
                type="password"
                disabled={isUpdating}
                placeholder="input your password here..."
                className={`focus-visible:ring-0 ${
                  errors.password && 'border-destructive'
                }`}
                {...register('password', { required: 'Password is required' })}
              />
            </FormRowVertical> */}
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

export default UpdateEmailForm;
