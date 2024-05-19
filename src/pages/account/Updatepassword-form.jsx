import { useForm } from 'react-hook-form';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import FormRowVertical from '../../components/ui/Formrow-vertical';
import { Button } from '../../components/ui/Button';
import Spinner from '../../components/ui/loading/Spinner';

const UpdatePasswordForm = () => {
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = ({ password }) => {
    if (password === '') {
      return;
    }
    updateUser(
      { password },
      {
        onSuccess: () => reset({ password: '', confirmPassword: '' }),
      },
    );
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>You can change your password here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* <FormRowVertical
              label="Old Password"
              htmlFor={'oldPassword'}
              error={errors.oldPassword}
            >
              <Input
                id="oldPassword"
                type="password"
                disabled={isUpdating}
                placeholder="input your old password here..."
                className={`focus-visible:ring-0 ${
                  errors.oldPassword && 'border-destructive'
                }`}
                {...register('oldPassword', {
                  required: 'Old Password is required',
                })}
              />
            </FormRowVertical> */}
            <FormRowVertical
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
                {...register('password', {
                  required: 'Password is required',
                })}
              />
            </FormRowVertical>
            <FormRowVertical
              label="Confirm Password"
              htmlFor={'confirmPassword'}
              error={errors.confirmPassword}
            >
              <Input
                id="confirmPassword"
                type="password"
                disabled={isUpdating}
                placeholder="confirm your password here..."
                className={`focus-visible:ring-0 ${
                  errors.confirmPassword && 'border-destructive'
                }`}
                {...register('confirmPassword', {
                  validate: (value) =>
                    getValues().password === value || 'Passwords do not match',
                })}
              />
            </FormRowVertical>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={isUpdating}>
            Update {isUpdating && <Spinner className={'ml-1 h-4 w-4'} />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UpdatePasswordForm;
