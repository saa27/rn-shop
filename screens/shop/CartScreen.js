import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-elements";



import * as cartActions from "../../store/actions/cartAction";
import * as orderActions from "../../store/actions/ordersAction";
import Colors from "../../constants/Colors";
import MyButton from "../../components/UI/MyButton";
import BodyText from "../../components/UI/BodyText";
import CartItem from "../../components/shop/CartItem";

const CartScreen = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? -1 : 1
    );
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "OK" }]);
    }
  });

  const sendOrderHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <BodyText style={styles.textSumaary}>
          Total:{" "}
          <Text style={styles.amount}>Rs.{cartTotalAmount.toFixed(2)}</Text>
        </BodyText>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.accent} />
        ) : (
          <Button
            buttonStyle={{ backgroundColor: Colors.accent }}
            titleStyle={{ fontFamily: "open-sans" }}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.productPrice}
            deletable
            onDelete={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
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
    justifyContent: "space-around",
    padding: 10,
    marginBottom: 20,
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  textSumaary: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Cart",
  };
};

export default CartScreen;
