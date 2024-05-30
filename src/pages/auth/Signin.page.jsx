import { Link } from 'react-router-dom';
import FormContainer from '../../components/ui/authentication/Form-auth_container';
import SignInForm from './SignIn.form';

const SignInPage = () => {
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
