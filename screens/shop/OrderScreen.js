import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => setIsLoading(false));
  }, [dispatch]);

  const displayItem = (itemData) => {
    return (
      <OrderItem
        amount={itemData.item.totalAmount}
        date={itemData.item.readableDate}
        items={itemData.item.items}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.accent} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No orders found! Start ordering</Text>
      </View>
    );
  }

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={orders}
      renderItem={displayItem}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
