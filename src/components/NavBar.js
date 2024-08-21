import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../CSS/HomePage.css";

export default function NavBar() {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav>
      <h1 className="NavHeading">E-Commerce</h1>
      <div>
        <button onClick={handleCartClick}>Cart</button>
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    </nav>
  );
}
