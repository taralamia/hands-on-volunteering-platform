const FilterBar = ({ onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-4">
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        className="p-2 border rounded-md mr-2"
      />
      <input
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default FilterBar;
