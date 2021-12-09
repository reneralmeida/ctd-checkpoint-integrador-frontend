import { createContext, useReducer } from "react";


export const CartContext = createContext();

const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSaved = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: cartSaved };

const reducer = (state, action) => {
    let newCartItems = [...state.cartItems];
    switch (action.type) {
        case 'ADD_TO_CART':
           const product = newCartItems.find(item => item.id === action.payload.id)
           product ? product.count++ : newCartItems.push({...action.payload, count: 1});
            saveCart({cartItems: [...newCartItems]});
            return {cartItems: [...newCartItems]};
        case 'REMOVE_FROM_CART':
             newCartItems = state.cartItems.filter(item => item.id !== action.payload);
            saveCart({cartItems: [...newCartItems]});
            return {cartItems: [...newCartItems]};
        case 'CLEAR_CART':
            saveCart({cartItems: []});
            return {cartItems: []};
        default:
            return state;
    }
};


const CartContextProvider = ({ children }) => {

    const [cart, dispatch] = useReducer(reducer, initialState);
    

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;