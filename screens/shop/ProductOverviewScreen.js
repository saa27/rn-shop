import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cartAction";
import * as productsActions from "../../store/actions/productsAction";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import MyButton from "../../components/UI/MyButton";
import BodyText from "../../components/UI/BodyText";

const ProductOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  //const cartState = useSelector(state => state.cart);
  //console.log(cartState);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("productDetails", {
      productId: id,
      productTitle: title,
    });
  };

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null); //if we have an error and we want to re load, we have to clear the error
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts()); //wait for dispatching to be done
    } catch (err) {
      setError(err.message);
    } // since we re throw the error in productsActions we will catch it here
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadProducts);

    return () => {
      unsubscribe();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  if (error) {
    return (
      <View style={styles.loader}>
        <BodyText>{error}</BodyText>
        <MyButton onPress={loadProducts}>RELOAD</MyButton>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.loader}>
        <BodyText>No products found! Maybe try adding some!</BodyText>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(60, 194, 167, 0.2)" }}>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <MyButton
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            >
              View Details
            </MyButton>
            <MyButton
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            >
              To Cart
            </MyButton>
          </ProductItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate("cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductOverviewScreen;
