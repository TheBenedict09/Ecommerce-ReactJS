import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductTile from "../components/ProductTile";
import { CircularProgress } from "@mui/material";
import SideBar from "../components/SideBar";
import "../CSS/ProductPage.css";

export default function CategoryPage({ category }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially, display all products
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [category]);

  const handleFilter = (minPrice, maxPrice) => {
    const filtered = products.filter((product) => {
      const price = product.price;
      return (
        (minPrice === "" || price >= parseFloat(minPrice)) &&
        (maxPrice === "" || price <= parseFloat(maxPrice))
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="ProductPage">
      <NavBar />
      <h1 className="ProductTitle">
        {category.charAt(0).toUpperCase() + category.slice(1)}:
      </h1>
      <div className="ProductGrid">
        {loading ? (
          <div className="LoadingContainer">
            <CircularProgress />
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductTile
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              description={product.description}
              category={category}
            />
          ))
        )}
      </div>
      <SideBar onFilter={handleFilter} />
    </div>
  );
}
