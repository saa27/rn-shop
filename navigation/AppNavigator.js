import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//import ProductsNavigator from "./ShopNavigator";
import ProductsOverviewScreen from "../screens/shop/ProductOverviewScreen";

const AppNavigator = (props) => {
  /*  const navRef = useRef(); //a way to directly accessan element you render in jsx */
  const isAuth = useSelector((state) => !!state.auth.token);
  const MyStack = createStackNavigator(); //major change

  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
        />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
