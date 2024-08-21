import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import CategoryTile from "../components/CategoryTiles";
import ProductTile from "../components/ProductTile";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="HomePage">
      <NavBar />
      <CategoryTile />
      <h1>All Products:</h1>
      <div className="ProductGridHomepage">
        {products.map(product => (
          <ProductTile
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            description={product.description}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}
