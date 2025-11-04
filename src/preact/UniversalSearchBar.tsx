import React from "preact/compat";
import { useState } from "preact/hooks";

interface SearchBarProps {
  initialQuery?: string;
}

function UniversalSearchBar({ initialQuery }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery ?? "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setQuery(target.value);
    // Lógica de autocompletado futura...
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() === "") return;
    if (query.length < 3) return;

    console.log("Buscando:", query);
    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex items-center w-full relative group"
    >
      <div className="w-full flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="DCP-T230, MFC-L8900, L3250, G4100..."
          aria-label="Barra de búsqueda principal"
          className="p-2 shadow-lg outline-none ps-4 pr-12 block w-full rounded-xl sm:text-lg font-secondary border-2 focus:border-blue-500 border-transparent disabled:opacity-50 disabled:pointer-events-none transition duration-200 dark:bg-neutral-800 placeholder-neutral-400 dark:placeholder-neutral-600 text-neutral-600 dark:text-neutral-400"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 text-neutral-400 hover:text-blue-400 group-focus-within:text-blue-500 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default UniversalSearchBar;
