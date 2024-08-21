import React, { useState } from "react";

export default function SideBar({ onFilter }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    onFilter(minPrice, maxPrice);
  };

  return (
    <div className="SideBar">
      <p>Filtered By</p>
      <p className="Price">Price</p>
      <div>
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <button onClick={handleFilter}>Apply</button>
    </div>
  );
}
