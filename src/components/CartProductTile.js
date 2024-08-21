import React from "react";
import "../CSS/CartPage.css";

export default function CartProductTile({
  id,
  title,
  description,
  image,
  price,
  quantity,
  updateCart,
}) {
  const increaseQuantity = () => {
    updateCart(id, quantity + 1);
  };

  const decreaseQuantity = () => {
    updateCart(id, quantity - 1);
  };

  return (
    <div className="CartProductTile">
      <div className="Img_Details">
        <img className="CartProductTileImg" src={image} alt="Product" />
        <div>
          <h2>{title}</h2>
          <div className="CartItemDescSize">
            <h3 className="CartItemDesc">{description}</h3>
          </div>
        </div>
      </div>
      <div className="Price_Quantity">
        <h1>${price}</h1>
        <div className="QuantitySection">
          <h3>Quantity: {quantity}</h3>
          <div className="QuantityUpdation">
            <button onClick={decreaseQuantity}>-</button>
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
