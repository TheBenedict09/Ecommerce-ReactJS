// App.js
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Ensure this path is correct
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SingleProductPage from './pages/SingleProductPage';
import CartPage from './pages/CartPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/products/electronics" element={<CategoryPage category="electronics" />} />
            <Route path="/products/jewelery" element={<CategoryPage category="jewelery" />} />
            <Route path="/products/men's clothing" element={<CategoryPage category="men's clothing" />} />
            <Route path="/products/women's clothing" element={<CategoryPage category="women's clothing" />} />
            <Route path="/products/:id" element={<SingleProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
