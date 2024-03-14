// font-size: 2rem;
//   font-family: "Montserrat", sans-serif;
//   font-weight: 600;
//   letter-spacing: 3px;
//   background: -webkit-linear-gradient(180deg, var(--color-accent), var(--color-primary));
//   background-clip: text;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;

import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const NavTitle = ({ children, className }) => {
  return (
    <Link
      to="/"
      className={cn(
        'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-2xl font-semibold tracking-wide text-transparent',
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default NavTitle;
