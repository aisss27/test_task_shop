import React from 'react';
import styles from './ShoppingCart.module.css'
import {Product} from '../../redux/cart-reducer';

export type ShoppingCartProps ={
    cart: Product[]

    removeFromCart: (productId: number) => void;
}
export const ShoppingCart: React.FC<ShoppingCartProps> = (props) => {
    const removeFromCart = (productId: number) => {
            props.removeFromCart(productId)
    };

    return (
        <div className={styles.cart}>
            <h2 className={styles.cart_title}>Shopping Cart</h2>
            <div className={styles.cart_items}>
                {props.cart.map(product => (
                    <div key={product.id} className={styles.cart_item}>
                        <img src={product.image} alt={product.title} className={styles.cart_item_image} />
                        <h3>{product.title}</h3>
                        <p>{product.price}$</p>
                        <button className={styles.cart_item_button} onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};