import { ADD_TO_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
        const newProduct = action.product;
        const newPrice = newProduct.price;
        const newTitle = newProduct.title;

        let newAddedProd;
        if(state.items[newProduct.id]){
            const newQuant = state.items[newProduct.id].quantity + 1;
            const newSum = state.items[newProduct.id].sum + newPrice;
            newAddedProd = new CartItem(newQuant, newPrice, newTitle, newSum);
        }else{
            newAddedProd = new CartItem(1, newPrice, newTitle, newPrice);
        }

        return {
            ...state,
            items: {...state.items, [newProduct.id] : newAddedProd},
            totalAmount: state.totalAmount + newPrice
        };
    }
    return state;
};
