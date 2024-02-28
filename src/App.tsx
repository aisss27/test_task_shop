import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { ProductList } from './components/ProductsList/ProductList';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { Login } from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import {loginAction, logoutAction } from './redux/auth-reducer';
import logo from './store.png'

import './App.css';
import {RootState} from './redux/store';

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const cartItems = useSelector((state: RootState) => state.cart.cart.length);

    const handleLogin = () => {
        dispatch(loginAction());
    };

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    return (
        <div className="App">
            {isAuthenticated && (
                <header>
                    <div>
                        <img src={logo} alt="logo" />
                        <p>IStore</p>
                    </div>
                    <>
                        <Link to="/products">PRODUCTS</Link>
                        <Link to="/cart">
                            CART {cartItems > 0 && <span className="cart-label">{cartItems}</span>}
                        </Link>
                        <span>Logged in</span>
                        <button onClick={handleLogout}>LOGOUT</button>
                    </>
                </header>
            )}
            <Routes>
                <Route
                    path="/"
                    element={!isAuthenticated ? (
                        <Login onLoginStatusChange={handleLogin} />
                    ) : (
                        <Navigate to="/products" replace={true} />
                    )}
                />
                <Route
                    path="/products/:category?"
                    element={isAuthenticated ? (
                        <ProductList />
                    ) : (
                        <Navigate to="/" />
                    )}
                />
                <Route
                    path="/cart"
                    element={isAuthenticated ? (
                        <ShoppingCart />
                    ) : (
                        <Navigate to="/" />
                    )}
                />
            </Routes>
            {isAuthenticated && (
                <footer>
                    <div className='footerContent'>
                        <p>&copy; 2024 IStore. All rights reserved.</p>
                        <p>Contact: abdykerovaisultan@gmail.com</p>
                    </div>
                </footer>
            )}
        </div>
    );
}

export default App;
