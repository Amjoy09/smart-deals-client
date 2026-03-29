import { FaSearch } from "react-icons/fa";

const HeroSearch = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex w-full max-w-xl">
        {/* Input */}
        <input
          type="text"
          placeholder="Search here..."
          className="w-full px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none"
        />

        {/* Button */}
        <button className="px-5 py-3 rounded-r-full bg-gradient text-white flex items-center justify-center">
          <FaSearch size={18} />
        </button>
      </div>
    </div>
  );
};

export default HeroSearch;
