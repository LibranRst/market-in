import { useSignup } from '../../hooks/auth/useSignup';
import FormAuth from '../../ui/authentication/FormAuth';
import { useForm } from 'react-hook-form';

const forms = [
  {
    label: 'Username',
    name: 'username',
    type: 'text',
    validation: {
      required: 'username is required',
    },
  },
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

const SignUpForm = () => {
  const { signup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = ({ username, email, password }) => {
    signup(
      { username, email, password },
      { onSuccess: reset },
    );
  };

  return (
    <FormAuth
      authType="signup"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <FormAuth.Title>SignUp</FormAuth.Title>
      <FormAuth.Inputs
        forms={forms}
        register={register}
        errors={errors}
        watch={watch}
      />
    </FormAuth>
  );
};

export default SignUpForm;
