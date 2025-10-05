// src/components/course/CoursesSidebar.jsx
export default function CoursesSidebar({
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  categories,
  onReset,
}) {
  return (
    <div className="card border-0 shadow-sm p-3 h-100">
      {/* Search */}
      <h5 className="fw-bold mb-3">Search</h5>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => setSearchTerm(searchTerm.trim())}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Price Range</h6>
        <div className="alert alert-light border py-2 mb-2 text-center">
          <span className="fw-bold text-primary">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </span>
        </div>

        <div className="row">
          <div className="col-6">
            <label htmlFor="minPrice" className="form-label small">
              Min
            </label>
            <input
              id="minPrice"
              type="number"
              className="form-control"
              value={priceRange[0]}
              min="0"
              max={priceRange[1]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
            />
          </div>
          <div className="col-6">
            <label htmlFor="maxPrice" className="form-label small">
              Max
            </label>
            <input
              id="maxPrice"
              type="number"
              className="form-control"
              value={priceRange[1]}
              min={priceRange[0]}
              max="10000"
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Category</h6>
        {categories.map((cat, idx) => (
          <div className="form-check mb-1" key={idx}>
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id={`cat-${idx}`}
              value={cat}
              checked={selectedCategory === cat}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`cat-${idx}`}>
              {cat}
            </label>
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <button className="btn btn-outline-secondary w-100" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
