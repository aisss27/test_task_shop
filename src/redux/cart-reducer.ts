import axios from 'axios';
import {Dispatch} from 'redux';

export type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
}
export type RootState = {
    cart: Product[];
    products: Product[];
}

export const addToCartAction = (product: Product) => ({
    type: 'ADD_TO_CART',
    payload: product,
} as const);

export const removeFromCartAction = (productId: number) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId,
} as const);

export const setProductsAction = (products: Product[]) => ({
    type: 'SET_PRODUCTS',
    payload: products,
} as const);

type AddToCartActionType = ReturnType<typeof addToCartAction>;
type RemoveFromCartActionType = ReturnType<typeof removeFromCartAction>;
export type SetProductsActionType = ReturnType<typeof setProductsAction>;


export type CartActionTypes = AddToCartActionType | RemoveFromCartActionType | SetProductsActionType;
const initialState: RootState = {
    cart: [],
    products: [],
};
// Reducer
export const cartReducer = (state: RootState = initialState, action: CartActionTypes): RootState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, action.payload] };
        case 'REMOVE_FROM_CART':
            return {  ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        default:
            return state;
    }
};


export const fetchProducts = () => (dispatch: Dispatch<CartActionTypes>) => {
    axios
        .get<Product[]>('https://fakestoreapi.com/products')
        .then((response) => {
            dispatch(setProductsAction(response.data));
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
};