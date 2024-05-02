import NavMenu from './Nav-menu';
import NavSearch from './Nav-search';
import NavTitle from './Nav-title';

const Navbar = () => {
  return (
    <nav
      className={`sticky top-0 flex justify-center bg-background/85 backdrop-blur-md px-2 h-14 transition-all z-30 border-b `}
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
