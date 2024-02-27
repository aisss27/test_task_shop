// auth-reducer.ts
import { RootState } from './cart-reducer'; // Assuming you have a cart-reducer


// Action Types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Action Creators
export const loginAction = () => ({
    type: LOGIN,
} as const);

export const logoutAction = () => ({
    type: LOGOUT,
} as const);

// Reducer
type AuthActionTypes = ReturnType<typeof loginAction | typeof logoutAction>;

const initialState: RootState = {
    isAuthenticated: false,
    cart: [],
    products: [],
};

export const authReducer = (state: RootState = initialState, action: AuthActionTypes): RootState => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isAuthenticated: true };
        case LOGOUT:
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
};
