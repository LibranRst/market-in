import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import SignUpForm from './SignUp.form';
import FormContainer from '@/components/ui/authentication/form-auth_container';

const SignUpPage = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <FormContainer>
      <SignUpForm />
      <p className="text-center text-sm">
        Already have an account?
        <Link
          className="ml-1 cursor-pointer font-semibold hover:underline"
          to="/signin"
        >
          Sign In
        </Link>
      </p>
    </FormContainer>
  );
};

export default SignUpPage;
