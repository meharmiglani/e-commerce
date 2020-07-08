import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";

const CartScreen = (props) => {
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });

  const displayCartItem = (itemData) => {
    return (
      <CartItem
        title={itemData.item.productTitle}
        quantity={itemData.item.quantity}
        amount={itemData.item.sum}
        onRemove={() => {}}
      />
    );
  };

  return (
    <View style={styles.screen}>
        <Text style={styles.cartText}>Cart Details</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={displayCartItem}
      />
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total Price:{" "}
          <Text style={styles.amount}>${totalPrice.toFixed(2)}</Text>
        </Text>
        <Button
          color='white'
          title='Order Now'
          disabled={cartItems.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },

  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },

  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
  },

  amount: {
    color: Colors.accent,
  },

  cartText: {
    textAlign: "center",
    color: Colors.accent,
    fontFamily: 'open-sans-bold',
    fontSize: 20
  },
});

export default CartScreen;
