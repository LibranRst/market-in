import { useForm } from 'react-hook-form';
import FormAuth from '../../components/ui/authentication/Form-auth';
import { useLogin } from '../../hooks/auth/useLogin';

const forms = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    validation: {
      required: 'email is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    validation: {
      required: 'password is required',
      minLength: {
        value: 8,
        message: 'Password needs a minimum of 8 characters',
      },
    },
  },
];

const SignInForm = () => {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();


  const onSubmit = ({ email, password }) => {
    if (!email || !password) return;
    login({ email, password }, { onSuccess: reset });
  };

  return (
    <FormAuth authType="login" onSubmit={handleSubmit(onSubmit)} isLoading={isLoading}>
      <FormAuth.Title>LogIn</FormAuth.Title>
      <FormAuth.Inputs
        forms={forms}
        register={register}
        errors={errors}
        watch={watch}
      />
    </FormAuth>
  );
};

export default SignInForm;
