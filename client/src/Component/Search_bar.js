import React from "react";

function SearchBar({setSidebarOpen,handleSearchChange,search}){
    return (
<header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            <div className="relative mx-4 lg:mx-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              </span>
              <input
                className="w-32 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600"
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </header>
    )
}

export default SearchBar;