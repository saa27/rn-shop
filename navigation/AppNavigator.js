import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { ProductsNavigator, OrdersNavigator } from "./ShopNavigator";

const AppNavigator = (props) => {
  /*  const navRef = useRef(); //a way to directly accessan element you render in jsx */
  const isAuth = useSelector((state) => !!state.auth.token);
  /* const MyStack = createStackNavigator(); //major change */

  return (
    <NavigationContainer>
      <ProductsNavigator />
      <OrdersNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
