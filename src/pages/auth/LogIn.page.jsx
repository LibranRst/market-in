import { useForm } from 'react-hook-form';
import FormAuth from '../../ui/authentication/FormAuth';

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

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <div className="bg-gradient-135 flex h-screen items-center justify-center from-[#f5f7fa] to-[#c3cfe2]">
      <FormAuth
        authType="login"
        onSubmit={handleSubmit((data) => alert(`Logged in as ${data.email}`))}
      >
        <FormAuth.Title>LogIn</FormAuth.Title>
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

export default LogInPage;
