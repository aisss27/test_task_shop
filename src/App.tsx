// App.tsx
import React, { useState } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { ProductList } from './components/ProductsList/ProductList';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { Product } from './redux/cart-reducer';
import { Login } from './components/Login/Login';
import './App.css'; // Import the CSS file

function App() {
    const [cart, setCart] = useState<Product[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            <header>
                <img src="https://www.freeiconspng.com/thumbs/retail-store-icon/retail-store-icon-18.png" alt="logo" />
                <p>IStore</p>
                {isAuthenticated ? (
                    <>
                        <Link to="/products">PRODUCTS</Link>
                        <Link to="/cart">
                            CART {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                        </Link>
                        <span>Logged in</span>
                        <button onClick={handleLogout}>LOGOUT</button>
                    </>
                ) : (
                    <Link to="/login">LOGIN</Link>
                )}
            </header>
            <Routes>
                <Route
                    path="/products"
                    element={isAuthenticated ? (
                        <ProductList addToCart={addToCart} />
                    ) : (
                        <Navigate to="/login" replace />
                    )}
                />
                <Route
                    path="/cart"
                    element={isAuthenticated ? (
                        <ShoppingCart removeFromCart={removeFromCart} cart={cart} />
                    ) : (
                        <Navigate to="/login" replace />
                    )}
                />
                <Route path="/login" element={<Login onLoginStatusChange={handleLogin} />} />
            </Routes>
        </div>
    );
}

export default App;
