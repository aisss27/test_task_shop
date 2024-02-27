import React, { useEffect } from 'react';
import styles from './ProductList.module.css';
import {fetchProducts, Product, RootState, SetProductsActionType} from '../../redux/cart-reducer';
import { useDispatch, useSelector } from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';


type ProductListProps = {
    addToCart: (product: Product) => void;
};

export const ProductList: React.FC<ProductListProps> = (props) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, SetProductsActionType>>();
    const products = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className={styles.product}>
            <h2 className={styles.product_list_heading}>Product List</h2>
            <div className={styles.product_list}>
                {products.map((product:Product) => (
                    <div key={product.id} className={styles.product_card}>
                        <img src={product.image} alt={product.title} className={styles.product_card_image} />
                        <h3>{product.title}</h3>
                        <p>{product.price}$</p>
                        <button onClick={() => props.addToCart(product)}>BUY</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
