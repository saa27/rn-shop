import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { ShopNavigator, AuthNavigator } from "./ShopNavigator";
import StartUpScreen from "../screens/StartUpScreen";

const AppNavigator = (props) => {
  /*  const navRef = useRef(); //a way to directly accessan element you render in jsx */
  const isAuth = useSelector((state) => !!state.auth.token);
  /* const MyStack = createStackNavigator(); //major change */
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAL);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
