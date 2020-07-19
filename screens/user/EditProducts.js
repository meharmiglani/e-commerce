import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidity,
      [action.input]: action.isValid,
    };
    let formIsValid = true;
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidity: updatedValidities,
      formIsValid,
    };
  }
  return state;
};

export default EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      image: editedProduct ? editedProduct.imageURL : '',
      price: '',
      desc: editedProduct ? editedProduct.description : '',
    },
    inputValidity: {
      title: editedProduct ? true : false,
      image: editedProduct ? true : false,
      desc: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay!' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check for errors', {
        text: 'Okay',
      });
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productActions.editProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.image,
            formState.inputValues.desc
          )
        );
      } else {
        await dispatch(
          productActions.addProduct(
            formState.inputValues.title,
            formState.inputValues.image,
            +formState.inputValues.price,
            formState.inputValues.desc
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value,
        isValid,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator
          size='large'
          color={Colors.accent}
          style={styles.centered}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorText='Please enter a valid title'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            required
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initialValid={!!editedProduct}
          />
          <Input
            id='image'
            label='Image URL'
            onInputChange={inputChangeHandler}
            required
            errorText='Please enter a valid image URL'
            keyboardType='default'
            initialValue={editedProduct ? editedProduct.imageURL : ''}
            initialValid={!!editedProduct}
          />
          {!editedProduct && (
            <Input
              id='price'
              onInputChange={inputChangeHandler}
              required
              min={0.1}
              label='Price'
              errorText='Please enter a valid price'
              keyboardType='decimal-pad'
            />
          )}
          <Input
            id='desc'
            required
            onInputChange={inputChangeHandler}
            min={5}
            label='Description'
            errorText='Please enter a valid description'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={editedProduct ? editedProduct.description : ''}
            initialValid={!!editedProduct}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Save' iconName='ios-checkmark' onPress={submitFn} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
