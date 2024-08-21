import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import according to your file structure

import '../CSS/HomePage.css';

const CategoryTile = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const { isAuthenticated } = useAuth(); 
  
  const handleCategoryClick = (category) => {
    console.log(isAuthenticated);
    navigate(`/products/${category}`);
  };

  return (
    <div className="CategoryTileContainer">
      {categories.map(category => (
        <div
          key={category}
          className="CategoryTile"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryTile;
