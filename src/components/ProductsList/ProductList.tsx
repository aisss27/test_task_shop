import React, {useEffect, useState} from 'react';
import styles from './ProductList.module.css';
import { fetchProducts, Product, SetProductsActionType } from '../../redux/cart-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { addToCartAction } from '../../redux/cart-reducer';
import {RootState} from '../../redux/store';

type ProductListProps = {};

export const ProductList: React.FC<ProductListProps> = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, SetProductsActionType | ReturnType<typeof addToCartAction>>>();
    const products = useSelector((state: RootState) => state.cart.products);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;



    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const addToCart = (product: Product) => {
        // Dispatch the addToCart action
        dispatch(addToCartAction(product));
        console.log('Item added to cart:', product)
    };



    return (
        <div className={styles.product}>
            <div className={styles.sidebar}>
                <h2 className={styles.product_list_heading}>Product List</h2>
                <div className={styles.category_menu}>
                    <button onClick={() => handleCategoryChange('')}>All</button>
                    <button onClick={() => handleCategoryChange('electronics')}>Electronics</button>
                    <button onClick={() => handleCategoryChange('jewelery')}>Jewelery</button>
                    <button onClick={() => handleCategoryChange('men\'s clothing')}>Men's</button>
                    <button onClick={() => handleCategoryChange('women\'s clothing')}>Women's</button>
                </div>
            </div>
            <div className={styles.product_list}>
                {filteredProducts.map((product: Product) => (
                    <div key={product.id} className={styles.product_card}>
                        <img src={product.image} alt={product.title} className={styles.product_card_image} />
                        <h3>{product.title}</h3>
                        <p>{product.price}$</p>
                        {isAuthenticated && <button onClick={() => addToCart(product)}>BUY</button>}
                    </div>
                ))}
            </div>
        </div>
    );
};
