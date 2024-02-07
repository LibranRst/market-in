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

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-135 from-[#f5f7fa] to-[#c3cfe2]">
      <FormAuth
        authType="signup"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <FormAuth.Title>SignUp</FormAuth.Title>
        <FormAuth.Inputs
          forms={forms}
          register={register}
          errors={errors}
          watch={watch}
        />
      </FormAuth>
    </div>
  );
};

export default SignUpPage;
