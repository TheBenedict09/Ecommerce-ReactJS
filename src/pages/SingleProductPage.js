import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProductTile from "../components/ProductTile";
import "../CSS/SingleProductPage.css";

export default function SingleProductPage() {
  const location = useLocation();
  const { id, title, image, price, description, category } = location.state;  
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(response => response.json())
      .then(data => {
        const filteredItems = data.filter(item => item.id !== id);
        setFeaturedItems(filteredItems);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [category, id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
    
    const itemIndex = cart.items.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        id,
        title,
        image,
        price,
        description,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${title} has been added to your cart`);
  };

  return (
    <div className="SinglePageStyle">
      <NavBar />
      <div className="SingleProductPage">
        <img className="ProductImage" src={image} alt="Product" />
        <div className="DetailSection1">
          <h1 className="Title">{title}</h1>
          <h1 className="Price">${price}</h1>
          <hr></hr>
          <h3 className="Desc">{description}</h3>
          <button className="AddToCartButton" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
      <hr></hr>
      <h2>Featured items you may like</h2>
      <div className="FeaturedItems">
        {featuredItems.map(item => (
          <ProductTile
            key={item.id}
            id={item.id}
            image={item.image}
            price={item.price}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
}
