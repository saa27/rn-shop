import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ProductsNavigator from "./ShopNavigator";

const NavigationContainer = (props) => {
  const navRef = useRef(); //a way to directly accessan element you render in jsx
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);
  return <ProductsNavigator ref={navRef} />;
};

export default NavigationContainer;
