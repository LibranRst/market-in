import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/'>
      <img src="/logo.svg" className="w-32 cursor-pointer" />
    </Link>
  );
};

export default Logo;
