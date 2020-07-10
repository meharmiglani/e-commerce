import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.main}>
        <View style={styles.product}>
          <Image style={styles.image} source={{ uri: props.image }} />
          <View style={styles.content}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  product: {
    height: "100%",
    overflow: "hidden",
    borderRadius: 10,
  },

  main: {
    height: 300,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2.5 },
    shadowRadius: 5,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },

  image: {
    width: "100%",
    height: "60%",
  },

  title: {
    fontSize: 17,
    marginVertical: 2,
  },

  price: {
    fontSize: 15,
    color: "#888",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "18%",
    padding: 5,
  },

  content: {
    alignItems: "center",
    height: "22%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
  },

  prod: {
    width: "100%",
  },
});

export default ProductItem;
