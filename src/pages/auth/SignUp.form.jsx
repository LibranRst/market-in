import { useForm } from 'react-hook-form';
import FormAuth from '../../components/ui/authentication/Form-auth';
import { useSignup } from '../../hooks/auth/useSignup';

const forms = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    validation: {
      required: 'Name is required',
    },
  },
  {
    label: 'Username',
    name: 'username',
    type: 'text',
    validation: {
      required: 'Username is required',
      pattern: {
        value: /^[a-z0-9_]+$/,
        message: 'Lowercase letters, and numbers only. No spaces',
      },
    },
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    validation: {
      required: 'Email is required',
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
      required: 'Password is required',
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

  const onSubmit = ({ name, username, email, password }) => {
    signup({ name, username, email, password }, { onSuccess: reset });
  };

  // Appwrite
  // const { signup, isLoading: isCreatingUser } = useSignup();
  // const { login, isLoading: isSigningIn } = useLogin();

  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  //   watch,
  //   reset,
  // } = useForm();

  // const onSubmit = async (values) => {
  //   try {
  //     await signup(values);
  //     await login(
  //       {
  //         email: values.email,
  //         password: values.password,
  //       },
  //       { onSuccess: reset },
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
