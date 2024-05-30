import { GoSearch } from 'react-icons/go';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const NavSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const search = e.target.search.value;

    if (search) {
      searchParams.set('q', search);
      setSearchParams(searchParams);
      if (pathname !== '/') navigate(`/?q=${search}`, { replace: true });
    } else {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
  };

  return (
    <form
      className="relative flex w-full max-w-[500px] items-center transition-all focus-within:max-w-[520px]"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search"
        name="search"
        className="w-full rounded-lg bg-accent px-3 py-1 outline-none"
      />
      <button className="absolute right-2">
        <GoSearch size={20} />
      </button>
    </form>
  );
};

export default NavSearch;
