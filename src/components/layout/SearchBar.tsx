import { ChangeEvent } from "react";

interface PropsType {
  searchValue: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}
function SearchBar({ searchValue, onSearch }: PropsType) {
  return (
    <div className="flex items-center">
      <p className="hidden text-5xl  md:block ">📽</p>
      <input
        value={searchValue}
        onChange={onSearch}
        placeholder="Search..."
        className="mt-3 w-64 rounded-lg bg-indigo-100 p-1 font-reem text-lg font-bold text-slate-900 md:w-72"
      />
      <p className="turning-element hidden text-5xl  md:block ">📽</p>
    </div>
  );
}

export default SearchBar;
