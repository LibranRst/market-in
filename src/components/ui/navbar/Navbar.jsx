import NavMenu from './nav-menu';
import NavSearch from './nav-search';
import NavTitle from './nav-title';

const Navbar = () => {
  return (
    <nav
      className={`sticky top-0 flex justify-center bg-background px-2 h-14 transition-all z-30 border-b `}
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
