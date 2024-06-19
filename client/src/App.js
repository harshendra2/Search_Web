import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './Component/Search_bar';
import Pagination from './Component/pagination';
import Table from './Component/Table';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterGenre, setFilterGenre] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6; 

  useEffect(() => {
    const base_url = 'https://search-server-668i.onrender.com/api/movies';

    const getAllMovies = async () => {
      try {
        const url = `${base_url}?page=${currentPage}&sort=${sort.sort},${sort.order}&genre=${filterGenre.toString()}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getAllMovies();
  }, [sort, filterGenre, search,currentPage]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleGenreChange = (temp) => {
    const genreIndex = filterGenre.indexOf(temp);
    if (genreIndex === -1) {
      setFilterGenre([...filterGenre, temp]);
    } else {
      const newFilterGenre = [...filterGenre];
      newFilterGenre.splice(genreIndex, 1);
      setFilterGenre(newFilterGenre);
    }
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(obj.movies?.length / perPage);


  return (
    <div className="flex h-screen bg-gray-200">
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}
      >
        <nav className="mt-10 px-4">
          <div className="relative inline-block text-left mb-4">
            <select
              value={`${sort.sort},${sort.order}`}
              onChange={(e) => {
                const [sortValue, sortOrder] = e.target.value.split(',');
                setSort({ sort: sortValue, order: sortOrder });
              }}
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="rating,desc">Rating</option>
              <option value="title,asc">Title A-Z</option>
              <option value="title,desc">Title Z-A</option>
              <option value="year,desc">Year (newest)</option>
              <option value="year,asc">Year (oldest)</option>
            </select>
          </div>

          <p className="text-white pt-3 pb-1 font-semibold px-4">Filter By Genre</p>

          <div className="flex flex-wrap justify-start px-4">
            {obj.genres?.map((temp, index) => (
              <div key={index} className="inline-block relative mb-2 mr-2">
                <input
                  type="checkbox"
                  id={`genre-${temp}`}
                  className="hidden"
                  checked={filterGenre.includes(temp)}
                  onChange={() => handleGenreChange(temp)}
                />
                <label
                  htmlFor={`genre-${temp}`}
                  className="block appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight cursor-pointer text-center w-24"
                >
                  {temp}
                </label>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <SearchBar setSidebarOpen={setSidebarOpen} handleSearchChange={handleSearchChange} search={search}/>

       <Table obj={obj}/>

        <Pagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>

      </div>
    </div>
  );
}

export default App;
