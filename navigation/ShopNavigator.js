import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ProductsOverviewScreen from "../screens/shop/ProductsOverview";
import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/CartScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.accent,
      },
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
      headerBackTitleStyle: {
        fontFamily: "open-sans",
      },
      headerTintColor: "white",
    },
  }
);

export default createAppContainer(ProductsNavigator);
