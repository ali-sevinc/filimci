import { ChangeEvent, useEffect, useRef } from "react";

interface PropsType {
  searchValue: string;
  onSearch: (value: string) => void;
}
function SearchBar({ searchValue, onSearch }: PropsType) {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value);
  }

  useEffect(
    function () {
      function hitEnter(event: KeyboardEvent) {
        if (document.activeElement === searchRef.current) return;
        if (event.code === "Enter") {
          searchRef.current?.focus();
          onSearch("");
        }
      }
      document.addEventListener("keydown", hitEnter);
      return () => document.removeEventListener("keydown", hitEnter);
    },
    [onSearch],
  );

  return (
    <div className="flex items-center">
      <p className="hidden text-5xl  md:block ">📽</p>
      <input
        ref={searchRef}
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search..."
        className="mt-3 w-64 rounded-lg bg-indigo-100 p-1 font-reem text-lg font-bold text-slate-900 md:w-72"
      />
      <p className="turning-element hidden text-5xl  md:block ">📽</p>
    </div>
  );
}

export default SearchBar;
