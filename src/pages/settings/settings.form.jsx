import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormInput } from '@/components/ui/form';
import Spinner from '@/components/ui/loading/Spinner';
import { useUpdateUser } from '@/hooks/auth/useUpdateUser';
import { useUser } from '@/hooks/auth/useUser';
import { useForm } from 'react-hook-form';
// import { useForm } from 'react-hook-form';

const SettingsForm = () => {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const methods = useForm({
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
        onSettled: () => methods.reset({ password: '', confirmPassword: '' }),
      },
    );
  };

  return (
    <Form onSubmit={onSubmit} methods={methods}>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account account details. The Account Settings section
          allows you to update your basic information and change your login
          credentials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <FormInput
            isLoading={isLoading || isUpdating}
            inputType={'input'}
            type={'text'}
            name={'username'}
            label={'Username'}
            placeholder={'update your username here...'}
            validation={{ required: 'username is required' }}
          />
          <FormInput
            isLoading={isLoading || isUpdating}
            inputType={'input'}
            type={'email'}
            name={'email'}
            label={'Email'}
            placeholder={'update your email here...'}
            validation={{
              required: 'email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address',
              },
            }}
          />
          <FormInput
            isLoading={isLoading || isUpdating}
            inputType={'textarea'}
            type={'text'}
            name={'bio'}
            label={'Bio'}
            placeholder={'update your bio here...'}
            validation={{
              required: 'bio is required',
              maxLength: {
                value: 80,
                message: 'Bio must be less than 80 characters',
              },
            }}
          />
          <FormInput
            isLoading={isLoading || isUpdating}
            inputType={'input'}
            type={'password'}
            name={'password'}
            label={'Password'}
            placeholder={'update your password here...'}
            validation={{
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            }}
          />
          <FormInput
            isLoading={isLoading || isUpdating}
            inputType={'input'}
            type={'password'}
            name={'confirmPassword'}
            label={'Confirm Password'}
            placeholder={'confirm your password here...'}
            validation={{
              validate: (value) =>
                methods.getValues().password === value ||
                'Passwords do not match',
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>
          Update {isUpdating && <Spinner className={'ml-1 h-4 w-4'} />}
        </Button>
      </CardFooter>
    </Form>
  );
};

export default SettingsForm;
