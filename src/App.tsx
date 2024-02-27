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

    const handleLogin = () => {
        dispatch(loginAction());
    };

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    return (
        <div className="App">
            <header>
                <div>
                    <img src={logo} alt="logo" />
                    <p>IStore</p>
                </div>
                {isAuthenticated ? (
                    <>
                        <Link to="/products">PRODUCTS</Link>
                        <Link to="/cart">CART</Link>
                        <span>Logged in</span>
                        <button onClick={handleLogout}>LOGOUT</button>
                    </>
                ) : (
                    <Link to="/login">LOGIN</Link>
                )}
            </header>
            <Routes>
                <Route
                    path="/products/:category?"
                    element={isAuthenticated ? (
                        <ProductList />
                    ) : (
                        <Navigate to="/login" replace />
                    )}
                />
                <Route
                    path="/cart"
                    element={isAuthenticated ? (
                        <ShoppingCart />
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
