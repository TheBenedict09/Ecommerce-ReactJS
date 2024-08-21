import React, { useState, useEffect } from "react";
import CartProductTile from "../components/CartProductTile";
import NavBar from "../components/NavBar";
import "../CSS/CartPage.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
    setCartItems(cart.items);
  }, []);

  const updateCart = (id, newQuantity) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === id) {
          if (newQuantity <= 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item !== null);

    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify({ items: updatedItems }));
  };

  return (
    <div>
      <NavBar />
      <div className="CartPage">
        <div className="CartPageSection1">
          <h1>Shopping Cart</h1>
          <hr />
          {cartItems.map((item) => (
            <CartProductTile
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              updateCart={updateCart}
            />
          ))}
        </div>
        <div className="CartPageSection2">
          {/* <h3>Subtotal ({cartItems.length} items): ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h3> */}
          <h3>
            Subtotal ({cartItems.length} items): $
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h3>

          <button>Proceed to Buy</button>
        </div>
      </div>
    </div>
  );
}
