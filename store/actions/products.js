import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    //execute async code
    try {
      const response = await fetch(
        'https://e-commerce-2212.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageURL,
            resData[key].desc,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const res = await fetch(
      `https://e-commerce-2212.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE'
      }
    );

    if(!res.ok){
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId,
    });
  };
};

export const addProduct = (title, imageURL, price, desc) => {
  return async (dispatch) => {
    //execute async code
    const response = await fetch(
      'https://e-commerce-2212.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          desc,
          imageURL,
          price,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageURL,
        price,
        desc,
      },
    });
  };
};

export const editProduct = (id, title, imageURL, desc) => {
  return async (dispatch) => {
    const response = await fetch(`https://e-commerce-2212.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        desc,
        imageURL,
      })
    });

    if(!response.ok){
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: EDIT_PRODUCT,
      productId: id,
      productData: {
        title,
        imageURL,
        desc,
      },
    });
  };
};
