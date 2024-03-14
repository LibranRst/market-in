import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FormRowVertical from '@/components/ui/formrow-vertical';
import { Input } from '@/components/ui/input';
// import { Form, FormInput } from '@/components/ui/form';
import Spinner from '@/components/ui/loading/spinner';
import { useUpdateUser } from '@/hooks/auth/useUpdateUser';
import { useForm } from 'react-hook-form';

const UpdatePasswordForm = () => {
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = ({ password }) => {
    if (password === '') {
      return;
    }
    updateUser({ password });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>You can change your password here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <FormRowVertical
              label="Password"
              htmlFor={'password'}
              error={errors.password}
            >
              <Input
                id="password"
                disabled={isUpdating}
                placeholder="input your password here..."
                className={`focus-visible:ring-0 ${
                  errors.password && 'border-destructive'
                }`}
                {...register('password', { required: 'Password is required' })}
              />
            </FormRowVertical>
            <FormRowVertical
              label="Confirm Password"
              htmlFor={'confirmPassword'}
              error={errors.confirmPassword}
            >
              <Input
                id="confirmPassword"
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
          <Button>
            Update {isUpdating && <Spinner className={'ml-1 h-4 w-4'} />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UpdatePasswordForm;
