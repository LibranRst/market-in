import LogInForm from './LogIn.form';
import { useState } from 'react';
import SignUpForm from './SignUp.form';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, isLoading } = useUser();

  if (isAuthenticated && !isLoading) {
    return <Navigate to='/' />
  }

  if(isLoading) {
    return <div>Loading..</div>
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 bg-gradient-135 from-[#f5f7fa] to-[#c3cfe2]">
      {isLogin ? <LogInForm /> : <SignUpForm />}
      <p className="text-center text-sm">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          className="cursor-pointer font-semibold hover:underline"
          onClick={() => setIsLogin((cur) => !cur)}
        >
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
