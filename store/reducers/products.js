import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      productId = action.productId;
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== productId
        ),
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== productId
        ),
      };
      
    default:
      return state;
  }
};
