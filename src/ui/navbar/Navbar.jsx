import NavMenu from './NavMenu';
import NavSearch from './NavSearch';
import NavTitle from './NavTitle';

const Navbar = () => {
  return (
    <nav
      className={`sticky top-0 flex justify-center bg-white px-2 py-3 transition-all z-[99] `}
    >
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        <NavTitle>marketIn.</NavTitle>
        <NavSearch />
        <NavMenu />
      </div>
    </nav>
  );
};

export default Navbar;
