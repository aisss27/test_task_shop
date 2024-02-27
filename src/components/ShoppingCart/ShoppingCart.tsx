import React from 'react';
import styles from './ShoppingCart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartAction, Product } from '../../redux/cart-reducer';
import {RootState} from '../../redux/store';

export const ShoppingCart: React.FC = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state:RootState) => state.cart.cart);

    const removeFromCart = (productId: number) => {
        dispatch(removeFromCartAction(productId));

    };


    return (
        <div className={styles.cart}>
            <h2 className={styles.cart_title}>Shopping Cart</h2>
            <div className={styles.cart_items}>
                {cart.map((product: Product) => (
                    <div key={product.id} className={styles.cart_item}>
                        <img src={product.image} alt={product.title} className={styles.cart_item_image} />
                        <h3>{product.title}</h3>
                        <p>{product.price}$</p>
                        <button
                            className={styles.cart_item_button}
                            onClick={() => removeFromCart(product.id)}
                        >
                            Remove from Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
