import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.mainTitle}>{props.title}</Text>
        <Text style={styles.mainTitle}>{props.amount.toFixed(2)}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>Qty: {props.quantity}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons name='ios-trash' size={22} color='red' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    borderBottomColor: Colors.accent,
    borderBottomWidth: 3,
    margin: 10,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 1,
  },
  mainTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    marginHorizontal: 10
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
    marginLeft: 10
    
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
