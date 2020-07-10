export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};

export const addProduct = (title, imageURL, price, desc) => {
  return {
    type: ADD_PRODUCT,
    productData: {
      title,
      imageURL,
      price,
      desc,
    },
  };
};

export const editProduct = (id, title, imageURL, desc) => {
  return {
    type: EDIT_PRODUCT,
    productId: id,
    productData: {
      title,
      imageURL,
      desc,
    },
  };
};
