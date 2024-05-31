import Logo from '../Logo';
import NavMenu from './Nav-menu';
import NavSearch from './Nav-search';

const Navbar = () => {
  return (
    <nav
      className={`sticky top-0 z-30 flex h-14 justify-center border-b bg-background/85 px-2 backdrop-blur-md transition-all `}
    >
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        <Logo />
        <NavSearch />
        <NavMenu />
      </div>
    </nav>
  );
};

export default Navbar;
