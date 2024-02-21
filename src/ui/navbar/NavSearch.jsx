import { GoSearch } from 'react-icons/go';

const NavSearch = () => {
  return (
    <form className="relative flex w-full max-w-[500px] items-center transition-all focus-within:max-w-[520px]">
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-lg bg-gray-100 px-3 py-1 outline-none"
      />
      <button className="absolute right-2">
        <GoSearch size={20} />
      </button>
    </form>
  );
};

export default NavSearch