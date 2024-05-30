import { Link } from 'react-router-dom';
import FormContainer from '../../components/ui/authentication/Form-auth_container';
import SignUpForm from './SignUp.form';

const SignUpPage = () => {
  
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
