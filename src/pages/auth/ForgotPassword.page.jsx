import { useForm } from 'react-hook-form';
import { useForgotPassword } from '../../hooks/auth/useForgotPassword';
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
];

const ForgotPassword = () => {
  const { forgotPassword, isLoading } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = ({ email }) => {
    if (!email) return;
    forgotPassword({ email }, { onSuccess: reset });
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 bg-gradient-135 from-[#f5f7fa] to-[#c3cfe2]">
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
