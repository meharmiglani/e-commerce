import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageURL }} style={styles.image} />
      <View style={styles.btn}>
        <Button
          color={Colors.accent}
          title='Add to Cart'
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <View style={styles.descContainer}>
        <Text style={styles.desc}>{selectedProduct.description}</Text>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Happy Shopping!</Text>
        </View>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },

  price: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 15,
    color: "#888",
  },

  desc: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 10,
  },

  btn: {
    marginVertical: 10,
    alignItems: "center",
  },

  descContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.accent,
    marginVertical: 10,
    width: "100%",
  },

  footer: {
    width: "100%",
    height: '50%',
    backgroundColor: Colors.accent,
    justifyContent: "center",
  },

  footerContainer: {
    justifyContent: "flex-end",
    height: "25%",
  },

  footerText: {
      color: 'white',
      textAlign: 'center',
      fontFamily: 'open-sans-bold'
  }
});

export default ProductDetailScreen;
