export default function SearchBar() {
  return (
    <>
      <div className="w-full xl:w-96 hidden md:block">
        {/* <div className="relative ml-10 bg-gray-dark  flex w-full flex-wrap items-stretch border border-gray rounded"> */}
        <div className="relative ml-10 bg-gray-dark flex items-center border border-gray rounded">
          <input
            type="search"
            className="block w-full px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 bg-gray-dark bg-clip-padding rounded outline-none transition duration-200 ease-in-out"
            placeholder="Search"
            label="Search"
          />

          {/* <!--Search icon--> */}
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="md:hidden">
        {/* <!--Search icon--> */}
        <span
          className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
          id="basic-addon2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </>
  );
}
