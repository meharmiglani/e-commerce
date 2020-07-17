import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  SET_PRODUCTS,
} from '../actions/products';
import Product from '../../models/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === 'u1'),
      };
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

    case ADD_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageURL,
        action.productData.desc,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case EDIT_PRODUCT:
      const prodUserIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.productId
      );
      const updatedProduct = new Product(
        action.productId,
        state.userProducts[prodUserIndex].ownerId,
        action.productData.title,
        action.productData.imageURL,
        action.productData.desc,
        state.userProducts[prodUserIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[prodUserIndex] = updatedProduct;

      const availableProdIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.productId
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProdIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };

    default:
      return state;
  }
};
