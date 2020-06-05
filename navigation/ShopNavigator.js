import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";

import ProductOverviewScreen, {
  screenOptions as overviewScreenOptions,
} from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen, {
  screenOptions as detailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import StartUpScreen from "../screens/StartUpScreen";
import AuthScreen from "../screens/user/AuthScreen";
import EditProductsScreen, {
  screenoptions as editScreenOptions,
} from "../screens/user/EditProductsScreen";
import UserProductsScreen, {
  screenOptions as userScreenOptions,
} from "../screens/user/UserProductsScreen";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/authAction";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="productsOverview"
        component={ProductOverviewScreen}
        options={overviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="productDetails"
        component={ProductDetailScreen}
        options={detailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

/* const ProductsNavigator = createStackNavigator(
  {
    productsOverview: ProductOverviewScreen,
    productDetails: ProductDetailScreen,
    cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
); */

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

/* const OrdersNavigator = createStackNavigator(
  {
    orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
); */

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="userProducts"
        component={UserProductsScreen}
        options={userScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="editProducts"
        component={EditProductsScreen}
        options={editScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

/* const AdminNavigator = createStackNavigator(
  {
    userProducts: UserProductsScreen,
    editProducts: EditProductsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
); */

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                buttonStyle={{ backgroundColor: Colors.primary }}
                titleStyle={{ fontFamily: "open-sans" }}
                title="Logout"
                onPress={() => {
                  dispatch(authActions.logout());
                  //props.navigation.navigate("Auth");
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.accent,
        labelStyle: {
          fontFamily: "open-sans-bold",
          fontWeight: undefined,
        },
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-cart" size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-list" size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-create" size={23} color={props.color} />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

/* const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfif) => (
          <Ionicons name="md-cart" size={23} color={drawerConfif.tintColor} />
        ),
      },
    },
    Orders: {
      screen: OrdersNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfif) => (
          <Ionicons name="md-list" size={23} color={drawerConfif.tintColor} />
        ),
      },
    },
    Admin: {
      screen: AdminNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfif) => (
          <Ionicons name="md-create" size={23} color={drawerConfif.tintColor} />
        ),
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.accent,
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontWeight: undefined,
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              buttonStyle={{ backgroundColor: Colors.primary }}
              titleStyle={{ fontFamily: "open-sans" }}
              title="Logout"
              onPress={() => {
                dispatch(authActions.logout());
                //props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
); */

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
