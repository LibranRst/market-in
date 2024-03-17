import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import SignInForm from './SignIn.form';
import FormContainer from '../../components/ui/authentication/Form-auth_container';

const SignInPage = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <FormContainer>
      <SignInForm />
      <p className="text-center text-sm">
        Don't have an account?
        <Link
          className="ml-1 cursor-pointer font-semibold hover:underline"
          to="/signup"
        >
          Sign Up
        </Link>
      </p>
    </FormContainer>
  );
};

export default SignInPage;
