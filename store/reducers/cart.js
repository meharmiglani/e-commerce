import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

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
      if (state.items[newProduct.id]) {
        const newQuant = state.items[newProduct.id].quantity + 1;
        const newSum = state.items[newProduct.id].sum + newPrice;
        newAddedProd = new CartItem(newQuant, newPrice, newTitle, newSum);
      } else {
        newAddedProd = new CartItem(1, newPrice, newTitle, newPrice);
      }

      return {
        ...state,
        items: { ...state.items, [newProduct.id]: newAddedProd },
        totalAmount: state.totalAmount + newPrice,
      };

    case REMOVE_FROM_CART:
      const prodId = action.productId;
      const currQty = state.items[prodId].quantity;
      const oldPrice = state.items[prodId].price;
      let updatedCartItems;
      if (currQty > 1) {
        //Reduce by 1
        const oldProduct = state.items[prodId];
        const updatedQty = currQty - 1;
        const updatedSum = oldProduct.sum - oldPrice;
        let newProd = new CartItem(
          updatedQty,
          oldProduct.price,
          oldProduct.productTitle,
          updatedSum
        );
        updatedCartItems = { ...state.items, [prodId]: newProd };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[prodId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - oldPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if(!state.items[prodId]){
        return state;
      }
      const updatedItems = {...state};
      const amount = state.totalAmount - state.items[prodId].sum;
      delete updatedItems[prodId];
      return{
        ...state,
        items: updatedItems,
        totalAmount: amount
      }
  }
  return state;
};
