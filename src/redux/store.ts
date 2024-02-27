import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { cartReducer } from './cart-reducer';
import { authReducer } from './auth-reducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
