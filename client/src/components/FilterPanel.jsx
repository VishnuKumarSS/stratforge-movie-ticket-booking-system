import React, { useState } from "react";

export default function FilterPanel({ onFilterChange, genres }) {
  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    release_date: "",
    ordering: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  // Clear all filters
  const handleClear = () => {
    setFilters({
      title: "",
      genre: "",
      release_date: "",
      ordering: "",
    });
    onFilterChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg outline-2 outline-dashed outline-slate-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Movies</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title search */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={filters.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="Search by title..."
          />
        </div>

        {/* Genre filter */}
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={filters.genre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Release date filter */}
        <div>
          <label
            htmlFor="release_date"
            className="block text-sm font-medium text-gray-700"
          >
            Release Year
          </label>
          <input
            type="number"
            id="release_date"
            name="release_date"
            value={filters.release_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="Enter year..."
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Sort order */}
        <div>
          <label
            htmlFor="ordering"
            className="block text-sm font-medium text-gray-700"
          >
            Sort By
          </label>
          <select
            id="ordering"
            name="ordering"
            value={filters.ordering}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          >
            <option value="">Default</option>
            <option value="title">Title (A-Z)</option>
            <option value="-title">Title (Z-A)</option>
            <option value="release_date">Release Date (Oldest)</option>
            <option value="-release_date">Release Date (Newest)</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
