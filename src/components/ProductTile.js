import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ProductPage.css";

export default function ProductTile({ id, title, image, price, description, category }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${id}`, {
      state: {
        id: id,
        title:title,
        image: image,
        price: price,
        description: description,
        category: category, 
      },
    });
  };

  return (
    <div className="ProductTile" onClick={handleClick}>
      <img className="ProductImg" src={image} alt="Product" />
      <p className="ProductPrice">${price}</p>
      <p className="ProductDesc">{description}</p>
    </div>
  );
}
