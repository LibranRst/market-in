import { useForm } from 'react-hook-form';
import FormAuth from '../../ui/authentication/FormAuth';
import { useResetPassword } from '../../hooks/auth/useResetPassword';
import { useUser } from '../../hooks/auth/useUser';
import { Navigate } from 'react-router-dom';

const forms = [
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

const ResetPassword = () => {
  const { resetPassword, isLoading } = useResetPassword();
  const { isAuthenticated, isLoading: isLoadingUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  if(!isAuthenticated && !isLoadingUser) {
    return <Navigate to='/' />
  }

  const onSubmit = ({ password }) => {
    if (!password) return;
    resetPassword({ password }, { onSuccess: reset });
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 bg-gradient-135 from-[#f5f7fa] to-[#c3cfe2]">
      <FormAuth
        authType="forgot-password"
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        <FormAuth.Title>Reset Password</FormAuth.Title>
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

export default ResetPassword;
