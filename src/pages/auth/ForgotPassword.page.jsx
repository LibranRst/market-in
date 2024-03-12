import { useUser } from '@/hooks/auth/useUser';
import { useForm } from 'react-hook-form';
import FormAuth from '../../components/ui/authentication/FormAuth';
import { useForgotPassword } from '../../hooks/auth/useForgotPassword';
import { Navigate } from 'react-router-dom';

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
];

const ForgotPassword = () => {
  const { forgotPassword, isLoading } = useForgotPassword();
  const { isAuthenticated, isLoading: isLoadingUser } = useUser();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  if (isAuthenticated && !isLoadingUser) {
    return <Navigate to="/" />;
  }

  if (isLoadingUser) {
    return <div>Loading..</div>;
  }
  
  const onSubmit = ({ email }) => {
    if (!email) return;
    forgotPassword({ email }, { onSuccess: reset });
  };


  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 bg-background-gradient">
      <FormAuth
        authType="forgot-password"
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        <FormAuth.Title>Send Email</FormAuth.Title>
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

export default ForgotPassword;
